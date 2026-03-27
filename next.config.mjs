/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Next dev blocks cross-origin dev resources (HMR). Allow LAN access.
  allowedDevOrigins: ["192.168.178.90", "localhost"],
}

export default nextConfig
