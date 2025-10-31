// Deploy ApprovalEscrow.sol using Hedera SDK and solc-js (ED25519 compatible)
// Usage: node app/scripts/deploy-approval-escrow.js

const fs = require('fs');
const path = require('path');
const solc = require('solc');
const dotenv = require('dotenv');
const {
  Client,
  AccountId,
  PrivateKey,
  ContractCreateFlow,
  ContractInfoQuery,
} = require('@hashgraph/sdk');

// Load env (supports .env.local for Next.js projects)
const envPathLocal = path.join(process.cwd(), '.env.local');
const envPathDefault = path.join(process.cwd(), '.env');
if (fs.existsSync(envPathLocal)) dotenv.config({ path: envPathLocal });
else if (fs.existsSync(envPathDefault)) dotenv.config({ path: envPathDefault });
else dotenv.config();

const NETWORK = process.env.HEDERA_NETWORK || 'testnet';
const ACCOUNT_ID = process.env.HEDERA_ACCOUNT_ID || process.env.CENTRAL_ACCOUNT_ID;
const PRIVATE_KEY = process.env.HEDERA_PRIVATE_KEY || process.env.CENTRAL_PRIVATE_KEY;

if (!ACCOUNT_ID || !PRIVATE_KEY) {
  console.error('Missing HEDERA_ACCOUNT_ID and HEDERA_PRIVATE_KEY (or CENTRAL_* equivalents) in env.');
  process.exit(1);
}

function compileContract(contractPath) {
  const source = fs.readFileSync(contractPath, 'utf8');
  const input = {
    language: 'Solidity',
    sources: {
      [path.basename(contractPath)]: { content: source },
    },
    settings: {
      optimizer: { enabled: true, runs: 200 },
      outputSelection: {
        '*': {
          '*': ['abi', 'evm.bytecode', 'evm.deployedBytecode']
        }
      }
    }
  };

  const output = JSON.parse(solc.compile(JSON.stringify(input)));
  if (output.errors) {
    const errors = output.errors.filter(e => e.severity === 'error');
    if (errors.length) {
      console.error('Solidity compile errors:', errors);
      process.exit(1);
    }
  }

  const contractName = 'ApprovalEscrow';
  const compiled = output.contracts[path.basename(contractPath)][contractName];
  if (!compiled) {
    console.error('Compiled artifact not found for', contractName);
    process.exit(1);
  }
  const abi = compiled.abi;
  const bytecodeHex = compiled.evm.bytecode.object; // hex string
  return { abi, bytecodeHex };
}

async function main() {
  const contractFile = path.join(process.cwd(), 'contracts', 'ApprovalEscrow.sol');
  if (!fs.existsSync(contractFile)) {
    console.error('Contract file not found:', contractFile);
    process.exit(1);
  }

  console.log('Compiling contract...');
  const { abi, bytecodeHex } = compileContract(contractFile);
  console.log('Compiled. Bytecode length:', bytecodeHex.length / 2, 'bytes');

  console.log('Setting up Hedera client for network:', NETWORK);
  const client = Client.forName(NETWORK);
  client.setOperator(AccountId.fromString(ACCOUNT_ID), PrivateKey.fromString(PRIVATE_KEY));

  console.log('Deploying via ContractCreateFlow...');
  const flow = new ContractCreateFlow()
    .setBytecode(Buffer.from(bytecodeHex, 'hex'))
    .setGas(100_000);

  const txResponse = await flow.execute(client);
  const receipt = await txResponse.getReceipt(client);
  const contractId = receipt.contractId;
  if (!contractId) {
    console.error('Deployment failed: no contractId in receipt');
    process.exit(1);
  }
  console.log('Deployed ContractId:', contractId.toString());

  // Fetch EVM address
  const info = await new ContractInfoQuery().setContractId(contractId).execute(client);
  const evmAddress = info.evmAddress || 'unknown';
  console.log('EVM Address:', evmAddress);

  const hashscanBase = NETWORK === 'mainnet' ? 'https://hashscan.io/mainnet' : NETWORK === 'previewnet' ? 'https://hashscan.io/previewnet' : 'https://hashscan.io/testnet';
  console.log('HashScan Contract:', `${hashscanBase}/contract/${contractId.toString()}`);

  // Persist to a simple file in repo
  const outPath = path.join(process.cwd(), 'contracts', 'deployment.json');
  fs.writeFileSync(outPath, JSON.stringify({ network: NETWORK, contractId: contractId.toString(), evmAddress, abi }, null, 2));
  console.log('Saved deployment metadata to:', outPath);
}

main().catch((err) => {
  console.error('Deploy script error:', err);
  process.exit(1);
});