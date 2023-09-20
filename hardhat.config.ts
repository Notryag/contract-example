import { HardhatUserConfig } from "hardhat/config"
import "@nomicfoundation/hardhat-toolbox"
require("dotenv").config()

function mnemonic() {
    return process.env.PRIVATE_KEY
}

const config: HardhatUserConfig = {
    solidity: "0.8.19",
    networks: {
        ganache: {
            url: "http://localhost:9545",
            chainId: 1337, // Ganache 默认的 chainId
            accounts: ["080e2903da62b2f2f3db2e84e85aee5b59b70d30d65f593a8b29c5533580d3dc"],
        },
        goerli: {
            url: "https://eth-goerli.g.alchemy.com/v2/" + process.env.INFURA_ID,
            accounts: { mnemonic: mnemonic() },
        },
    },
}

export default config
