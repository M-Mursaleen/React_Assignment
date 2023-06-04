import {createAsyncThunk} from "@reduxjs/toolkit";
import {apiUrl, accessKey} from "../../constants";


export const convertCurrency = createAsyncThunk(
    'convert/convertCurrency',
    async ({fromCurrency, toCurrency, amount}) => {
        try {
            const response = await fetch(apiUrl.conversionUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    access_key: accessKey,
                    from: fromCurrency,
                    to: toCurrency,
                    amount: amount,
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to convert currency.');
            }
            return await response.json();
        } catch (error) {
            throw new Error(error.message);
        }
    }
);