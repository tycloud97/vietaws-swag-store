import type { DynamoDB } from 'aws-sdk';
import type { Converter } from 'aws-sdk/lib/dynamodb/converter';


let client: DynamoDB;
let marshall: typeof Converter.marshall;
let unmarshall: typeof Converter.unmarshall;

const getDynamoDBClient = async () => {
  if (!client) {
    const { DynamoDB } = await import('aws-sdk');
    client = new DynamoDB();
    marshall = DynamoDB.Converter?.marshall;
    unmarshall = DynamoDB.Converter?.unmarshall;
  }

  return client;
};

export { getDynamoDBClient, marshall, unmarshall };
