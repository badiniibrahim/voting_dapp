import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const DappVotesModule = buildModule("DappVotesModule", (m) => {
  const dappVotes = m.contract("DappVotes");

  return { dappVotes };
});

export default DappVotesModule;
