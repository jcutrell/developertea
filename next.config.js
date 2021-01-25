// next.config.js
module.exports = {
  async redirects() {
    return [
      {
        source: '/square',
        destination: 'https://squareup.com/t/f_online/d_podcast/p_devtea/c_branding/l_us/dt_alldevice/pr_ecommerce_api/?route=/us/en/campaign/terminal-api',
        permanent: true
      }
    ]
  },
  webpack: (config, {isServer}) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.node = {fs: 'empty'};
    }


    return config;
  },
};
