import './App.css';

import {useState, useEffect} from 'react';
// import axios from 'axios';

import DisplayListings from './DisplayListings';
import CurrencyConvert from './CurrencyConvert';
import swal from 'sweetalert';

function App() {

  const [listings, setListings] = useState([]);
  const [ids, setIds] = useState();
  const proxy = new URL('https://proxy.hackeryou.com');
  // MAX 333/day
  const apiKey = Math.random() < 0.5
  ? "9fc5206c-147c-464f-aee0-4ded8edc181e"
  : "32e9fe03-aacb-4d86-8344-12830a42e6a2";

  useEffect(() => {

    // https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest FOR PRICING
    // https://pro-api.coinmarketcap.com/v1/cryptocurrency/info FOR LOGO/DESCRIPTION/TECH DOC

    // WORKS WITH PROXY
    // https://cors-anywhere.herokuapp.com/
    // http://proxy.hackeryou.com

//First Url Construct
    const url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/map';

    proxy.search = new URLSearchParams({
      reqUrl: url,
      'params[CMC_PRO_API_KEY]': apiKey,
      // 'params[id]': 1,
      // 'params[convert]: 'CAD',
      'params[limit]': 15,
      'params[sort]': 'cmc_rank'
    });
// FIRST CALL, FOR ID's
    fetch(proxy) 
      .then( (res) => {
        return res.json()
      })
      .then( (res) => {
        // console.log('Top 15', res.data);
        const top15Array = (res.data);
        
        const idArray = top15Array.map( (listingObj) => {
          return listingObj.id;
        })
        // console.log('ID Array', idArray);
        setIds(idArray);
        // console.log('New id state', ids)

// Second Url Construct
        const url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest';
        proxy.search = new URLSearchParams({
          reqUrl: url,
          'params[CMC_PRO_API_KEY]': apiKey,
          'params[id]': idArray,
          // 'params[convert]: 'CAD',
        });

    // Can't use cmc_rank on basic plan so doing 2 calls for work-around
// SECOND CALL, FOR PRICE DATA (Default USD)
        fetch(proxy) 
          .then( (res) => {
           return res.json();
          }).then( (res) => {
            // Returns Object of id:{} pairs
            // console.log('Price info', res.data)
            // Returns Array of objects
            const priceArray = Object.values(res.data)
            // console.log(priceArray);
            // Order the Array by Ranking
            const sortedArray = priceArray.sort((a, b) => a.cmc_rank - b.cmc_rank);
            // console.log(sortedArray);
            setListings(sortedArray);
          })
          .catch((error) => {
            console.log(error)
            swal("Oops", "Something went wrong!", "error");
          })
        
      })
      .catch((error) => {
        console.log(error)
        swal("Oops", "Something went wrong!", "error");
      })

  }, [])


  const priceConvert = (convert) => {
    const url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest';
    // console.log('TEST');
        proxy.search = new URLSearchParams({
          reqUrl: url,
          'params[CMC_PRO_API_KEY]': apiKey,
          'params[id]': ids,
//UPDATED CONVERSION
          'params[convert]': `${convert}`,
        });
        fetch(proxy) 
          .then( (res) => {
            if (res.status === 200) {
              return res.json();
            } else {
              throw Error(res.statusText)
            }
          }).then( (res) => {
            // Returns Object of id:{} pairs by default
            // Now returns Array of objects
            const priceArray = Object.values(res.data)
            console.log(priceArray);
            // Order the Array by Ranking
            const sortedArray = priceArray.sort((a, b) => a.cmc_rank - b.cmc_rank);
            // console.log('Out of useEffect Call', sortedArray);
            setListings(sortedArray);
          })
          .catch((error) => {
            console.log(error);
            swal("Oops", "Something went wrong!", "error");
          })
  }

  return (
    <div className="App">
        <nav>
          <ul className="nav">
            <li className="navLi"><a href="#">Home</a></li>
            <li className="navLi"><a href="#">Favourites</a></li>
          </ul>
        </nav>

      <main className="main">
        <div className="title">
          <h1>Top 15 Cryptocurrencies by Marketcap</h1>
          {/* <button onClick={handleClick} type="submit">Pressss Me</button> ADD LATER*/}
        </div>

        <CurrencyConvert priceConvert={priceConvert}/>
        <ul className="listings">
        {
          listings.map((listing) => {
            return <DisplayListings listing={listing} key={listing.id} />
          })
        }
        </ul>
      </main>
    </div>
  );
}

export default App;
