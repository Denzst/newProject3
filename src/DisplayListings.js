
const DisplayListings = (props) => {
    // console.log('props obj', props);
    // Destructure 'list' our array out of the props object
    const { listing } = props;

    // Break down 'list' to obtain changing symbol (can't do this inside .map)
    // let objSample = listing[0];
    // console.log(objSample)
    let changingSymbolObj = listing.quote;
    // console.log(listing.quote)
    let changingSymbol = Object.keys(changingSymbolObj)[0];
    // console.log(Object.keys(changingSymbolObj))
    // console.log(typeof listing.quote[changingSymbol].price.toFixed(2));

    // console.log(listing.quote[changingSymbol].price.toFixed(2).length);

    // Setting Up Commas
    let priceLength = listing.quote[changingSymbol].price.toFixed(2);
    let finalPrice;
    if (priceLength.length === 9) {
        finalPrice = priceLength.slice(0, 3) + "," + priceLength.slice(3, 6) + "," + priceLength(6, 9);
    }
    else if (priceLength.length === 8) {
        finalPrice = priceLength.slice(0, 2) + "," + priceLength.slice(2, 8)
    } else if (priceLength.length === 7) {
        finalPrice = priceLength.slice(0, 1) + "," + priceLength.slice(1, 7)
    } else {
        finalPrice = priceLength;
        // return end;
    }

    return (
        // let changingSymbol = Object.keys(listing.quote)[0];

        <li className="listing" key={listing.id} tabIndex="0">
            <p>Rank: {listing.cmc_rank}</p>
            <p className="cryptoName">{listing.name}</p>
            <p>${`${finalPrice}`}</p>
        </li>

    )
}

export default DisplayListings;