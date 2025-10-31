const fs = require('fs');
const path = require('path');
const solc = require('solc');
const dotenv = require('dotenv');
const { Client, AccountId, PrivateKey, ContractCreateFlow, ContractInfoQuery } = require('@hashgraph/sdk');

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
  const abi = compiled.abi;
  const hexBytecode = compiled.evm.bytecode.object; // hex string
  return { abi, hexBytecode };
}

(async () => {
  console.log('Network:', NETWORK);
  const client = Client.forName(NETWORK);
  const operatorKey = PrivateKey.fromString(PRIVATE_KEY);
  const operatorId = AccountId.fromString(ACCOUNT_ID);
  client.setOperator(operatorId, operatorKey);

  const { abi, hexBytecode } = compile();
  console.log('Bytecode hex length:', hexBytecode.length);

  try {
    const flow = new ContractCreateFlow()
      .setBytecode(hexBytecode)
      .setGas(1_500_000)
      .setAdminKey(operatorKey.publicKey);

    const resp = await flow.execute(client);
    const receipt = await resp.getReceipt(client);
    console.log('Receipt status:', receipt.status.toString());
    if (!receipt.contractId) throw Object.assign(new Error('No contractId in receipt'), { receipt });
    const contractId = receipt.contractId.toString();
    console.log('ContractId:', contractId);

    const info = await new ContractInfoQuery().setContractId(contractId).execute(client);
    console.log('EVM Address:', info.evmAddress);

    const outPath = path.join(process.cwd(), 'contracts', 'deployment.json');
    fs.writeFileSync(outPath, JSON.stringify({ network: NETWORK, contractId, evmAddress: info.evmAddress, abi }, null, 2));
    console.log('Saved deployment metadata to:', outPath);
  } catch (e) {
    console.error('Deploy error:', e.status ? e.status.toString() : e.message);
    if (e.receipt) console.error('Receipt status:', e.receipt.status ? e.receipt.status.toString() : 'unknown');
    if (e.getRecord) {
      try {
        const rec = await e.getRecord(client);
        if (rec.contractFunctionResult) {
          console.error('Function error:', rec.contractFunctionResult.errorMessage);
        }
      } catch {}
    }
    process.exit(1);
  }
})();