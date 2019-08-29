const { Storage } = require('@google-cloud/storage');
const DEFAULT_BUCKET_NAME = 'bhajan-kosh-bucket';

const gc = new Storage({
  keyFilename: 'Bhajan-kosh-3ff559e422a2.json',
  projectId: 'bhajan-kosh'
});

function getPublicUrl(bucketName, filename) {
  return `https://storage.googleapis.com/${bucketName}/${filename}`;
}

/**
 * Middleware for uploading file to GCS.
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @return {*}
 */
exports.sendUploadToGCS = (req, res, next) => {
  if (!req.files) {
    return next();
  }
  const bucketName = req.body.bucketName || DEFAULT_BUCKET_NAME;
  const bucket = gc.bucket(bucketName);
  req.files.forEach(function(file) {});
  const gcsFileName = `${Date.now()}-${req.file.originalname}`;
  const file = bucket.file(gcsFileName);

  const stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype
    }
  });

  stream.on('error', err => {
    req.file.cloudStorageError = err;
    next(err);
  });

  stream.on('finish', () => {
    req.file.cloudStorageObject = gcsFileName;

    return file.makePublic().then(() => {
      req.file.gcsUrl = getPublicUrl(bucketName, gcsFileName);
      next();
    });
  });

  stream.end(req.file.buffer);
};
