import { existsSync, mkdirSync } from "fs"
import { writeFile } from "fs/promises"
import { artifacts, ethers, network } from "hardhat"

interface ContractParams {
    [key: string]: any
}

export async function deployContract(contractName: string, rest: ContractParams = {}) {
    // 获取合约工厂
    const contract = await ethers.deployContract(contractName)

    // 等待合约部署完成
    await contract.waitForDeployment()
    console.log(`Contract ${contractName} deployed to:`, contract.target)
    await createContractInfo(contractName, contract)
    return contract
}

export async function createContractInfo(contractName: string, contract: any) {
    const artifact = artifacts.readArtifactSync(contractName)
    const contractFile = {
        info: {
            name: contractName,
            network: network.name,
            address: contract.target,
        },
        abi: artifact.abi,
        bytecode: artifact.bytecode,
    }

    // create contract info file
    const contractDir = `./abi/${network.name}`
    const contractInfoFile = `${contractDir}/${contractName}.json`

    createDirectoryIfNotExists(contractDir)

    writeFile(contractInfoFile, JSON.stringify(contractFile, null, 2), "utf8")
}


function createDirectoryIfNotExists(directory:string) {
    if (!existsSync(directory)) {
      mkdirSync(directory, { recursive: true });
      console.log(`Created directory: ${directory}`);
    } else {
      console.log(`Directory already exists: ${directory}`);
    }
  }