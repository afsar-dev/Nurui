import { TBadgeTheme } from "@/types/launchpad.type";

export const getPeerlistBadgeSrc = (embedId: string, theme: TBadgeTheme) =>
  `https://peerlist.io/api/v1/projects/embed/${embedId}?showUpvote=true&theme=${theme}`;

export const getProductHuntBadgeSrc = (postId: string, theme: TBadgeTheme) =>
  `https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=${postId}&theme=${theme}`;
