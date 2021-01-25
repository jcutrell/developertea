// next.config.js
module.exports = {
  async redirects() {
    return [
      {
        source: '/square',
        destination: 'https://squareup.com/us/en/campaign/terminal-api?device=c&gclid=EAIaIQobChMIvevaxt-o7gIVTR-tBh2A2wnCEAAYASAAEgIcLfD_BwE&gclsrc=aw.ds&kw=square+terminal+api&kwid=p57379141245&matchtype=e&pcrid=466887040718&pdv=c&pkw=square+terminal+api&pmt=e&pub=GOOGLE',
        permanent: true
      }
    ]
  }
  webpack: (config, {isServer}) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.node = {fs: 'empty'};
    }


    return config;
  },
};
