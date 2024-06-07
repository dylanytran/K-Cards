import { useContract, useDirectListings } from "@thirdweb-dev/react";
import { MARKETPLACE_ADDRESS, PACK_ADDRESS } from "../constants/addresses";
import styles from "../styles/Home.module.css";
import { PackNFTCard } from "../components/PackNFT";

export default function Shop() {
  const { contract: marketplace } = useContract(
    MARKETPLACE_ADDRESS,
    "marketplace-v3"
  );

  const { data: directListings, isLoading: loadingDirectListings } =
    useDirectListings(marketplace, {
      tokenContract: PACK_ADDRESS,
    });

  return (
    <div className={styles.container}>
      <h1>Shop Packs</h1>
      <div className={styles.grid}>
        {!loadingDirectListings ? (
          directListings?.map((listing, index) => (
            <PackNFTCard key={index} tokenId={listing.tokenId} />
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
