import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import {Brightness3, Favorite, FlareRounded} from '@material-ui/icons';
import './index.css';
import {Button, IconButton, Link} from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import {makeStyles, ThemeProvider} from '@material-ui/core/styles';
import React, {useEffect, useState} from 'react';
import {isMobile} from 'react-device-detect';
import ReactGA, {ga} from 'react-ga';

import AlertsBanner from './components/AlertsBanner';
import ComponentsTooltip from './components/ComponentsTooltip';
import CookiesBanner from './components/CookiesBanner';
import InfoDialog from './components/InfoDialog';
import {PrivacyPolicy} from './constants/PrivacyTexts';
import theme from './muiTheme';
import Decision from './scenes/Decision/Decision';

const useStyles = makeStyles(styleTheme => ({
	divMain: {
		flexGrow: 1,
		width: '100%',
		overflowX: 'hidden', //Avoid negative margin from mainGrid
		display: 'flex',
		flexDirection: 'column',
		minHeight: '100vh',
	},

	appBar: {
		Top: 'env(safe-area-inset-top)',
		background: 'transparent',
		boxShadow: 'none',
		paddingTop: styleTheme.spacing(1),
		justifyContent: 'center',
		justifyItems: 'center',
		paddingLeft: 'env(safe-area-inset-left)',
		paddingRight: 'env(safe-area-inset-right)',
	},

	logo: {
		maxWidth: styleTheme.spacing(17),
		height: '60%',
	},

	footer: {
		marginTop: 'auto',
		marginBottom: styleTheme.spacing(0.5),
		paddingBottom: 'env(safe-area-inset-bottom)',
		zIndex: 900,
	},
	linkButton: {
		textTransform: 'none',
		textDecoration: 'underline',
		marginTop: styleTheme.spacing(-0.5),
		fontWeight: 'normal',
		'&:hover': {
			textDecoration: 'underline',
		},
	},
}));

const App: React.FC = () => {
	const classes = useStyles();

	const [isPrivacyPolicyVisible, setIsPrivacyPolicyVisible] = useState(false);
	const [isDarkModeActive, setIsDarkModeActive] = useState(false);

	useEffect(() => {
		defineDarkMode();

		logAppVersion();

		initializeGoogleAnalytics();
	}, []);

	useEffect(() => {
		if (isDarkModeActive) {localStorage.setItem('isDarkModeActive', 'true');}
		else {localStorage.setItem('isDarkModeActive', 'false');}
	}, [isDarkModeActive]);

	const defineDarkMode = () => {
		if (localStorage.getItem('isDarkModeActive') == null) {
			if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
				setIsDarkModeActive(true);
				localStorage.setItem('isDarkModeActive', 'true');
			} else {
				setIsDarkModeActive(false);
				localStorage.setItem('isDarkModeActive', 'false');
			}
		} else if (localStorage.getItem('isDarkModeActive') === 'true') {setIsDarkModeActive(true);}
	};

	const initializeGoogleAnalytics = () => {
		if (process.env.REACT_APP_googleAnalyticsKey != null) {ReactGA.initialize(process.env.REACT_APP_googleAnalyticsKey);}

		if (window.matchMedia('(display-mode: standalone)').matches) {
			ReactGA.event({
				category: 'App Mode',
				action: 'Progressive Web App',
			});
		} else {
			ReactGA.event({
				category: 'App Mode',
				action: 'Web App',
			});
		}
	};

	const logAppVersion = () => {
		ReactGA.pageview(window.location.pathname + window.location.search);
		ga('set', 'appVersion', process.env.REACT_APP_VERSION);

		// eslint-disable-next-line no-console
		console.info(`${process.env.REACT_APP_NAME} ${process.env.REACT_APP_VERSION}`);
	};

	const handleClickOnDarkMode = () => {
		ReactGA.event({
			category: 'Change dark mode',
			action: (!isDarkModeActive).toString(),
		});

		setIsDarkModeActive(darkMode => !darkMode);
	};

	const appTheme = React.useMemo(() => theme(isDarkModeActive), [isDarkModeActive]);

	return (
		<ThemeProvider theme={appTheme}>
			<CssBaseline />
			<main role='main'>
				<div className={classes.divMain}>
					<AppBar
						position='static'
						color='primary'
						className={classes.appBar}
						style={{marginBottom: isMobile ? 0 : appTheme.spacing(-2)}}
					>
						<Toolbar>
							{/* <Logo className={classes.logo} fill={isDarkModeActive ? 'white' : appTheme.palette.primary.main} /> */}
							<div style={{flexGrow: 1}} />
							<ComponentsTooltip>
								<IconButton
									aria-label={isDarkModeActive ? 'Set light theme' : 'Set dark theme'}
									onClick={handleClickOnDarkMode}
									data-testid='darkModeButton'
								>
									{isDarkModeActive ? <FlareRounded /> : <Brightness3 />}
								</IconButton>
							</ComponentsTooltip>
						</Toolbar>
					</AppBar>
					<Decision />
					<Grid className={classes.footer} container justify='center' alignContent='center'>
						<Typography component='span' variant='caption' align='center'>
							<Grid item xs={12}>
								Made with&nbsp;
								<span style={{position: 'relative', top: appTheme.spacing(0.35)}}>
									<Favorite aria-label='love' fontSize='inherit' />
								</span>
								&nbsp;by
{' '}
								<Link
									data-testid='cjoeckerLink'
									href='https://www.cjoecker.de/'
									onClick={() =>
										ReactGA.event({
											category: 'Redirect',
											action: 'Redirect to cjoecker.de',
										})
									}
									rel='noopener noreferrer'
									underline='always'
									target='_blank'
									tabIndex={localStorage.getItem('cookieConsentAccepted') == null ? -1 : 0}
									aria-label={"Christian Jöcker's(opens personal website in a new window)"}
								>
									Christian Jöcker
								</Link>
							</Grid>
							<Grid item xs={12}>
								<Button
									className={classes.linkButton}
									data-testid='privacyPolicyLink'
									onClick={() => setIsPrivacyPolicyVisible(true)}
									color='primary'
								>
									Privacy Policy
								</Button>
							</Grid>
						</Typography>
					</Grid>
					<AlertsBanner />
					<CookiesBanner />
					<InfoDialog
						hasFullWidth
						text={PrivacyPolicy}
						isVisible={isPrivacyPolicyVisible}
						onClose={() => setIsPrivacyPolicyVisible(false)}
					/>
				</div>
			</main>
		</ThemeProvider>
	);
};

export default App;
