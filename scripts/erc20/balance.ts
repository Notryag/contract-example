import { ethers } from "hardhat"


const main = async () => {
    const token0 = await ethers.getContractFactory('Token0')
    const token1 = await ethers.getContractFactory('Token1')
    const [owner, addr1] = await ethers.getSigners()
}


main().then(() => console.log('then')).catch(() => {
    process.exit(1)
})