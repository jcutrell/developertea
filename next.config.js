// next.config.js
module.exports = {
  async redirects() {
    return [
      {
        source: '/square',
        destination: 'https://squareup.com/t/f_online/d_podcast/p_developertea/l_us/dt_alldevice/pr_developers/?route=us/en/developers',
        permanent: true
      }
    ]
  },
  webpack: (config, {isServer}) => {
    // Fixes npm packages that depend on `fs` module
    //if (!isServer) {
      //config.node = {fs: 'empty'};
    //}
    config.resolve.fallback = { fs: false };

    return config;
  },
  experimental: {
      // This is experimental but can
      // be enabled to allow parallel threads
      // with nextjs automatic static generation
      workerThreads: false,
      cpus: 1
  },
};
