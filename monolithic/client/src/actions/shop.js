import axios from 'axios';
import {
    GET_ALL_SHOP, GET_SHOP_BY_ID, CREATE_SHOP, UPDATE_SHOP, DELETE_SHOP, GET_ALL_SHOP_ERROR, GET_SHOP_BY_ID_ERROR, CREATE_SHOP_ERROR, UPDATE_SHOP_ERROR, DELETE_SHOP_ERROR,
} from './types';

export const getAllShops = (token) => async dispatch => {
    const config = {
        headers: {
            'Content-Type':'application/json',
            'Authorization': `Bearer ${token}`
        }
    }
    try {
        const res = await axios.get('/api/shops');
        dispatch({
            type: GET_ALL_SHOP,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: GET_ALL_SHOP_ERROR,
            payload: error.response && error.response.data.error
        });
    }
}

export const getShopById = (token,id) => async dispatch => {
    const config = {
        headers: {
            'Content-Type':'application/json',
            'Authorization': `Bearer ${token}`
        }
    }
    try {
        const res = await axios.get('/api/shops'+id);
        dispatch({
            type: GET_SHOP_BY_ID,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: GET_SHOP_BY_ID_ERROR,
            payload: error.response && error.response.data.error
        });
    }
}

export const createShop = (token,name,location) => async dispatch => {
    const config = {
        headers: {
            'Content-Type':'application/json',
            'Authorization': `Bearer ${token}`
        }
    }
    const body = JSON.stringify({name,location});
    try {
        const res = await axios.post('/api/shops', body, config);
        dispatch({
            type: CREATE_SHOP,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: CREATE_SHOP_ERROR,
            payload: error.response && error.response.data.error
        });
    }
}

export const updateShop = (token,id,name,location) => async dispatch => {
    const config = {
        headers: {
            'Content-Type':'application/json',
            'Authorization': `Bearer ${token}`
        }
    }
    const body = JSON.stringify({name,location});
    try {
        const res = await axios.put('/api/shops'+id, body, config);
        dispatch({
            type: UPDATE_SHOP,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: UPDATE_SHOP_ERROR,
            payload: error.response && error.response.data.error
        });
    }
}

export const deleteShop = (token,id) => async dispatch => {
    const config = {
        headers: {
            'Content-Type':'application/json',
            'Authorization': `Bearer ${token}`
        }
    }
    try {
        const res = await axios.delete('/api/shops'+id, config);
        dispatch({
            type: DELETE_SHOP,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: DELETE_SHOP_ERROR,
            payload: error.response && error.response.data.error
        });
    }
}