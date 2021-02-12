import {
    SET_HOLLAS,
    LOADING_DATA,
    LIKE_HOLLA,
    UNLIKE_HOLLA,
    DELETE_HOLLA,
    SET_ERRORS,
    POST_HOLLA,
    CLEAR_ERRORS,
    LOADING_UI,
    SET_HOLLA,
    STOP_LOADING_UI,
    SUBMIT_COMMENT
  } from '../types';
  import axios from 'axios';
  
  // Get all hollas
  export const getHollas = () => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios
      .get('/hollas')
      .then((res) => {
        dispatch({
          type: SET_HOLLAS,
          payload: res.data
        });
      })
      .catch((err) => {
        dispatch({
          type: SET_HOLLAS,
          payload: []
        });
      });
  };
  export const getHolla = (hollaId) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
      .get(`/holla/${hollaId}`)
      .then((res) => {
        dispatch({
          type: SET_HOLLA,
          payload: res.data
        });
        dispatch({ type: STOP_LOADING_UI });
      })
      .catch((err) => console.log(err));
  };
  // Post a holla
  export const postHolla = (newHolla) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
      .post('/holla', newHolla)
      .then((res) => {
        dispatch({
          type: POST_HOLLA,
          payload: res.data
        });
        dispatch(clearErrors());
      })
      .catch((err) => {
        dispatch({
          type: SET_ERRORS,
          payload: err.response.data
        });
      });
  };
  // Like a holla
  export const likeHolla = (hollaId) => (dispatch) => {
    axios
      .get(`/holla/${hollaId}/like`)
      .then((res) => {
        dispatch({
          type: LIKE_HOLLA,
          payload: res.data
        });
      })
      .catch((err) => console.log(err));
  };
  // Unlike a holla
  export const unlikeHolla = (hollaId) => (dispatch) => {
    axios
      .get(`/holla/${hollaId}/unlike`)
      .then((res) => {
        dispatch({
          type: UNLIKE_HOLLA,
          payload: res.data
        });
      })
      .catch((err) => console.log(err));
  };
  // Submit a comment
  export const submitComment = (hollaId, commentData) => (dispatch) => {
    axios
      .post(`/holla/${hollaId}/comment`, commentData)
      .then((res) => {
        dispatch({
          type: SUBMIT_COMMENT,
          payload: res.data
        });
        dispatch(clearErrors());
      })
      .catch((err) => {
        dispatch({
          type: SET_ERRORS,
          payload: err.response.data
        });
      });
  };
  export const deleteHolla = (hollaId) => (dispatch) => {
    axios
      .delete(`/holla/${hollaId}`)
      .then(() => {
        dispatch({ type: DELETE_HOLLA, payload: hollaId });
      })
      .catch((err) => console.log(err));
  };
  
  export const getUserPage = (userHandle) => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios
      .get(`/user/${userHandle}`)
      .then((res) => {
        dispatch({
          type: SET_HOLLAS,
          payload: res.data.hollas
        });
      })
      .catch(() => {
        dispatch({
          type: SET_HOLLAS,
          payload: null
        });
      });
  };
  
  export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };