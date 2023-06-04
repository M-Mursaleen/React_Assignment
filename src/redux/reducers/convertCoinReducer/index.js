import {createSlice} from "@reduxjs/toolkit";
import {convertCurrency} from "../../actions/convertCoinsActions"


const ConvertCoinReducer = createSlice({
    name:'convert',
    initialState: {
        data: [],
        currencyName: [
            {
                'nzd':"NZD",
                'usd':"USD",
                'eur':"EUR",
                'gbp':"GBP",
                'aud':"AUD",
                'cad':"CAD",
                'inr':"INR",
                'pkr':"PKR",
            }
        ],
        storeCurrencyVal: [],
        loading: true,
        error: false,
        errorValue: null
    },
    reducers:{
        storeCurrencyData(state, action){
            state.storeCurrencyVal.push(action.payload)
        }
    },
    extraReducers:(builder) => {
        builder
            .addCase(convertCurrency.pending, (state,action) => {
                state.loading=true
            })
            .addCase(convertCurrency.fulfilled, (state, action)=>{
                state.data=action.payload
                state.loading=false
            })
            .addCase(convertCurrency.rejected, (state, action) => {
                state.errorValue = action.error.message;
                state.loading = false
                state.error = true
            })
    }
})
export const {storeCurrencyData} = ConvertCoinReducer.actions;

export default ConvertCoinReducer.reducer;