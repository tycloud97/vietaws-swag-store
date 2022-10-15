import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Configuration, OrderApi } from 'openapi';

const configuration = new Configuration({
	basePath: 'https://5lzm6gdqpk.execute-api.ap-southeast-1.amazonaws.com',
});

const orderApi = new OrderApi(configuration);

export const createOrderAsync = createAsyncThunk(
	'order/createOrder',
	async () => {
		const createdOrder = await orderApi.createOrder({ order: {} })
		return createdOrder;
	}
);


const initialState = {
	orders: undefined,
	status: 'idle',
};

const OrderSlice = createSlice({
	name: 'order',
	initialState,
	reducers: {
	
	},
	extraReducers: (builder) => {
		builder
			.addCase(createOrderAsync.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(createOrderAsync.fulfilled, (state) => {
				state.status = 'idle';
			});
	}
});


export default OrderSlice;
