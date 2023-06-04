import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiUrl, accessKey} from "../../constants";


export const fetchData = createAsyncThunk('coinData/fetchData', async () => {
    try {
        const response = await fetch(`${apiUrl.liveUrl}?access_key=${accessKey}`)
        return await response.json();

    } catch (error) {
        return error
    }
});