const fs = require('fs');
const path = require('path');
const solc = require('solc');
const dotenv = require('dotenv');
const {
  Client,
  AccountId,
  PrivateKey,
  ContractCreateTransaction,
  ContractCreateFlow,
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
  const operatorKey = PrivateKey.fromString(PRIVATE_KEY);
  const operatorId = AccountId.fromString(ACCOUNT_ID);
  client.setOperator(operatorId, operatorKey);

  const { bytecode } = compile();
  console.log('Bytecode bytes:', bytecode.length);

  try {
    // Try ContractCreateFlow first
    const flow = new ContractCreateFlow()
      .setBytecode(bytecode)
      .setGas(200_000)
      .setAdminKey(operatorKey.publicKey);
    const flowResp = await flow.execute(client);
    const flowRx = await flowResp.getReceipt(client);
    console.log('Flow receipt status:', flowRx.status.toString());
    console.log('Flow contractId:', flowRx.contractId ? flowRx.contractId.toString() : 'none');
  } catch (e) {
    console.error('Flow error status:', e.status ? e.status.toString() : e.message);
    if (e.getRecord) {
      try {
        const rec = await e.getRecord(client);
        if (rec.contractFunctionResult) {
          console.error('Flow function error:', rec.contractFunctionResult.errorMessage);
        }
      } catch {}
    }
  }

  try {
    // Then try ContractCreateTransaction
    const tx = new ContractCreateTransaction()
      .setBytecode(bytecode)
      .setGas(200_000)
      .setAdminKey(operatorKey.publicKey);
    const resp = await tx.execute(client);
    const rec = await resp.getRecord(client);
    console.log('Tx record status:', rec.receipt.status.toString());
    console.log('ContractCreateResult errorMessage:', rec.contractFunctionResult ? rec.contractFunctionResult.errorMessage : 'n/a');
    console.log('ContractID (receipt):', rec.receipt.contractId ? rec.receipt.contractId.toString() : 'none');
  } catch (e) {
    console.error('Tx error status:', e.status ? e.status.toString() : e.message);
    if (e.getRecord) {
      try {
        const rec = await e.getRecord(client);
        console.log('Tx exception record status:', rec.receipt.status.toString());
        if (rec.contractFunctionResult) {
          console.error('Tx function error:', rec.contractFunctionResult.errorMessage);
        }
      } catch {}
    }
  }
})();