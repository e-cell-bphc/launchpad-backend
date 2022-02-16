const noUser = { status: 'error', code: '201', desc: 'No user' }

const userCreationFailed = {
  status: 'failed',
  code: '202',
  desc: 'something went wrong, try again'
}

const tokenMissing = { status: 'error', code: '203', desc: 'TokenMissing' }

const tokenInvalid = { status: 'error', code: '204', desc: 'TokenInvalid' }

const tokenExpired = { status: 'error', code: '205', desc: 'TokenExpired' }

const noAdminScope = {
  status: 'error',
  code: '206',
  desc: "User doesn't have admin permissions"
}

const emailVerificationTokenMissing = {
  status: 'error',
  code: '207',
  desc: 'No email verification token'
}

const emailVerificationFailed = {
  status: 'error',
  code: '208',
  desc: 'Email verification Failed'
}

const emailIncorrectToken = {
  status: 'error',
  code: '209',
  desc: 'Incorrect token. Verification failed.'
}

const userAlreadyExists = {
  status: 'error',
  code: '210',
  desc: 'A user with this email already exists'
}

const insufficentAuthorisation = {
  status: 'error',
  code: '211',
  desc: 'Insufficient authorisation'
}

module.exports = {
  noUser,
  userCreationFailed,
  tokenMissing,
  tokenInvalid,
  tokenExpired,
  noAdminScope,
  emailVerificationTokenMissing,
  emailVerificationFailed,
  emailIncorrectToken,
  userAlreadyExists,
  insufficentAuthorisation
}
