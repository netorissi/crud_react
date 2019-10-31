export default theme => ({
    root: {
        maxWidth: 1280
    },
    textField: {
        width: '100%',
    },
    pd2: {
        paddingLeft: theme.spacing(1.3),
        paddingRight: theme.spacing(1.3)
    },
    alignRight: {
        textAlign: 'right'
    },
    button: {
        marginTop: theme.spacing(2)
    },
    tableText: {
		height: 70,
		fontSize: 15,
		verticalAlign: 'middle',
		color: 'rgba(0,0,0,0.75)'
	},
	emptyArray: {
		textAlign: 'center',
		borderBottom: 0,
		'& svg': {
			color: 'rgba(0,0,0,0.25)',
			fontSize: 40
		},
		'& p': {
			fontSize: 14,
			color: 'rgba(0,0,0,0.25)'
		}
	},
	btnFabView: {
		margin: '0 5px',
		width: 40,
		height: 40,
		borderRadius: 50,
		backgroundColor: 'transparent',
		color: '#3f51b5',
		border: '2px solid #3f51b5' 

	},
	btnFabEdit: {
		margin: '0 5px',
		width: 40,
		height: 40,
		borderRadius: 50,
		backgroundColor: 'transparent',
		color: '#68de39',
		border: '2px solid #68de39'
	}
})