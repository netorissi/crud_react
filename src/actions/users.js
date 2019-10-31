import axios from 'axios';
import * as actionType from './actionTypes';
import * as acToaster from './toaster';
import { BASE_ENDPOINT } from '../routes/names';

const setUsers = users => ({
	type: actionType.SET_USERS,
	payload: { users }
});

export const getUsers = () => async dispatch => {

    await axios.get(`${BASE_ENDPOINT}/users`)
    .then(async resp => {
        const users = resp.data || [];
        await dispatch(setUsers(users));
    })
    .catch(error => {
        console.log("DEU RUIM", error)
    })
}


export const postUsers = user => async dispatch => {

	await axios.post(`${BASE_ENDPOINT}/users`, user)
    .then(async () => {
        await  dispatch(getUsers());
        await dispatch(acToaster.ACTIVE_TOASTER(
            'success',
            `Olá ${user.firstName}, seu cadastro foi realizado com sucesso!`
        ))
    })
    .catch(error => {
        console.log("DEU RUIM", error)
    })
}

export const putUsers = user => async dispatch => {

	await axios.put(`${BASE_ENDPOINT}/users/${user.id}`, user)
    .then(async () => {
        await  dispatch(getUsers());
        await dispatch(acToaster.ACTIVE_TOASTER(
            'success',
            `${user.firstName}, seu cadastro foi atualizado com sucesso!`
        ))
    })
    .catch(error => {
        console.log("DEU RUIM", error)
    })
}

export const deleteUsers = user => async dispatch => {

	await axios.delete(`${BASE_ENDPOINT}/users/${user.id}`)
    .then(async () => {
        await  dispatch(getUsers());
        await dispatch(acToaster.ACTIVE_TOASTER(
            'success',
            `O cadastro do(a) ${user.firstName}, foi excluído com sucesso!`
        ))
    })
    .catch(error => {
        console.log("DEU RUIM", error)
    })
}
