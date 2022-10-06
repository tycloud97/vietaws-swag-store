import { Box, makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import React from 'react';

// const onChangeNewEntry$ = new Subject();

const useStyles = makeStyles((theme) => ({
	divMain: {
		paddingTop: theme.spacing(2.5),
		paddingBottom: theme.spacing(5.5),
		textAlign: 'center',
	},


	paperTitle: {
		margin: theme.spacing(2, 1, 2, 1),
	},

	// 	paperItems: {
	// 		margin: theme.spacing(1, 1, 0, 1),
	// 	},

	// 	entryButtons: {
	// 		marginRight: theme.spacing(1),
	// 		marginLeft: theme.spacing(3),
	// 	},

	// 	inputBase: {
	// 		margin: theme.spacing(1, 2, 1.5, 2.5),
	// 		width: '100%',
	// 		wordWrap: 'break-word',
	// 	},
}));



const Thanks: React.FC = () => {

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


	return (
		<div className={classes.divMain}>
			<Grid container justify='center' alignContent='center'>
				<Grid item xs={12}>
					<Box display='flex' alignItems='center'>
						<Box width='100%' mr={1}>
							Confirm
						</Box>
						{/* <Box width='100%' mr={1}>
								<ComponentsTooltip title='Write new entry'>
									<Input
										inputProps={{
											'data-testid': 'entryInput',
											'aria-label': `New ${itemsType}`,
										}}
										className={classes.inputBase}
										placeholder='New Entry'
										value={newEntry}
										onKeyPress={event => {
											if (event.key === 'Enter') {
												event.preventDefault();
												onCreateItem(newEntry);
											}
										}}
										onChange={onChangeNewEntry}
										multiline
									/>
								</ComponentsTooltip>
							</Box> */}
						{/* <Box width={theme.spacing(10)}>
								<ComponentsTooltip title='Add entry'>
									<IconButton
										data-testid='addButton'
										aria-label={`Create new ${itemsType}`}
										className={classes.entryButtons}
										onClick={() => onCreateItem(newEntry)}
									>
										<AddIcon />
									</IconButton>
								</ComponentsTooltip>
							</Box> */}
					</Box>
				</Grid>
				{/* <Grid item xs={12}>
					<InstructionsBox show={areInstructionsVisible} width='100%' />
				</Grid> */}
				{/* {localItems.map((item, index) => (
					<Fade
						in
						style={{
							transitionDelay: `${stopAnimation ? 0 : startAnimationDelay + index * animationDelayPerItem}ms`,
						}}
						timeout={500}
						onEntered={() => endOfAnimation(index)}
						key={item.id}
					>
						<Grid item xs={12}>
							<Paper className={classes.paperItems} elevation={1}>
								<Box display='flex' alignItems='center'>
									<Box width='100%' mr={1}>
										<ComponentsTooltip title='Edit entry'>
											<Input
												inputProps={{
													'data-testid': `itemInput`,
													'aria-label': `Edit ${itemsType}`,
												}}
												className={classes.inputBase}
												value={item.name}
												onChange={event => onChangeItem(event, item.id)}
												onBlur={() => onLeaveItem(item)}
												multiline
												onKeyDown={event => {
													if (event.key === 'Enter') {
														event.preventDefault();
														if (document.activeElement instanceof HTMLElement) {
															document.activeElement.blur();
														}
													}
												}}
											/>
										</ComponentsTooltip>
									</Box>
									<Box width={theme.spacing(10)}>
										<ComponentsTooltip title='Delete entry'>
											<IconButton
												data-testid={`deleteButton${index}`}
												aria-label={`Delete ${itemsType}`}
												onClick={() => onDeleteItem(item)}
												className={classes.entryButtons}
											>
												<DeleteIcon />
											</IconButton>
										</ComponentsTooltip>
									</Box>
								</Box>
							</Paper>
						</Grid>
					</Fade>
				))} */}
			</Grid>
		</div>
	);
};

export default Thanks;
