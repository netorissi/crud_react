import React from 'react';
import clsx from 'clsx';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Stepper, Step, StepLabel, StepConnector } from '@material-ui/core';

const ColorlibConnector = withStyles({
	alternativeLabel: {
		top: 20,
	},
	active: {
		'& $line': {
			backgroundImage: 'linear-gradient( 95deg,#68de39 0%,#006064 50%,#3f51b5 100%)',
			boxShadow: '0 4px 10px 0 rgba(0,0,0,.2)'
		},
	},
	completed: {
		'& $line': {
			backgroundColor: '#68de39',
			boxShadow: '0 4px 10px 0 rgba(0,0,0,.2)'
		},
	},
	line: {
		height: 10,
		border: 0,
		backgroundColor: '#e0e0e0',
		borderRadius: 1
	},
})(StepConnector);

const styleStepper = makeStyles({
	root: {
		backgroundColor: '#e0e0e0',
		zIndex: 1,
		color: '#fff',
		width: 50,
		height: 50,
		display: 'flex',
		borderRadius: '50%',
		justifyContent: 'center',
		alignItems: 'center',
		'& svg': {
			width: 30,
			height: 30,
		}
	},
	active: {
		backgroundColor: '#3f51b5',
		boxShadow: '0 4px 10px 0 rgba(0,0,0,.2)',
	},
	completed: {
		backgroundColor: '#68de39',
		boxShadow: '0 0 15px 0 rgba(0,0,0,.2)',
	},
	label: {
		'& span': {
			fontSize: 12,
			textTransform: 'uppercase'
		}
	}
});

export default props => {
	const classes = styleStepper();
	const { activeStep, titleSteps, iconsSteps } = props;

	return (
		<Stepper 
		alternativeLabel 
		activeStep={activeStep} 
		connector={<ColorlibConnector />}
		style={{
			backgroundColor: '#f0f0f0'
		}}
		>
		{titleSteps.map(label => (
			<Step key={label}>
			<StepLabel 
			className={classes.label} 
			StepIconComponent={ props =>
				<div
				className={clsx(classes.root, {
				[classes.active]: props.active,
				[classes.completed]: props.completed,
				})}
				>
					{iconsSteps[props.icon]}
				</div>
			}>
				<strong>{label}</strong>
			</StepLabel>
			</Step>
		))}
		</Stepper>
	);
}
