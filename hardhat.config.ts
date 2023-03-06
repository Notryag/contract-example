import { HardhatUserConfig } from "hardhat/config"
import "@nomicfoundation/hardhat-toolbox"
require("dotenv").config()

const GOERLI_PRIVATE_KEY = process.env.PRIVATE_KEY!

const config: HardhatUserConfig = {
    solidity: "0.8.17",
    networks: {
        ganache: {
            url: "http://localhost:9545",
            chainId: 1337, // Ganache 默认的 chainId
            accounts: ["0x90bfc11dcc76000786ae2ccf45019024bb4f826c45febe1ecd6710db196f8b04"],
        },
        goerli: {
            url: "https://eth-goerli.g.alchemy.com/v2/" + process.env.INFURA_ID,
            accounts: [GOERLI_PRIVATE_KEY],
        },
    },
}

export default config
