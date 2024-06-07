import { MARKETPLACE_ADDRESS, PACK_ADDRESS } from "../constants/addresses";
import {
  MediaRenderer,
  Web3Button,
  useAddress,
  useContract,
  useDirectListings,
  useNFT,
} from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";

type Props = {
  tokenId: any;
};

export function PackNFTCard(props: Props) {
  const address = useAddress();

  const { contract: marketplace } = useContract(
    MARKETPLACE_ADDRESS,
    "marketplace-v3"
  );

  const { contract: pack } = useContract(PACK_ADDRESS, "edition");

  const { data: packNFT, isLoading: loadingNFT } = useNFT(pack, props.tokenId);

  const { data: packListings, isLoading: loadingPackListings } =
    useDirectListings(marketplace, {
      tokenContract: PACK_ADDRESS,
    });

  async function buyPack() {
    let txResult;

    if (packListings?.[props.tokenId]) {
      txResult = await marketplace?.directListings.buyFromListing(
        packListings[props.tokenId].id,
        1
      );
    } else {
      throw new Error("No listing found for this pack");
    }

    return txResult;
  }

  return (
    <div>
      {!loadingNFT && !loadingPackListings ? (
        <div className={styles.shopPack}>
          <div>
            <MediaRenderer
              src={packNFT?.metadata.image}
              width="80%"
              height="100%"
            />
          </div>
          <div className={styles.packInfo}>
            <h3>{packNFT?.metadata?.name}</h3>
            <p>
              Cost:{" "}
              {packListings![props.tokenId].currencyValuePerToken.displayValue}
              {` ` + packListings![props.tokenId].currencyValuePerToken.symbol}
            </p>
            <p>Supply: {packListings![props.tokenId].quantity}</p>
            {!address ? (
              <p>Login to buy!</p>
            ) : (
              <Web3Button
                contractAddress={MARKETPLACE_ADDRESS}
                action={() => buyPack()}
              >
                Buy Pack
              </Web3Button>
            )}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
