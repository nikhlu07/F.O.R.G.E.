const fs = require('fs');
const path = require('path');
const { ContractId } = require('@hashgraph/sdk');

const outPath = path.join(process.cwd(), 'contracts', 'deployment.json');
const meta = JSON.parse(fs.readFileSync(outPath, 'utf8'));
if (!meta.contractId) throw new Error('deployment.json missing contractId');

const evmAddress = ContractId.fromString(meta.contractId).toSolidityAddress();
console.log('ContractId:', meta.contractId);
console.log('Derived EVM Address:', '0x' + evmAddress);
meta.evmAddress = '0x' + evmAddress;
fs.writeFileSync(outPath, JSON.stringify(meta, null, 2));
console.log('Updated', outPath);