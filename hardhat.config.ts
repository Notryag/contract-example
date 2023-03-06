import { HardhatUserConfig } from "hardhat/config"
import "@nomicfoundation/hardhat-toolbox"
require("dotenv").config()

function mnemonic() {
    return process.env.PRIVATE_KEY
}

console.log(mnemonic(), "mom")

const config: HardhatUserConfig = {
    solidity: "0.8.17",
    networks: {
        ganache: {
            url: "http://localhost:9545",
            chainId: 1337, // Ganache 默认的 chainId
            accounts: ["0x7868a81e43626bbb5b0f0607a02a94d0255ca94a51504b488c61de7f93bf4396", "0x1eedfa89453f3f3ac8f2346ecfcac92e6f575b194fd68a60465b03dc5464ac48"],
        },
        goerli: {
            url: "https://eth-goerli.g.alchemy.com/v2/" + process.env.INFURA_ID,
            accounts: { mnemonic: mnemonic() },
        },
    },
}

export default config
