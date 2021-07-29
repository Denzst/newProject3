import { useEffect, useState } from "react";
import swal from "sweetalert";

const CurrencyConvert = (props) => {
    const apiKey = Math.random() < 0.5
  ? "9fc5206c-147c-464f-aee0-4ded8edc181e"
  : "32e9fe03-aacb-4d86-8344-12830a42e6a2";
    // console.log('Currency Component');
    const {priceConvert} = props;

    const [currencies, setCurrencies] = useState([]);
    const [symbols, setSymbols] = useState([]);
    const [convert, setConvert] = useState('USD')

    const handleSelect = (e) => {
        setConvert(e.target.value);
        // console.log(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('submit', convert);
        priceConvert(convert);
    }

    useEffect(() => {
        const url = 'https://pro-api.coinmarketcap.com/v1/fiat/map';

        const proxy = new URL('https://proxy.hackeryou.com');
        proxy.search = new URLSearchParams({
            reqUrl: url,
            'params[CMC_PRO_API_KEY]': apiKey,
        });

        fetch(proxy)
            .then((res) => {
                if (res.status === 200) {
                    return res.json();
                } else {
                    throw Error(res.statusText)
                }
            }).then((res) => {
                // console.log("Currencies", res.data)
                const currencyDataArray = res.data;

                const nameArray = currencyDataArray.map((currency, index) => {
                    return currency.name;
                })
                // console.log("Names", nameArray);

                const symbolArray = currencyDataArray.map((currency, index) => {
                    return currency.symbol;
                })
                setSymbols(symbolArray);
                // console.log("Symbols", symbolArray);

                const currencyArray = nameArray.map((name, index) => name + " - " + symbolArray[index]);
                
                // console.log("Combined", currencyArray);
                setCurrencies(currencyArray);
            })
            .catch((error) => {
                console.log(error);
                swal("Oops", "Something went wrong!", "error");
            })
    }, [])

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="currency">
                Pick a conversion!
            </label>
            <select  onChange={handleSelect} name="currency" id="currency" value={convert}>
                {
                    symbols.map((symbol, index) => {
                        return (
                            <option key={symbol} value={symbol}>{currencies[index]}</option>
                        )
                    })
                }
            </select>
            <button type="submit">Convert</button>
        </form>
    )
}

export default CurrencyConvert;