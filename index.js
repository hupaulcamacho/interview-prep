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

const makeOffer = (listingId, amount) => {
    offers.insert({ listingId, amount })
}

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


let allOffers = offers.where(offer => offer.amount > 300000);

function getOffersWithinPriceRange (min, max) {
    return offers.where(offer => offer.amount > min && offer.amount < max);
}

// console.log(getOffersWithinPriceRange(200000, 400000))
// console.log(listings.data)

function getListingWithMostOffers(listings, offers) {
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

console.log(getListingWithMostOffers(listings, offers))