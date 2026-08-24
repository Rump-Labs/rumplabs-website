import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Rump Labs",
    short_name: "Rump Labs",
    description:
      "The technical half of your company. Consultancy, POCs, delivery, AI automation and Web3/ZK engineering.",
    start_url: "/",
    display: "standalone",
    background_color: "#f3f1ec",
    theme_color: "#0f525f",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
