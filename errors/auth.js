const noUser = { status: 'error', code: '201', desc: 'No user for this email' }
const userCreationFailed = {
  status: 'failed',
  code: '202',
  desc: 'something went wrong, try again'
}

module.exports = {
  noUser,
  userCreationFailed
}
