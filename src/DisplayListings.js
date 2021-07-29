
const DisplayListings = (props) => {
    // console.log('props obj', props);
    // Destructure 'list' our array out of the props object
    const {listing} = props;

    // Break down 'list' to obtain changing symbol (can't do this inside .map)
        // let objSample = listing[0];
        // console.log(objSample)
        let changingSymbolObj = listing.quote;
        // console.log(changingSymbolObj)
        let changingSymbol = Object.keys(changingSymbolObj)[0];
        // console.log(changingSymbol)
    
    return (
        
            // let changingSymbol = Object.keys(listing.quote)[0];

                <li className="listing" key={listing.id} tabIndex="0">
                    <p>Rank: {listing.cmc_rank}</p>
                    <p>{listing.name}</p>
                    <p>${listing.quote[changingSymbol].price.toFixed(2)}</p>
                </li>
        
    )
}

export default DisplayListings;