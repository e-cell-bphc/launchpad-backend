const applyFailed = {
  status: 'failed',
  code: '401',
  desc: 'Application creation failed'
}

const invalidApplication = {
  status: 'failed',
  code: '402',
  desc: 'Invalid application details'
}

const applicationLimitReached = {
  status: 'failed',
  code: '403',
  desc: 'Application Limit Reached'
}

const noResume = {
  status: 'failed',
  code: '404',
  desc: 'Resume not uploaded'
}

const alreadyApplied = {
  status: 'failed',
  code: '405',
  desc: 'Already Applied'
}

module.exports = {
  applyFailed,
  invalidApplication,
  applicationLimitReached,
  noResume,
  alreadyApplied
}
