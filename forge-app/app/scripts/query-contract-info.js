/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const { Client, AccountId, PrivateKey, ContractInfoQuery } = require('@hashgraph/sdk');

const envPathLocal = path.join(process.cwd(), '.env.local');
const envPathDefault = path.join(process.cwd(), '.env');
if (fs.existsSync(envPathLocal)) dotenv.config({ path: envPathLocal });
else if (fs.existsSync(envPathDefault)) dotenv.config({ path: envPathDefault });
else dotenv.config();

const NETWORK = process.env.HEDERA_NETWORK || 'testnet';
const ACCOUNT_ID = process.env.HEDERA_ACCOUNT_ID || process.env.CENTRAL_ACCOUNT_ID;
const PRIVATE_KEY = process.env.HEDERA_PRIVATE_KEY || process.env.CENTRAL_PRIVATE_KEY;

async function main() {
  const outPath = path.join(process.cwd(), 'contracts', 'deployment.json');
  const meta = JSON.parse(fs.readFileSync(outPath, 'utf8'));
  if (!meta.contractId) throw new Error('deployment.json missing contractId');

  const client = Client.forName(NETWORK);
  client.setOperator(AccountId.fromString(ACCOUNT_ID), PrivateKey.fromString(PRIVATE_KEY));

  const info = await new ContractInfoQuery().setContractId(meta.contractId).execute(client);
  console.log('ContractId:', meta.contractId);
  console.log('EVM Address:', info.evmAddress);
  meta.evmAddress = info.evmAddress;
  fs.writeFileSync(outPath, JSON.stringify(meta, null, 2));
  console.log('Updated', outPath);
}

main().catch((e) => { console.error(e); process.exit(1); });