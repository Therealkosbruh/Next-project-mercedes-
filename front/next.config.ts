import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  turbopack: {},

  async headers() {
    return [
      {
        source: "/:path*.glb",
        headers: [
          {
            key: "Content-Type",
            value: "model/gltf-binary",
          },
        ],
      },
      {
        source: "/:path*.gltf",
        headers: [
          {
            key: "Content-Type",
            value: "model/gltf+json",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
