import { getPeerlistBadgeSrc, getProductHuntBadgeSrc } from "@/lib/launchpad";
import { IBadgeConfig } from "@/types/launchpad.type";

const PEERLIST_EMBED_ID = process.env.NEXT_PUBLIC_PEERLIST_EMBED_ID ?? "";
const PRODUCT_HUNT_POST_ID = process.env.NEXT_PUBLIC_PRODUCT_HUNT_POST_ID ?? "";

export const LAUNCHPAD_BADGES: IBadgeConfig[] = [
  {
    id: "swb",
    href: "https://sellwithboost.com",
    alt: "Listed on Sell With Boost",
    height: 40,
    getSrc: () => "https://sellwithboost.com/badge/listing.svg",
  },
  {
    id: "product-hunt",
    href: "https://www.producthunt.com/posts/nurui",
    alt: "Nur UI — Find us on Product Hunt",
    height: 54,
    width: 250,
    getSrc: (theme) => getProductHuntBadgeSrc(PRODUCT_HUNT_POST_ID, theme),
  },
  {
    id: "peerlist",
    href: "https://peerlist.io/scroll/post/ACTH7B8DOGRRGMGRA1NKGJ8GL7GMOJ",
    alt: "Nur UI — Listed on Peerlist Launchpad",
    height: 56,
    getSrc: (theme) =>
      PEERLIST_EMBED_ID
        ? getPeerlistBadgeSrc(PEERLIST_EMBED_ID, theme)
        : `https://peerlist.io/api/v1/projects/embed/placeholder?showUpvote=true&theme=${theme}&count=0`,
  },
];
