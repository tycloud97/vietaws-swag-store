"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrders = exports.createOrder = void 0;
const ulid_1 = require("ulid");
const config_1 = __importDefault(require("../config"));
const dynamodb_client_1 = require("../dynamodb/dynamodb-client");
const createOrder = async (order) => {
    if (!order.id) {
        order.id = (0, ulid_1.ulid)();
    }
    const dynamodb = await (0, dynamodb_client_1.getDynamoDBClient)();
    await dynamodb
        .putItem({
        TableName: config_1.default.DYNAMODB_ORDERS_TABLE,
        Item: toOrderItem(order),
    })
        .promise();
    return order;
};
exports.createOrder = createOrder;
const getOrders = async () => {
    const dynamodb = await (0, dynamodb_client_1.getDynamoDBClient)();
    let res;
    const items = [];
    do {
        res = await dynamodb
            .scan({
            TableName: config_1.default.DYNAMODB_ORDERS_TABLE,
        })
            .promise();
        items.push(...res.Items);
    } while (res.LastEvaluatedKey);
    const orders = items?.map(fromOrderItem) || [];
    return orders;
};
exports.getOrders = getOrders;
const toOrderItem = (order) => {
    if (!order)
        return null;
    return (0, dynamodb_client_1.marshall)({
        id: order.id,
        payload: JSON.stringify(order),
    });
};
const fromOrderItem = (item) => (item ? JSON.parse((0, dynamodb_client_1.unmarshall)(item).payload) : null);
//# sourceMappingURL=order-services.js.map