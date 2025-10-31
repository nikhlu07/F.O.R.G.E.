/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');
const solc = require('solc');
const dotenv = require('dotenv');
const {
  Client,
  AccountId,
  PrivateKey,
  FileCreateTransaction,
  FileAppendTransaction,
  ContractCreateTransaction,
  ContractInfoQuery,
} = require('@hashgraph/sdk');

const envPathLocal = path.join(process.cwd(), '.env.local');
const envPathDefault = path.join(process.cwd(), '.env');
if (fs.existsSync(envPathLocal)) dotenv.config({ path: envPathLocal });
else if (fs.existsSync(envPathDefault)) dotenv.config({ path: envPathDefault });
else dotenv.config();

const NETWORK = process.env.HEDERA_NETWORK || 'testnet';
const ACCOUNT_ID = process.env.HEDERA_ACCOUNT_ID || process.env.CENTRAL_ACCOUNT_ID;
const PRIVATE_KEY = process.env.HEDERA_PRIVATE_KEY || process.env.CENTRAL_PRIVATE_KEY;

if (!ACCOUNT_ID || !PRIVATE_KEY) {
  console.error('Missing HEDERA_ACCOUNT_ID and HEDERA_PRIVATE_KEY in env');
  process.exit(1);
}

function compile() {
  const contractPath = path.join(process.cwd(), 'contracts', 'ApprovalEscrow.sol');
  const source = fs.readFileSync(contractPath, 'utf8');
  const input = {
    language: 'Solidity',
    sources: { 'ApprovalEscrow.sol': { content: source } },
    settings: { optimizer: { enabled: true, runs: 200 }, outputSelection: { '*': { '*': ['abi','evm.bytecode'] } } }
  };
  const output = JSON.parse(solc.compile(JSON.stringify(input)));
  if (output.errors) {
    const errs = output.errors.filter(e => e.severity === 'error');
    if (errs.length) { console.error(errs); process.exit(1); }
  }
  const compiled = output.contracts['ApprovalEscrow.sol']['ApprovalEscrow'];
  return { abi: compiled.abi, bytecode: Buffer.from(compiled.evm.bytecode.object, 'hex') };
}

(async () => {
  console.log('Network:', NETWORK);
  const client = Client.forName(NETWORK);
  client.setOperator(AccountId.fromString(ACCOUNT_ID), PrivateKey.fromString(PRIVATE_KEY));

  const { abi, bytecode } = compile();
  console.log('Bytecode bytes:', bytecode.length);

  // Create file to store bytecode
  const fileCreateTx = await new FileCreateTransaction().execute(client);
  const fileCreateRx = await fileCreateTx.getReceipt(client);
  const bytecodeFileId = fileCreateRx.fileId;
  console.log('Bytecode fileId:', bytecodeFileId.toString());

  // Append bytecode in chunks
  const CHUNK = 4096; let offset = 0;
  while (offset < bytecode.length) {
    const chunk = bytecode.slice(offset, offset + CHUNK);
    const appendTx = await new FileAppendTransaction().setFileId(bytecodeFileId).setContents(chunk).execute(client);
    await appendTx.getReceipt(client);
    offset += CHUNK;
  }
  console.log('Bytecode appended');

  // Create contract from fileId
  const contractTx = await new ContractCreateTransaction().setBytecodeFileId(bytecodeFileId).setGas(100_000).execute(client);
  const contractRx = await contractTx.getReceipt(client);
  const contractId = contractRx.contractId;
  console.log('ContractId:', contractId.toString());

  const info = await new ContractInfoQuery().setContractId(contractId).execute(client);
  console.log('EVM Address:', info.evmAddress);

  const outPath = path.join(process.cwd(), 'contracts', 'deployment.json');
  fs.writeFileSync(outPath, JSON.stringify({ network: NETWORK, contractId: contractId.toString(), evmAddress: info.evmAddress, abi }, null, 2));
  console.log('Saved deployment metadata to:', outPath);
})();