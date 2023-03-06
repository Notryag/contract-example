import { ethers } from "hardhat"
import { deployContract } from "../utils"

const main = async () => {

    await deployContract('Token0')
    await deployContract('Token1')
    
    
}

main().then().catch(error => {
    console.error(error)
    process.exit(1)
})