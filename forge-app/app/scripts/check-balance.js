const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const { Client, AccountId, PrivateKey, AccountBalanceQuery } = require('@hashgraph/sdk');

const envPathLocal = path.join(process.cwd(), '.env.local');
const envPathDefault = path.join(process.cwd(), '.env');
if (fs.existsSync(envPathLocal)) dotenv.config({ path: envPathLocal });
else if (fs.existsSync(envPathDefault)) dotenv.config({ path: envPathDefault });
else dotenv.config();

const NETWORK = process.env.HEDERA_NETWORK || 'testnet';
const ACCOUNT_ID = process.env.HEDERA_ACCOUNT_ID || process.env.CENTRAL_ACCOUNT_ID;
const PRIVATE_KEY = process.env.HEDERA_PRIVATE_KEY || process.env.CENTRAL_PRIVATE_KEY;

(async () => {
  if (!ACCOUNT_ID) {
    console.error('Missing account id in env');
    process.exit(1);
  }
  const client = Client.forName(NETWORK);
  if (PRIVATE_KEY) client.setOperator(AccountId.fromString(ACCOUNT_ID), PrivateKey.fromString(PRIVATE_KEY));
  const balance = await new AccountBalanceQuery().setAccountId(AccountId.fromString(ACCOUNT_ID)).execute(client);
  console.log('Network:', NETWORK);
  console.log('Account:', ACCOUNT_ID);
  console.log('Balance (hbar):', balance.hbars.toString());
})();