
export const desc = (a, b, orderBy) => {

	if (orderBy === 'priceFull' || orderBy === 'pricePaid' || orderBy === 'priceDiscount') {
		if (parseFloat(b[orderBy]) < parseFloat(a[orderBy])) return -1;
		if (parseFloat(b[orderBy]) > parseFloat(a[orderBy])) return 1;
	} else {
		if (b[orderBy] < a[orderBy]) return -1;
		if (b[orderBy] > a[orderBy]) return 1;
	}

	return 0;
}

export const stableSort = (array, cmp) => {

	const stabilizedThis = array.map((el, index) => [el, index]);
	stabilizedThis.sort((a, b) => {
		const order = cmp(a[0], b[0]);
		if (order !== 0) return order;
		return a[1] - b[1];
	});

	return stabilizedThis.map(el => el[0]);
}

export const getSorting = (order, orderBy) => {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}
