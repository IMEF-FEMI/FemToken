const Web3 = require("web3");
const FemToken = require("./build/contracts/FemToken.json");
const address = "0x6a967659fB95adEFDc1bF7eCEb1F72Df170609aA";
const Provider = require("@truffle/hdwallet-provider");


const initBSC = async () => {
  
  const bscAdminAddress = "0x6b8A1F23308eA6cef788F3433616A8f47A9f91C7";
  const bscAdminPrivateKey =
    "b82ca072a288afa9bf367ae59242184a0e250b8db7ceb6e5e3baf30835bc16b1";

  const provider = new Provider(bscAdminPrivateKey, 'https://data-seed-prebsc-1-s1.binance.org:8545');
  const web3 = new Web3(provider);
  const networkId = await web3.eth.net.getId();

  const femToken = new web3.eth.Contract(
    FemToken.abi,
    FemToken.networks[networkId].address
  );

  const gasPrice = await web3.eth.getGasPrice();
  const gasEstimate = await femToken.methods
    .transfer()
    .estimateGas({ from: bscAdminAddress });

  console.log(`Initial tokens available: ${await femToken.methods.balanceOf(bscAdminAddress).call()}`);
  
  const receipt = await femToken.methods
    .setData(3)
    .send({ from: bscAdminAddress, gasPrice: gasPrice, gas: gasEstimate });
  console.log(`Transaction hash: ${receipt.transactionHash}`);
  console.log(`New data value: ${await femToken.methods.data().call()}`);
};

initBSC();
