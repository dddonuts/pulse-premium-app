/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // Konva tente d'importer "canvas" côté Node. On le neutralise côté build.
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      canvas: false,
      // Force Konva browser build sans casser les sous-imports (react-konva importe konva/lib/Core.js)
      "konva/lib/index-node.js": require.resolve("konva/lib/index.js"),
    };
    return config;
  },
};

module.exports = nextConfig;
