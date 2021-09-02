const HDWalletProvider = require("@truffle/hdwallet-provider");
const sokol = 'https://sokol.poa.network';
const kccTestNetwork = 'https://rpc-testnet.kcc.network';
const kccMainNetwork = 'https://rpc-mainnet.kcc.network';
const bscTest = "https://data-seed-prebsc-2-s3.binance.org:8545/";

const fs = require("fs");
const mnemonic = fs.readFileSync(".secret").toString().trim();

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1", // Localhost (default: none)
      port: 8545, // Standard Ethereum port (default: none)
      network_id: "*", // Any network (default: none)
    },

    sokol: {
      provider: () => new HDWalletProvider(mnemonic, sokol),
      network_id: 77, // This network is yours, in the cloud.
      production: true, // Treats this network as if it was a public net. (default: false)
    },
  kccMainNet: {
      provider: () => new HDWalletProvider(mnemonic, kccMainNetwork),
      network_id: 1, // This network is yours, in the cloud.
      production: true, // Treats this network as if it was a public net. (default: false)
    },
    kccTestNet: {
      provider: () => new HDWalletProvider(mnemonic, kccTestNetwork),
      network_id: 322, // This network is yours, in the cloud.
      production: true, // Treats this network as if it was a public net. (default: false)
    },
    bscTestNet: {
      provider: () => new HDWalletProvider(mnemonic, bscTest),
      network_id: 97, // This network is yours, in the cloud.
      production: true, // Treats this network as if it was a public net. (default: false)
    },
  },


  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.1",    // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      // settings: {          // See the solidity docs for advice about optimization and evmVersion
      //  optimizer: {
      //    enabled: false,
      //    runs: 200
      //  },
      //  evmVersion: "byzantium"
      // }
    },
  },
};

// commands
// truffle deploy --network sokol
// truffle deploy --network kccTestNet