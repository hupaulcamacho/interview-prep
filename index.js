const lokijs = require('lokijs');

const db = new lokijs()

let listings = db.addCollection('listings');
let offers = db.addCollection('offers');

listings.insert({
    id: 1,
    streetAddress: '1701 Paddock Cir',
    mlsRecordId: 2,
    status: 'active'
});
  
listings.insert({
    id: 2,
    streetAddress: '123 Sesame St',
    mlsRecordId: 7,
    status: 'sold'
});
  
listings.insert({
    id: 3,
    streetAddress: '706 Tammy Dr',
    mlsRecordId: 9,
    status: 'active'
});

listings.insert({
    id: 4,
    streetAddress: '3501 Brooklyn Ave',
    mlsRecordId: 4,
    status: 'inactive'
});

listings.insert({
    id: 5,
    streetAddress: '443 Cheron St',
    mlsRecordId: 10,
    status: 'off_market'
});

listings.insert({
    id: 6,
    streetAddress: '901 42nd St',
    mlsRecordId: 3,
    status: 'active'
});

listings.insert({
    id: 7,
    streetAddress: '55 Sunnyside Blvd',
    mlsRecordId: 6,
    status: 'sold'
});


makeOffer(1, 200000);
makeOffer(1, 250000);
makeOffer(1, 325000);
makeOffer(1, 370000);

makeOffer(2, 14000);
makeOffer(2, 25000);
makeOffer(2, 32000);

makeOffer(3, 325000);
makeOffer(3, 400000);
makeOffer(3, 380000);
makeOffer(3, 200000);
makeOffer(3, 175000);

makeOffer(4, 1325000);
makeOffer(4, 2500000);


makeOffer(5, 325000);
makeOffer(5, 400000);
makeOffer(5, 380000);
makeOffer(5, 200000);
makeOffer(5, 175000);

makeOffer(6, 325000);
makeOffer(6, 400000);
makeOffer(6, 380000);
makeOffer(6, 325000);
makeOffer(6, 400000);
makeOffer(6, 380000);
makeOffer(6, 325000);


makeOffer(7, 325000);
makeOffer(7, 400000);
makeOffer(7, 380000);
makeOffer(7, 200000);
makeOffer(7, 175000);

let allOffers = offers.where(offer => offer.amount > 300000);

// console.log(getOffersWithinPriceRange(200000, 400000))
// console.log(listings.data)


// functions
function makeOffer (listingId, amount) {
    // possible test cases:
    // - empty input (default)
    // - amount is less than the minimum offer
    offers.insert({ listingId, amount })
}

function syncMLSRecordToListing(mlsRecordId) {
    // get recent mlsRecord based on the mlsRecordId
    let mlsListing = getMlsRecord(mlsRecordId)
    // fetch the listing with the corresponding mlsId
    let dbListing = listings.findOne({ mlsRecordId: mlsRecordId })
    // mutate database entry
    dbListing.status = mlsListing.status
    // pass entire record back to update
    listings.update(dbListing)
    
    return dbListing
}

function getOffersWithinPriceRange (min, max) {
    // mainly for search filters
    return offers.find({ amount: { $between: [min, max] } });
}

function getListingWithMostOffers(listings, offers) {
    // access the listings database
    // advertising highly bidded properties
    let listingsArr = listings.data
    let maxOffersListingId = 0
    let maxOffersAmount = 0
    
    for(let i = 0; i < listingsArr.length; i++) {
        let allOffers = offers.find({ listingId: listingsArr[i].id })
        if(maxOffersListingId === 0) {
            maxOffersListingId = listingsArr[i].id
            maxOffersAmount = allOffers.length
        }
        if(allOffers.length > maxOffersAmount) {
            maxOffersAmount = allOffers.length
            maxOffersListingId = listingsArr[i].id
        }
    }
    return listings.findOne({ id: maxOffersListingId })
}

function getOffersByListingId (listingId) {
    return offers.find({ listingId: listingId })
}

function getListingsByStatus (listingStatus) {
    // can input any of the 4 available statuses to find specific listings
    // mainly for search filters
    return listings.find({ status: listingStatus })
}

function getMlsRecord(id) {
    // access mls database
}
