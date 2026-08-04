require('dotenv').config()

module.exports = {
  client: {
    service: {
      name: 'syn-api',
      url: process.env.VITE_GRAPHQL_URI,
      headers: {
        Authorization: `Bearer ${process.env.VITE_GRAPHQL_TOKEN}`,
      },
    },
    includes: ['src/**/*.{ts,tsx,graphql}'],
  },
}
