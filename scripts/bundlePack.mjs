import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { PolygonAmoyTestnet } from "@thirdweb-dev/chains";
import dotenv from "dotenv";
dotenv.config();

(async () => {
  const secretKey = process.env.THIRDWEB_SECRET_KEY;
  const sdk = ThirdwebSDK.fromPrivateKey(process.env.PRIVATE_KEY, { PolygonAmoyTestnet }, {
    secretKey,
  });

  const packAddress = "0xacd66434ce5A05DC6437263F01Fa512605B50043";
  const cardAddress = "0x854D448946ae1c49e36761F990E86C545411B3C1";

  const pack = sdk.getContract(packAddress, "pack");
  const card = sdk.getContract(cardAddress, "edition");

  (await card).setApprovalForAll(packAddress, true);
  console.log("Approved contract");

  const packImage =
    "ipfs://QmdTDuc3w1GSHnTwraE7B4Gq2MPku55GFWzSqUs4c1WtAf/pack.png";

  console.log("Creating pack");
  const createPacks = (await pack).create({
    packMetadata: {
      name: "Pack 02",
      description: "This is another pack",
      image: packImage,
    },
    erc1155Rewards: [
      /*
            {
                contractAddress: cardAddress,
                tokenId: 0,
                quantityPerReward: 1,
                totalRewards: 25,
            },
            */
      {
        contractAddress: cardAddress,
        tokenId: 7,
        quantityPerReward: 1,
        totalRewards: 10,
      },
      {
        contractAddress: cardAddress,
        tokenId: 8,
        quantityPerReward: 1,
        totalRewards: 25,
      },
      {
        contractAddress: cardAddress,
        tokenId: 9,
        quantityPerReward: 1,
        totalRewards: 25,
      },
      {
        contractAddress: cardAddress,
        tokenId: 10,
        quantityPerReward: 1,
        totalRewards: 25,
      },
      {
        contractAddress: cardAddress,
        tokenId: 11,
        quantityPerReward: 1,
        totalRewards: 25,
      },
      {
        contractAddress: cardAddress,
        tokenId: 12,
        quantityPerReward: 1,
        totalRewards: 25,
      },
      {
        contractAddress: cardAddress,
        tokenId: 13,
        quantityPerReward: 1,
        totalRewards: 25,
      },
    ],

    rewardsPerPack: 5,
  });

  console.log("Packs created");
})();
