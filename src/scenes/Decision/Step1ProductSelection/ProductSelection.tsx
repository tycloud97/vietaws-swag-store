import { Button, makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getProducts } from 'services/product-service';
import ProductSelectionSlice from 'services/redux/actionsAndSlicers/ProductSelectionSlice';
import { RootState } from 'services/redux/rootReducer';
import ProductItem from './components/ProductItem';


const useStyles = makeStyles((theme) => ({
	divMain: {
		paddingTop: theme.spacing(2.5),
		paddingBottom: theme.spacing(5.5),
		textAlign: 'center',
	},


	gridItem: {
		maxWidth: theme.spacing(55),
		margin: theme.spacing(0, 3, 4, 3),
	},
}));



const ProductSelection: React.FC = () => {
	const products = getProducts()
	const ACTION_BUTTON_LABEL = 'Thêm vào giỏ hàng';
	const ACTION_BUTTON_REMOVE_LABEL = 'Xóa khỏi giỏ hàng';

	const classes = useStyles();

	const productSelection = useSelector((state: RootState) => state.ProductSelection, shallowEqual);

	const { selectedProducts } = productSelection
	const dispatch = useDispatch();

	return (
		<div className={classes.divMain}>
			<Grid container justify='center' alignContent='center'>
				{products.map((product) => {
					const isSelected = selectedProducts?.filter(selectedProduct => selectedProduct.id === product.id)?.length > 0

					// action callback
					const actionCallback = isSelected
						? () => {
							dispatch(ProductSelectionSlice.actions.deleteSelectedProduct(product.id));
						}

						: () => {
							dispatch(ProductSelectionSlice.actions.addSelectedProduct({ id: product.id }));
						}

					return <Grid item xs={3} className={classes.gridItem} key={product.id}>
						<ProductItem product={product} actionComponent={getActionButton(
							ACTION_BUTTON_LABEL,
							ACTION_BUTTON_REMOVE_LABEL,
							isSelected,
							actionCallback,
							false
						)} />
					</Grid>
				})}
			</Grid>
		</div>
	);
};

function getActionButton(
	label: string,
	selectedLabel: string,
	isSelected: boolean,
	clickCallBack: () => void,
	disabled?: boolean
) {
	if (isSelected) {
		return (
			<Button
				color="primary"
				disabled={disabled}
				fullWidth
				onClick={clickCallBack}
				size="large"
				variant="outlined"
			>
				{selectedLabel}
			</Button>
		)
	}

	return (
		<Button
			color="secondary"
			disabled={disabled}
			fullWidth
			onClick={clickCallBack}
			size="large"
			variant="contained"
		>
			{label}
		</Button>
	)
}

export default ProductSelection;
