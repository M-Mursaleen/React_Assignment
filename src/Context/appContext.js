import React, {useState, createContext, useEffect} from "react";



export const UserContext = createContext();

export const UserDataContext = ({children}) => {

    const apiUrl = 'http://api.coinlayer.com/';
    const accessKey = 'a61c81e98c28d1b577294a0ab12ab94c';

    const [userData, setUserData] = useState([])
    const [coinData, setCoinData] = useState()
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    console.log(userData)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${apiUrl}list?access_key=${accessKey}`)
                const data = await response.json();
                setCoinData(data.crypto);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const defaultContext = {
        userData,
        setUserData,
        coinData,
        error,
        loading
    }

    return (
        <UserContext.Provider value={defaultContext}>
            {children}
        </UserContext.Provider>
    );
}