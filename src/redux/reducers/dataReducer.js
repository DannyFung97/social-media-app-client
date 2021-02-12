import {
  SET_HOLLAS,
  LIKE_HOLLA,
  UNLIKE_HOLLA,
  LOADING_DATA,
  DELETE_HOLLA,
  POST_HOLLA,
  SET_HOLLA,
  SUBMIT_COMMENT,
  REPLACE_IMAGES
} from "../types";

const initialState = {
  hollas: [],
  holla: {},
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case SET_HOLLAS:
      return {
        ...state,
        hollas: action.payload,
        loading: false,
      };
    case SET_HOLLA:
      return {
        ...state,
        holla: action.payload,
      };
    case LIKE_HOLLA:
    case UNLIKE_HOLLA:
      state.hollas[
        state.hollas.findIndex(
          (holla) => holla.hollaId === action.payload.hollaId
        )
      ] = action.payload;
      if (state.holla.hollaId === action.payload.hollaId) {
        state.holla = action.payload;
      }
      return {
        ...state,
      };
    case DELETE_HOLLA:
      state.hollas.splice(
        state.hollas.findIndex((holla) => holla.hollaId === action.payload),
        1
      );
      return {
        ...state,
      };
    case POST_HOLLA:
      return {
        ...state,
        hollas: [action.payload, ...state.hollas],
      };
    case SUBMIT_COMMENT:
      return {
        ...state,
        holla: {
          ...state.holla,
          comments: [action.payload, ...state.holla.comments],
        },
        hollas: state.hollas.map(_holla => {
          if (_holla.hollaId == action.payload.hollaId) {
            return {
              ..._holla,
              commentCount: _holla.commentCount + 1
            }
          }
          return _holla
        }),
      };
    case REPLACE_IMAGES: {
      return {
        ...state,
        hollas: state.hollas.map(_holla => {
          if (_holla.userHandle == action.payload.userHandle) {
            return {
              ..._holla,
              userImage: action.payload.imageUrl
            }
          }
          return _holla
        })
      }
    }
    default:
      return state;
  }
}
