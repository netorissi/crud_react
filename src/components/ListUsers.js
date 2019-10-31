import React, { Component } from 'react';

// ## --------- MATERIAL-UI --------- ## //
import { 
    withStyles,
    Grid,
    TableRow,
    TableCell,
    Hidden,
    Fab,
    TextField,
    Typography
} from '@material-ui/core';

// ## --------- COMPONENTS --------- ## //
import TableList from './TableList';

// ## --------- STYLES --------- ## //
import style from '../assets/styles/users';

// ## --------- HELPERS --------- ## //
import * as formatters from '../helpers/formatters';
import * as tableHelper from '../helpers/tables';

// ## --------- ICONS --------- ## //
import { MdPersonPin, MdEdit, MdSentimentDissatisfied } from 'react-icons/md';

const tableHeaders = [
	{
		name: 'Nome',
		column: 'userName',
		sort: true,
		align: 'center',
		style: { marginLeft: 25 },
		mobile: true
	},
	{
		name: 'Documento',
		column: 'document',
		sort: true,
		align: 'center',
		style: { marginLeft: 25 },
		mobile: false
	},
	{
		name: '',
		column: null,
		sort: false,
		align: 'right',
		style: { marginRight: 9 },
		mobile: true
	}
]

class ListUsers extends Component {

    state = {
		textFilter: ''
    }
    
    changeSearch = event => this.setState({ textFilter: event.target.value });

    tableContent = (data, order, orderBy, page, rowsPerPage) => {
		const { classes, viewUser, editUser } = this.props;
		const { textFilter } = this.state;
		if (data && data.length > 0) {
			return (
				tableHelper.stableSort(data, tableHelper.getSorting(order, orderBy))
				.filter(this.searchingInput(textFilter))
				.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
				.map((item, index) => {

                    const userName = `${item.firstName} ${item.lastName}`;

					return (
						<TableRow
							hover
							tabIndex={-1}
							key={index}
						>
							<TableCell className={classes.tableText} align="center">
								<strong>{userName}</strong>
							</TableCell>
							<Hidden smDown>
								<TableCell className={classes.tableText} align="center">
									{item.document}
								</TableCell>
							</Hidden>
							<TableCell className={classes.tableText} align="right">
                                <Fab
                                title="Detalhe"
                                className={classes.btnFabView}
                                onClick={() => viewUser(item)}
                                >
                                    <MdPersonPin />
                                </Fab>
								<Hidden smDown>
									<Fab
									title="Editar"
									className={classes.btnFabEdit}
									onClick={() => editUser(item)}
									>
										<MdEdit />
									</Fab>
								</Hidden>
							</TableCell>
						</TableRow>
					);
				})
			)
		}

		return (
			<TableRow tabIndex={-1}>
				<TableCell colSpan={tableHeaders.length} className={classes.emptyArray}>
					<MdSentimentDissatisfied/>
					<p>Nenhum registro encontrado!</p>
				</TableCell>
			</TableRow>
		)
	}

	searchingInput = (textFilter) => {
		const filter1 = formatters.removeAccents(textFilter).toLowerCase();
		const filter2 = textFilter.replace(/[^a-zA-Z0-9 ]/g, "");

		return function(users) {
			const firstName = users.firstName
				? formatters.removeAccents(users.firstName).toLowerCase()
				: "";
			const lastName = users.lastName
				? formatters.removeAccents(users.lastName).toLowerCase()
				: "";
			const document = users.document
				? users.document.replace(/[^a-zA-Z0-9 ]/g, "")
				: "";
			const email = users.email
				? formatters.removeAccents(users.email).toLowerCase()
				: "";
			const address = users.address
				? formatters.removeAccents(users.address).toLowerCase()
				: "";
			const neighborhood = users.neighborhood
				? formatters.removeAccents(users.neighborhood).toLowerCase()
				: "";
			
            return (
                firstName.includes(filter1) ||
                lastName.includes(filter1) ||
                document.includes(filter2) ||
                email.includes(filter1) ||
                address.includes(filter1) ||
                neighborhood.includes(filter1) ||
                !textFilter
            );
		};
	}

    render() {

        const { users, classes } = this.props;
        const { textFilter } = this.state;
        
        return (
            <Grid container className={classes.root}>
                
                <Grid item xs={12} className={classes.pd2}>
                    <Typography variant="h5" align="center">
                        Lista de Cadastros
                    </Typography>
                </Grid>

                <Grid item xs={12} className={classes.pd2}>
                    <TextField
                    label="Filtro"
                    value={textFilter}
                    placeholder="Buscar ..."
                    onChange={event => this.changeSearch(event)}
                    margin="normal"
                    variant="outlined"
                    className={classes.textField}
                    />
                </Grid>
                                                
                <Grid item xs={12} className={classes.pd2}>
                    <TableList
                    data={users}
                    headers={tableHeaders}
                    content={this.tableContent}
                    orderByInitial={'name'}
                    orderInitial={'asc'}
                    />
                </Grid>
            </Grid>
        )
    }
}

export default withStyles(style)(ListUsers);