import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // 홈 디렉터리(/Users/mac)에 있는 package-lock.json 때문에 워크스페이스 루트가
    // 잘못 추론되는 것을 막는다.
    root: path.join(__dirname),
  },
};

export default nextConfig;
