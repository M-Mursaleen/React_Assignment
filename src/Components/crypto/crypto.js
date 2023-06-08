import React, {useEffect} from "react"
import { useSelector, useDispatch } from 'react-redux';
import {fetchData} from "../../redux/actions/fetchCoinsActions";
import {purchasedMoreCoins} from "../../redux/reducers/coinDataReducer";
import {storeCurrencyData} from "../../redux/reducers/convertCoinReducer";
import {useNavigate} from "react-router-dom";

const CryptoExchange = () => {
    const history = useNavigate();
    const coinsData = useSelector((state) => state.coinData);
    const userPurchasedCoin = coinsData['purchasedCoins']
    const { rates } = coinsData.data;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchData())
        dispatch(purchasedMoreCoins({ symbol: 'ADZ', amount: 2 }))
        },[])

    const handleButtonClick = (rowData) => {
        dispatch(storeCurrencyData(rowData))
        history('/transfer');

    }

    console.log('Coins==>', userPurchasedCoin)
    console.log('rates==>', rates)
    return(
        <>
            <div className="p-4">
                <h2 className="text-2xl font-bold mb-4 text-center">User's Purchased Coins</h2>
                <table className="w-full table-fixed border border-gray-300">
                    <thead>
                    <tr className="bg-gray-200">
                        <th className="py-2 px-4 border-b w-1/3">Coin</th>
                        <th className="py-2 px-4 border-b w-1/3">Amount</th>
                        <th className="py-2 px-4 border-b w-1/3">Live Rate</th>
                        <th className="py-2 px-4 border-b w-1/3">Option</th>
                    </tr>
                    </thead>
                    <tbody>
                    {rates && userPurchasedCoin.map((coin) => (
                        <tr key={coin.symbol} className="bg-gray-100 hover:bg-gray-200">
                            <td className="py-2 px-4 border-b w-1/3">{coin.symbol}</td>
                            <td className="py-2 px-4 border-b w-1/3">{coin.amount}</td>
                            <td className="py-2 px-4 border-b w-1/3">
                                <span className={`${rates[coin.symbol] > 0 ? 'text-green-500': 'text-red-500'}`}>
                                    {rates[coin.symbol]}
                                </span>
                            </td>
                            <td className="py-2 px-4 border-b w-1/3">
                                <button
                                    onClick={() => handleButtonClick(coin)}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
                                    Transfer
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    )

}
// className={`${rates[coin.symbol] > 0 ? 'text-green-500': 'text-red-500'}`}
export default CryptoExchange;