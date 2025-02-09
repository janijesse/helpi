import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";

/**
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployYourContract: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  await deploy("Helpi", {
    from: deployer,
    args: [deployer],
    log: true,
    autoMine: true,
  });

  const signer = await hre.ethers.getSigner(deployer);
  const yourContract = await hre.ethers.getContract("Helpi", signer);
  
  // Verificar que el contrato tiene greeting()
  if (yourContract.greeting) {
    console.log("👋 Initial greeting:", await yourContract.greeting());
  } else {
    console.log("⚠️ The contract does not have a 'greeting' function.");
  }
};

export default deployYourContract;

deployYourContract.tags = ["Helpi"];
