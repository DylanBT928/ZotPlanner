import aws from "aws-sdk";
import dotenv from "dotenv";

dotenv.config();

const region = "us-west-2";
const bucketName = "image-bucket-that-is-for-testing";
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: "v4",
});

function getPresignUrlPromiseFunction(s3, s3Params): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      await s3.getSignedUrl("putObject", s3Params, function (err, data) {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    } catch (error) {
      return reject(error);
    }
  });
}

export async function generateUploadURL() {
  const imageName = "new image";

  const params = {
    Bucket: bucketName,
    Key: imageName,
    Expires: 300,
    ContentType: "image/*",
  };

  const uploadURL = await getPresignUrlPromiseFunction(s3, params);
  // uploadURL.then(function(uploadURL)) {
  //   console.log('The url is ', uploadURL);
  // }, function(err) { console.log('err')} );
  return uploadURL;
}
