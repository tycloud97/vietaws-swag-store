"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.replyJSON = void 0;
const openapi_backend_1 = __importDefault(require("openapi-backend"));
const orderService = __importStar(require("./order/order-services"));
function replyJSON(json, opts) {
    const defaultHeaders = {
        'content-type': 'application/json',
        'cache-control': 'no-cache,no-store,must-revalidate',
        expires: '0',
    };
    return {
        isBase64Encoded: false,
        statusCode: 200,
        body: json ? JSON.stringify(json) : '',
        ...opts,
        headers: {
            ...defaultHeaders,
            ...opts?.headers,
        },
    };
}
exports.replyJSON = replyJSON;
const api = new openapi_backend_1.default({
    definition: "./openapi.yml", quick: true, handlers: {
        createOrder: async (c) => {
            const order = c.request.requestBody;
            const createdOrder = await orderService.createOrder(order);
            return createdOrder;
        },
        getOrders: async (c) => {
            // Configure authentication
            const authUser = 'user';
            const authPass = 'pass';
            // Construct the Basic Auth string
            const authString = 'Basic ' + new Buffer(authUser + ':' + authPass).toString('base64');
            if (c?.request?.headers?.authorization === authString) {
                const orders = await orderService.getOrders();
                return { orders };
            }
            else {
                const body = 'Unauthorized';
                const response = {
                    status: '401',
                    statusDescription: 'Unauthorized',
                    body: body,
                };
                // return response
                return replyJSON(response, { 'statusCode': 401, headers: { 'www-authenticate': 'Basic realm="WWW-Authenticate"' } });
            }
        },
        notFound: (c) => {
            if (c.request.method === "options") {
                return {
                    statusCode: 200,
                };
            }
            else {
                return {
                    statusCode: 404,
                    body: "Not found",
                };
            }
        }
    }
});
const handler = async (event) => {
    console.log(event);
    return api.handleRequest({
        method: event.requestContext.http.method,
        path: event.requestContext.http.path,
        query: event.queryStringParameters,
        body: event.body,
        headers: event.headers,
    });
};
exports.handler = handler;
//# sourceMappingURL=index.js.map