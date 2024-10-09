import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { assert, expect } from "chai";
import { ethers } from "hardhat";
import { describe } from "mocha";

describe("DappVotes", function () {
  let dappVotes: any;
  let deployer;
  let voter1;
  let voter2;
  let voter3;
  let contestant1: any;
  let contestant2: any;

  const title = "Lorem Ipsum";
  const description = "Republican Primary Election";
  const image = "https://image.png";
  const starts = Date.now() - 10 * 60 * 1000;
  const ends = Date.now() + 10 * 60 * 1000;
  const contestantId = 1;

  const avater1 = "https://avatar1.png";
  const name1 = "Nebu Ballon";
  const avater2 = "https://avatar2.png";
  const name2 = "Kad Neza";

  async function deployDappVotes() {
    const [deployer, contestant1, contestant2, voter1, voter2, voter3] =
      await ethers.getSigners();
    const DappVotes = await ethers.getContractFactory("DappVotes");
    const dappVotes = await DappVotes.deploy();

    await dappVotes.createPoll(
      image,
      "Lorem Ipsum 1",
      "Republican Primary Election 1",
      starts,
      ends
    );
    await dappVotes.createPoll(
      image,
      "Lorem Ipsum 2",
      "Republican Primary Election 2",
      starts,
      ends
    );

    await dappVotes.connect(contestant1).contest(0n, name1, avater1);
    await dappVotes.connect(contestant1).contest(0n, name2, avater2);

    return {
      dappVotes,
      deployer,
      contestant1,
      contestant2,
      voter1,
      voter2,
      voter3,
    };
  }

  beforeEach(async function () {
    const fixture = await loadFixture(deployDappVotes);
    deployer = fixture.deployer;
    voter1 = fixture.voter1;
    voter2 = fixture.voter2;
    voter3 = fixture.voter3;
    contestant1 = fixture.contestant1;
    contestant2 = fixture.contestant2;
    dappVotes = fixture.dappVotes;
  });

  describe("Deployment", function () {
    it("should deploy smart contract", async () => {
      let totalPolls = await dappVotes.totalPolls();
      assert(totalPolls === 2n);
    });
  });

  describe("GetPolls", async () => {
    it("should get all poll and create poll", async () => {
      await dappVotes.createPoll(image, title, description, starts, ends);
      const allPoll = await dappVotes.getPolls();
      assert(allPoll[0][0] === 0n);
      assert(allPoll[0][1] === image);
      assert(allPoll[0][2] === "Lorem Ipsum 1");
      assert(allPoll[0][3] === "Republican Primary Election 1");
    });
  });

  describe("Update Poll", async () => {
    it("should get all poll and update poll", async () => {
      await dappVotes.updatePoll(
        0n,
        image,
        "Lorem Ipsum update",
        description,
        starts,
        ends
      );
      dappVotes = await dappVotes.getPoll(0);
      assert(dappVotes[2] === "Lorem Ipsum update");
    });
  });

  describe("Faille create Poll", async () => {
    it("should NOT create poll if title is empty", async () => {
      await expect(
        dappVotes.createPoll(
          image,
          "",
          "Republican Primary Election 1",
          starts,
          ends
        )
      ).to.be.revertedWithCustomError(dappVotes, "ErrorTitle");
    });

    it("should NOT create poll if image is empty", async () => {
      await expect(
        dappVotes.createPoll(
          "",
          "title",
          "Republican Primary Election 1",
          starts,
          ends
        )
      ).to.be.revertedWithCustomError(dappVotes, "ErrorImage");
    });
    it("should NOT create poll if description is empty", async () => {
      await expect(
        dappVotes.createPoll(image, title, "", starts, ends)
      ).to.be.revertedWithCustomError(dappVotes, "ErrorDescription");
    });
  });

  describe("Contest", async () => {
    it("should create contest", async () => {
      const result = await dappVotes.getContestants(0n);
      assert(result.length === 2);
    });
  });

  describe("Voting", async () => {
    it("should create vote", async () => {
      await dappVotes.connect(contestant1).vote(0n, contestantId);
      await dappVotes.connect(contestant2).vote(0n, contestantId);
      const result = await dappVotes.getPoll(0n);
      assert(result.voters.length === 2);
    });
  });
});
