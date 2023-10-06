Tron Multisignature Wallet
===================

[![Join the chat at https://gitter.im/gnosis/MultiSigWallet](https://badges.gitter.im/gnosis/MultiSigWallet.svg)](https://gitter.im/gnosis/MultiSigWallet?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

The purpose of multisig wallets is to increase security by requiring multiple parties to agree on transactions before execution. Transactions can be executed only when confirmed by a predefined number of owners. A web user interface can be found [here](/dapp).

**NOTE:** Not compatible with current NodeJS LTS. Recommended NodeJS version is v8.16.0

Features
-------------

- Can hold TRX and all kind of tokens with multisig support
- Easy to use offline signing (cold wallet) support
- Integration with tronlink
- Transaction data and log decoding, makes transactions more readable
- Interacting with any contracts with UI support

Install
-------------
```
# For Ubuntu/Debian you need to install libusb development headers
apt install -y libusb-1.0-0-dev

git clone https://github.com/zkBob/TronMultisigWallet.git
cd TronMultisigWallet
git checkout develop

# Latest NodeJS (v12.13.0) does NOT appear to work correctly.
# You should use NVM and install Node v6.17.1 for best results: https://github.com/nvm-sh/nvm
# Tested by @Privex on 2019-Nov-06 with v6.17.1 with success
nvm install v6.17.1

# node-gyp is required for 'npm install' to work correctly
npm install node-gyp

npm install
```

Test
-------------
### Run contract tests:
```
npm test
```
### Run interface tests:
```
npm run test-dapp
```

Limitations
-------------
This implementation does not allow the creation of smart contracts via multisignature transactions.
Transactions to address 0 cannot be done. Any other transaction can be done.

Security
-------------
All contracts are WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.

License
-------------
[LGPL v3](./LICENSE)
