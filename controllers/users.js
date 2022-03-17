var _ = require('lodash')
const firebaseAdmin = require('firebase-admin')
const multer = require('multer')

const serviceAccount = require('./../service-account.json')
const admin = firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount)
})

const storageRef = admin.storage().bucket(`gs://e-cell-bphc-22.appspot.com`)

// Initiating a memory storage engine to store files as Buffer objects
const uploader = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // limiting files size to 5 MB
  }
})

const { noUser } = require('../errors/auth')
var User = require('../models/User')

async function getProfile(req, res) {
  const userID = req.params.id

  const result = await User.findOne({ _id: userID }).lean()

  if (result) {
    return res.json({
      status: 'ok',
      data: result
    })
  }

  return res.status(401).json(noUser)
}

async function getProfileWithAdminOrEditorScope(req, res) {
  const userID = req.params.id

  const result = await User.findOne(
    { _id: userID },
    'name email datetime college phoneNumber accessScopes'
  ).lean()

  if (!result) {
    res.json({
      status: 'ok',
      data: result
    })
  }

  res.status(401).json(noUser)
}

// exports.profile = function (req, res) {
//   User.findById(req.user)
//     .select('email first last')
//     .exec(function (err, doc) {
//       if (err || doc === null) {
//         res.status(404).json({ error: 'PersonNotFound' })
//       } else {
//         res.json(doc)
//       }
//     })
// }

async function updateProfile(req, res) {
  const { name, email, phoneNumber, college, yos, resumeURL } = req.body

  var obj = { name, phoneNumber, college, yos, resumeURL }
  obj = _.pickBy(obj, _.identity)

  const result = await User.updateOne({ email }, { $set: obj })

  if (!result) {
    return res.status(400).json({
      status: 'failed',
      desc: 'Update failed'
    })
  }

  return res.json({
    status: 'ok',
    desc: 'Update complete'
  })
}

// Upload endpoint to send file to Firebase storage bucket
function uploadResume(req, res) {
  console.log(req.files[0])
  try {
    if (!req.files[0]) {
      // res.status(400).send('Error, could not upload file')
      return res.status(400).json({
        status: 'failed',
        desc: 'Could not upload file'
      })
    }

    const blob = storageRef.file(req.files[0].originalname)

    const blobWriter = blob.createWriteStream({
      metadata: {
        contentType: req.files[0].mimetype
      }
    })

    blobWriter.on('error', (err) => {
      console.log(err)
      return res.status(400).json({
        status: 'failed',
        desc: 'Could not upload file'
      })
    })

    blobWriter.on('finish', () => {
      async function saveURL() {
        const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${
          storageRef.name
        }/o/${encodeURI(blob.name)}?alt=media`
        console.log(publicUrl)

        const result = await User.updateOne(
          { email: req.usr.email },
          { $set: { resumeURL: publicUrl } }
        )

        if (!result) {
          return res.status(400).json({
            status: 'failed',
            desc: 'Upload failed'
          })
        }

        res.status(200).json({
          status: 'ok',
          desc: 'file uploaded successfully'
        })
      }

      saveURL()
    })

    blobWriter.end(req.files[0].buffer)

    // // Create new blob in the bucket referencing the file
    // const blob = bucket.file(req.file.originalname)

    // // Create writable stream and specifying file mimetype
    // const blobWriter = blob.createWriteStream({
    //   metadata: {
    //     contentType: req.file.mimetype
    //   }
    // })

    // blobWriter.on('error', (err) => next(err))

    // blobWriter.on('finish', () => {
    //   // Assembling public URL for accessing the file via HTTP
    //   const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${
    //     bucket.name
    //   }/o/${encodeURI(blob.name)}?alt=media`

    //   // Return the file name and its public URL
    //   res
    //     .status(200)
    //     .send({ fileName: req.file.originalname, fileLocation: publicUrl })
    // })

    // When there is no more data to be consumed from the stream
    // blobWriter.end(req.file.buffer)
  } catch (error) {
    console.log(error)
    res.status(400).json({
      status: 'failed',
      desc: 'Could not upload file'
    })
    // res.status(400).send(`Error, could not upload file: ${error}`)
    // return
  }
}

module.exports = {
  getProfile,
  getProfileWithAdminOrEditorScope,
  updateProfile,
  uploadResume
}
