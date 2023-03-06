import { expect } from "chai";
import { ethers } from "hardhat";

describe("Token0", function () {
  let token0: any;
  let owner: any;
  let addr1: any;
  let addr2: any;

  beforeEach(async function () {
    const Token0 = await ethers.getContractFactory("Token0");
    token0 = (await Token0.deploy());
    [owner, addr1, addr2] = await ethers.getSigners();
  });

  it("should have correct name and symbol", async function () {
    expect(await token0.name()).to.equal("Token Coin0");
    expect(await token0.symbol()).to.equal("t0");
  });

  it("should mint tokens", async function () {
    await token0.mint(addr1.address, 100);
    expect(await token0.balanceOf(addr1.address)).to.equal(100);

    await token0.mint(addr2.address, 200);
    expect(await token0.balanceOf(addr2.address)).to.equal(200);
  });

  it("should not allow non-owner to mint tokens", async function () {
    await expect(token0.connect(addr1).mint(addr2.address, 100)).to.be.revertedWith("Ownable: caller is not the owner");
  });
});
