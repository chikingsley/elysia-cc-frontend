const nextConfig = {
  // Removed output: "export" to run as Node.js app on Vercel
  trailingSlash: false,
  
  // Turbopack configuration for GLSL files (Next.js 15)
  turbopack: {
    root: __dirname, // Tell Turbopack this is the root
    rules: {
      '*.glsl': {
        loaders: ['raw-loader'],
        as: '*.js',
      },
      '*.vs': {
        loaders: ['raw-loader'],
        as: '*.js',
      },
      '*.fs': {
        loaders: ['raw-loader'],
        as: '*.js',
      },
      '*.vert': {
        loaders: ['raw-loader'],
        as: '*.js',
      },
      '*.frag': {
        loaders: ['raw-loader'],
        as: '*.js',
      },
    },
  },
  
  // Keep webpack config as fallback for non-turbo builds
  webpack: (config) => {
    // Add a rule to handle .glsl files
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      exclude: /node_modules/,
      use: [
        {
          loader: "raw-loader", // or "asset/source" in newer Webpack versions
        },
        {
          loader: "glslify-loader",
        },
      ],
    });

    return config;
  },
};

module.exports = nextConfig;
