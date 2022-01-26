const noUser = { status: 'error', code: '201', desc: 'No user' }

const userCreationFailed = {
  status: 'failed',
  code: '202',
  desc: 'something went wrong, try again'
}

const tokenMissing = { status: 'error', code: '203', desc: 'TokenMissing' }

const tokenInvalid = { status: 'error', code: '204', desc: 'TokenInvalid' }

const tokenExpired = { status: 'error', code: '205', desc: 'TokenExpired' }

module.exports = {
  noUser,
  userCreationFailed,
  tokenMissing,
  tokenInvalid,
  tokenExpired
}
