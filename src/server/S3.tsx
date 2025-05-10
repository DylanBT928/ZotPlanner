import aws from "aws-sdk";
import dotenv from "dotenv";
import { S3 } from "aws-sdk";

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

interface S3PresignParams {
  Bucket: string;
  Key: string;
  Expires: number;
  ContentType: string;
}

function getPresignUrlPromiseFunction(
  s3: S3,
  s3Params: S3PresignParams
): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    s3.getSignedUrl(
      "putObject",
      s3Params,
      function (err: Error | null, data: string) {
        if (err) {
          return reject(err);
        }
        resolve(data);
      }
    );
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
