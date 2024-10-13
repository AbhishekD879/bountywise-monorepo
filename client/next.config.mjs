/** @type {import('next').NextConfig} */
const nextConfig = {
  publicRuntimeConfig: {
    BRAND: 'Bountywise',
    POST_A_BOUNTY_CTA: 'Post a Bounty',
    JOIN_AS_A_HUNTER_CTA: 'Join as a Hunter'
  },
  webpack: (config) => {
    config.externals.push('@node-rs/argon2', '@node-rs/bcrypt')
    return config
  }
}

export default nextConfig
