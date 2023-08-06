import { ethers } from "ethers";
import { Ballot__factory } from "../typechain-types";
import * as dotenv from "dotenv";

dotenv.config();

function setupProvider() {
  const provider = new ethers.JsonRpcProvider(process.env.RPC_END_POINT ?? "");
  //const provider = ethers.getDefaultProvider("sepolia");
  return provider;
}

const deployedContract = "0xD6DdDC255D745Da6d524b61971cF7295bad9aac1";

async function rightToVote() {
  //npx ts-node --files ./scripts/RightToVote.ts <wallet address>
  const newVoter = process.argv.slice(2)[0];

  const provider = setupProvider();
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "", provider);
  const contract = new ethers.Contract(
    deployedContract,
    Ballot__factory.abi,
    wallet
  );

  await contract.giveRightToVote(newVoter);
}

rightToVote().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
