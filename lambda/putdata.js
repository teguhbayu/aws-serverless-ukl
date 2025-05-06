import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import parser from "/opt/node_modules/lambda-multipart-parser/index.js";

const BUCKET = "XXXXXXXXXXX"; // CHANGE THIS
const TABLE = "XXXXXXXXXX"; // CHANGE THIS

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

const s3 = new S3Client();

export const handler = async (event) => {
  try {
    const res = await parser.parse(event);

    await docClient.send(
      new PutCommand({
        TableName: TABLE,
        Item: {
          name: res.name,
          pic: `images/${res.files[0].filename}`,
        },
      })
    );
    await s3.send(
      new PutObjectCommand({
        Bucket: BUCKET,
        Key: `images/${res.files[0].filename}`,
        Body: res.files[0].content,
        ACL: "public-read",
      })
    );

    console.log(res);

    const response = {
      statusCode: 200,
      body: JSON.stringify({ message: "Success!", success: true }),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    return response;
  } catch (e) {
    console.log(e);
    const response = {
      statusCode: 500,
      body: JSON.stringify({ message: "Success!", success: false }),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    return response;
  }
};
