import React, { useState, Fragment } from 'react';

// ## --------- MATERIAL UI --------- ## //
import {
	withStyles, 
	Table, 
	TableBody, 
	TableCell, 
	TableHead,
	TablePagination, 
	TableRow, 
	TableSortLabel, 
	Hidden
} from '@material-ui/core';

// ## --------- STYLES --------- ## //
import style from '../assets/styles/tableList';

const TableList = props => {
	const { data, headers, content, orderByInitial, orderInitial, classes } = props;
	const [order, setOrder] = useState(orderInitial);
	const [orderBy, setOrderBy] = useState(orderByInitial);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(25);

	function createSortHandler(event, property) {
		const isDesc = orderBy === property && order === 'desc';
		setOrder(isDesc ? 'asc' : 'desc');
		setOrderBy(property);
	}

	function handleChangePage(event, newPage) {
		setPage(newPage);
	}

	function handleChangeRowsPerPage(event) {
		setRowsPerPage(+event.target.value);
		setPage(0);
	}

	return (
		<Fragment>
			<Table>
				<TableHead>
					<TableRow>
						{headers.map( (header, index) => (

							header.mobile ? (
								header.sort ? (
									<TableCell
									key={index}
									className={classes.tableHeader}
									align={header.align}
									sortDirection={orderBy === header.column ? order : false}
									>
										<TableSortLabel
										active={orderBy === header.column}
										direction={order}
										onClick={event => createSortHandler(event, header.column)} >
											<span style={header.style}>{header.name}</span>
										</TableSortLabel>
									</TableCell>
								) : (
									<TableCell
									key={index}
									className={classes.tableHeader}
									align={header.align}
									>
										<span style={header.style}>{header.name}</span>
									</TableCell>
								)
							) : (
								<Hidden
								smDown
								key={index}
								>
									{header.sort ? (
										<TableCell
										className={classes.tableHeader}
										align={header.align}
										sortDirection={orderBy === header.column ? order : false}
										>
											<TableSortLabel
											active={orderBy === header.column}
											direction={order}
											onClick={event => createSortHandler(event, header.column)} >
												<span style={header.style}>{header.name}</span>
											</TableSortLabel>
										</TableCell>
									) : (
										<TableCell
										className={classes.tableHeader}
										align={header.align}
										>
											<span style={header.style}>{header.name}</span>
										</TableCell>
									)}
								</Hidden>
							)
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{content(data, order, orderBy, page, rowsPerPage)}
				</TableBody>
			</Table>
			<TablePagination
				style={{ marginTop: 30 }}
				rowsPerPageOptions={[25]}
				component="div"
				count={data.length}
				rowsPerPage={rowsPerPage}
				page={page}
				labelDisplayedRows={() => "Total: " + data.length}
				backIconButtonProps={{
					'aria-label': 'Próxima',
				}}
				nextIconButtonProps={{
					'aria-label': 'Anterior',
				}}
				onChangePage={handleChangePage}
				onChangeRowsPerPage={handleChangeRowsPerPage}
			/>
		</Fragment>
	);
}

export default withStyles(style)(TableList);
