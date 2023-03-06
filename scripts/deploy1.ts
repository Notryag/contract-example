import { ethers } from "hardhat"

const main = async () => {
    const MyToken = await ethers.getContractFactory("MyToken")
    const mytoken = await MyToken.deploy()
    await mytoken.deployed()

    console.log("MyToken deployed to:", mytoken.address)
}

main().then(() => process.exit(0)).catch(error => {
    console.error(error)
    process.exit(1)
})