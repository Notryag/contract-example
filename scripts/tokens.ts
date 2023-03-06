import { Contract } from "ethers"
import { ethers } from "hardhat"
import { createContractInfo } from "./utils"

async function main() {
    const token = [
        {
            name: "USDT",
            symbol: "usdt",
            amount: 10000,
        },
        {
            name: "BUSD",
            symbol: "bsdt",
            amount: 10000,
        },
        {
            name: "DAI",
            symbol: "dai",
            amount: 1000000,
        },
    ]

    const contracts: Array<Contract> = []
    for (const t of token) {
        const Token = await ethers.getContractFactory("Token")
        const token = await Token.deploy(t.symbol, t.name, t.amount)
        await token.deployed()
        await createContractInfo(t.name, token)
        contracts.push(token)
    }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
