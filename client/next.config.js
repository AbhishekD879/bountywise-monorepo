const nextConfig = {
  publicRuntimeConfig: {
    BRAND: 'Bountywise',
    POST_A_BOUNTY_CTA: 'Post a Bounty',
    JOIN_AS_A_HUNTER_CTA: 'Join as a Hunter'
  }
}

module.exports = {
  ...nextConfig,
  webpack: (config) => {
    config.externals.push('@node-rs/argon2', '@node-rs/bcrypt')
    return config
  },
  images: {
    domains: ['lh3.googleusercontent.com', 'robohash.org']
  },
  output: "standalone",
}
