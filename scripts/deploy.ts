import { ethers } from "hardhat"
import { deployContract } from "./utils"

const main = async () => {

    // await deployContract('CoffeeSeller')
    const myToken = await deployContract('MyToken')
    await deployContract('Faucet', [myToken.target, 1])
    
}

main().then().catch(error => {
    console.error(error)
    process.exit(1)
})