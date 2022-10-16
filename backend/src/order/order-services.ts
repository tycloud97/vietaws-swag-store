import { DynamoDB } from 'aws-sdk';
import { AttributeMap } from 'aws-sdk/clients/dynamodb';
import { ulid } from 'ulid';
import config from "../config";
import { getDynamoDBClient, marshall, unmarshall } from "../dynamodb/dynamodb-client";
import { Order } from "../generated-sources/openapi/models/Order";

const createOrder = async (order: Order) => {
    if (!order.id) {
        order.id = ulid();
    }
    const dynamodb = await getDynamoDBClient();

    await dynamodb
        .putItem({
            TableName: config.DYNAMODB_ORDERS_TABLE,
            Item: toOrderItem(order),
        })
        .promise();

    return order;
}

const getOrders = async () => {
    const dynamodb = await getDynamoDBClient();
    let res: DynamoDB.ScanOutput;
    const items: AttributeMap[] = [];

    do {
        res = await dynamodb
            .scan({
                TableName: config.DYNAMODB_ORDERS_TABLE,
            })
            .promise();

        items.push(...res.Items);
    } while (res.LastEvaluatedKey);

    const orders = items?.map(fromOrderItem) || [];
    return orders

}

const toOrderItem = (order: Order) => {
    if (!order) return null;

    return marshall({
        id: order.id,
        payload: JSON.stringify(order),
    });
};
const fromOrderItem = (item: AttributeMap) => (item ? (JSON.parse(unmarshall(item).payload) as Order) : null);

export { createOrder ,getOrders};
