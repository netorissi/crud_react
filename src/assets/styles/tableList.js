export default () => ({
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
    }
})