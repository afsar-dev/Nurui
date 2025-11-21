interface CloudinaryLoaderProps {
  src: string;
  width: number;
  quality?: number;
}

export default function cloudinaryLoader({
  src,
  width,
  quality,
}: CloudinaryLoaderProps): string {
  //   const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  // Only transform Cloudinary URLs
  if (src.startsWith("https://res.cloudinary.com")) {
    const params = [
      `f_auto`,
      `q_${quality || "auto"}`,
      `w_${width}`,
      "c_limit",
      "dpr_auto",
    ];

    return src.replace("/upload/", `/upload/${params.join(",")}/`);
  }

  // For all other URLs (GitHub avatars, raw GitHub, etc.)
  return src;
}
