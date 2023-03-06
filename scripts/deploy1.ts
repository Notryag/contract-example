import { ethers } from "hardhat"
import { deployContract } from "./utils"

const main = async () => {

    await deployContract('MyToken')
    
}

main().then().catch(error => {
    console.error(error)
    process.exit(1)
})