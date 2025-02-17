import * as dotenv from "dotenv";
dotenv.config();

import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-ethers";
import "@nomicfoundation/hardhat-chai-matchers";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
import "@nomicfoundation/hardhat-verify";
import "hardhat-deploy";
import "hardhat-deploy-ethers";
import { task } from "hardhat/config";
import generateTsAbis from "./scripts/generateTsAbis";
require("@nomicfoundation/hardhat-verify");


const deployerPrivateKey = process.env.PRIVATE_KEY || "8ca2e53914e491e0dbc6d4554d4b8bbe2f46d46c291c29c6871c5c26addff0e0";
const FUJI_RPC_URL = process.env.FUJI_RPC_URL || "https://avax-fuji.g.alchemy.com/v2/YkvoQ9LLSB3b6BCaPj5r9y8OyPEes8JF";
const BSC_TESTNET_RPC_URL = process.env.BSC_TESTNET_RPC_URL || "https://bnb-testnet.g.alchemy.com/v2/YkvoQ9LLSB3b6BCaPj5r9y8OyPEes8JF";

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.20",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  defaultNetwork: "hardhat",
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
  networks: {
    hardhat: {
      chainId: 31337,
    },
    avalancheFuji: {
      url: FUJI_RPC_URL,
      chainId: 43113,
      accounts: [deployerPrivateKey],
    },
    bscTestnet: {
      url: BSC_TESTNET_RPC_URL,
      chainId: 97,
      accounts: [deployerPrivateKey],
    },
  },
  etherscan: {
    apiKey: {
      avalancheFuji: process.env.SNOWTRACE_API_KEY || "",
      bscTestnet: process.env.BSCSCAN_API_KEY || "",
    },
  },
  verify: {
    etherscan: {
      apiKey: {
        avalancheFuji: process.env.SNOWTRACE_API_KEY || "",
        bscTestnet: process.env.BSCSCAN_API_KEY || "",
      },
    },
  },
  sourcify: {
    enabled: false,
  },
};

task("deploy").setAction(async (args, hre, runSuper) => {
  await runSuper(args);
  await generateTsAbis(hre);
});

export default config;
