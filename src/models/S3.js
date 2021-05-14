require('dotenv').config()
const fs = require('fs')
const S3 = require('aws-sdk/clients/s3')

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey
})

// uploads a file to s3
const uploadFile = async (files) => {
  console.log('file', files);
  const uploadResult = [];

  for (const file of files) {
    const fileStream = fs.createReadStream(file.path);
  
    const uploadParams = {
      Bucket: bucketName,
      Body: fileStream,
      Key: file.filename
    }
    let uploadedData = await s3.upload(uploadParams).promise();
    uploadResult.push(uploadedData.key);
  }

  return uploadResult;
}
exports.uploadFile = uploadFile


// downloads a file from s3
const getFileStream = (fileKey) => {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName
  }

  let downloadedData = s3.getObject(downloadParams).createReadStream();
  return downloadedData;
}
exports.getFileStream = getFileStream