require('dotenv').config()

function getURI(useAtlas = true) {
  if (process.env.ATLAS_URI && useAtlas) {
    return (
      process.env.ATLAS_URI ||
      process.env.MONGO_URI ||
      'mongodb://localhost/ecell'
    )
  }

  return process.env.MONGO_URI || 'mongodb://localhost/ecell'
}

module.exports = {
  // 1. MongoDB
  MONGO_URI: getURI(true),

  // 2. JWT
  TOKEN_SECRET:
    process.env.TOKEN_SECRET ||
    'pvpnCCZfwOF85pBjbOebZiYIDhZ3w9LZrKwBZ7152K89mPCOHtbRlmr5Z91ci4L',

  // 3. Express Server Port
  LISTEN_PORT: process.env.LISTEN_PORT || 3000,

  // 4. Application Limit
  APPLY_LIMIT: 6
}
