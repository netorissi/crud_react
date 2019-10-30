export default theme => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        flexDirection: 'column',
        backgroundColor: '#fff',
        boxShadow: '0px -2px 4px 0 rgba(0, 0, 0, 0.3) inset',
        padding: theme.spacing(3),
        '& img': {
            maxWidth: 200,
            marginTop: 10
        },
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(2),
            '& img': {
                maxWidth: 100,
                marginTop: 0
            },
            '& p': {
                fontSize: 11
            }
        }
    }
})