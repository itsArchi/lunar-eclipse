import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    webpack: (config, { isServer }) => {
        config.module.rules.push({
            test: /\.(test|spec)\.(ts|tsx|js|jsx)$/,
            loader: "ignore-loader",
        });
        return config;
    },
    turbopack: {},
};

module.exports = nextConfig;
