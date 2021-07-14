const Web3 = require("web3");
const FemToken = require("./build/contracts/FemToken.json");
const Provider = require("@truffle/hdwallet-provider");
const userWalletAddress = "0x4232c91dECa194Cd14f4F1E59EB88ED27bE7f289";
const amount = 250;

const transferTokenToUser = async (userWalletAddress, amount) => {
  const bscDeployerAddress = "0x6b8A1F23308eA6cef788F3433616A8f47A9f91C7";
  const bscDeployerPrivateKey =
    "b82ca072a288afa9bf367ae59242184a0e250b8db7ceb6e5e3baf30835bc16b1";

  const provider = new Provider(
    bscDeployerPrivateKey,
    "https://data-seed-prebsc-1-s1.binance.org:8545"
  );
  const web3 = new Web3(provider);
  const networkId = await web3.eth.net.getId();

  const femToken = new web3.eth.Contract(
    FemToken.abi,
    FemToken.networks[networkId].address
  );

  const gasPrice = await web3.eth.getGasPrice();
  const gasEstimate = await femToken.methods
    .transfer(userWalletAddress, (amount * Math.pow(10, 18)).toString())
    .estimateGas({ from: bscDeployerAddress });

  console.log(
    `Initial tokens Balance: ${await femToken.methods
      .balanceOf(bscDeployerAddress)
      .call()}`
  );

  const receipt = await femToken.methods
    .transfer(userWalletAddress, (amount * Math.pow(10, 18)).toString())
    .send({ from: bscDeployerAddress, gasPrice: gasPrice, gas: gasEstimate });
  console.log(`Transaction hash: ${receipt.transactionHash}`);
  console.log(
    `New tokens Balance: ${await femToken.methods
      .balanceOf(bscDeployerAddress)
      .call()}`
  );
};

const checkUserBalance = async (userWalletAddress) => {

  const web3 = new Web3("https://data-seed-prebsc-1-s1.binance.org:8545");
  const networkId = await web3.eth.net.getId();

  const femToken = new web3.eth.Contract(
    FemToken.abi,
    FemToken.networks[networkId].address
  );

  console.log(
    `User tokens Balance: ${await femToken.methods
      .balanceOf(userWalletAddress)
      .call()}`
  );
};

// transferTokenToUser(userWalletAddress, amount);
checkUserBalance(userWalletAddress);

// run with node script.js (on terminal)