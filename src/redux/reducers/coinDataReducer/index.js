import {createSlice} from "@reduxjs/toolkit";
import {fetchData} from "../../actions/fetchCoinsActions";

const coinDataSlice = createSlice({
    name:'coinData',
    initialState: {
        data: [],
        purchasedCoins : [
            { symbol: 'BTC', amount: 1 },
            { symbol: 'ETH', amount: 2 },
            { symbol: 'LTC', amount: 5 },
        ],
        loading: true,
        error: null,
    },
    reducers:{
        purchasedMoreCoins(state, action){
            state.purchasedCoins.push(action.payload)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchData.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchData.fulfilled, (state, action)=>{
                state.data = action.payload;
                state.loading = false
            })
            .addCase(fetchData.rejected, (state, action)=>{
                state.error = action.payload.error.info
                state.loading = false
            })
    }
});

export const {purchasedMoreCoins} = coinDataSlice.actions

export default coinDataSlice.reducer;

