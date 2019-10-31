export default theme => ({
    tableHeader: {
        fontSize: 12,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color: '#68de39',
        verticalAlign: 'middle',
        '& span': {
            '&.MuiTableSortLabel-active': {
                color: '#68de39'
            }
        }
    },
    tableText: {
        height: 70,
        fontSize: 15,
        verticalAlign: 'middle',
        color: 'rgba(0,0,0,0.75)'
    }
})