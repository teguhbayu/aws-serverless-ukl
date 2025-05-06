import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

const TABLE = "XXXXXXXXX"; // CHANGE THIS!!!!
const STOREBUCKET = "XXXXXXXXXXXXXXX"; // CHANGE THIS!!!!

export const handler = async (event) => {
  const command = new ScanCommand({
    TableName: TABLE,
  });

  const resp = await docClient.send(command);

  const res = resp.Items.map((item) => ({
    name: item.name,
    url: `https://${STOREBUCKET}.s3.us-east-1.amazonaws.com/${item.pic}`,
  }));

  const response = {
    statusCode: 200,
    body: JSON.stringify({ message: "success get data", data: res }),
  };
  return response;
};
