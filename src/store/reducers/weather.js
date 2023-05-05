import {createAction, handleActions} from "redux-actions";

const SET_CITY = `SET_CITY`;
const APPEND_CITY = `APPEND_CITY`;

export const setCityAction = createAction(SET_CITY);
export const appendCityAction = createAction(APPEND_CITY);

const initialState = {
    cityData: [],
};

export default handleActions(
    {
        [SET_CITY]: (state, { payload }) => ({ ...state, cityData: payload}),
        [APPEND_CITY]: (state, { payload }) => ({ ...state, cityData: [...state.cityData, payload]}),
    },
    initialState
);

export const citySelector = (state) => state.cityData;