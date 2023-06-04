import { configureStore } from '@reduxjs/toolkit';
import coinDataReducer from './reducers/coinDataReducer/index'
import convertCoinReducer from './reducers/convertCoinReducer/index'

import logger from "redux-logger";

// const store = configureStore({
//     reducer: {
//         coinData: rootReducers
//     },
//     middleware:(getDefaultMiddleware => {
//         return getDefaultMiddleware().concat(logger)
//     })
// });
const store = configureStore({
    reducer: {
        coinData: coinDataReducer,
        coinConversion: convertCoinReducer,
    },
    middleware:(getDefaultMiddleware => {
        return getDefaultMiddleware().concat(logger)
    })
});
export default store;