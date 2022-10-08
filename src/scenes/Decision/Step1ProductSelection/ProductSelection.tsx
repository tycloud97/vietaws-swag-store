import { Button, makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import { getProducts } from 'services/product-service';
import ProductItem from './components/ProductItem';

// const onChangeNewEntry$ = new Subject();

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
	const actionButtonLabel = 'Thêm vào giỏ hàng';
	const actionButtonRemoveLabel = 'Xóa khỏi giỏ hàng';
	const isSelected = false
	// const [didMount, setDidMount] = useState(false);
	// const [newEntry, setNewEntry] = useState('');
	// const [localItems, setLocalItems] = useState<OptionAndCriteria[]>([]);
	// const [stopAnimation, setStopAnimation] = useState(false);
	// const [itemsType, setItemsType] = useState('');
	// const items = useSelector((state: RootState) => state.OptionsAndCriteria[itemsKey], shallowEqual);
	// const [areInstructionsVisible, setAreInstructionsVisible] = useState(false);
	// const newEntryRef = useRef('');

	// const {instructionsStepNum} = useSelector((state: RootState) => state.App, shallowEqual);

	// const paperRef = useRef(null);

	// const startAnimationDelay = 400;
	// const animationDelayPerItem = 200;

	// const isDecisionOptionsList = itemsKey === OptionsAndCriteriaKeys.decisionOptions;

	const classes = useStyles();
	// const dispatch = useDispatch();
	// const theme = useTheme();
	const actionCallback = () => { }

	const disabled = false
	return (
		<div className={classes.divMain}>
			<Grid container justify='center' alignContent='center'>
				{products.map((product) => <Grid item xs={3} className={classes.gridItem} key={product.id}>
					<ProductItem product={product} actionComponent={getActionButton(
						actionButtonLabel,
						actionButtonRemoveLabel,
						isSelected,
						actionCallback,
						disabled
					)} />
				</Grid>)}
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
			color="primary"
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
