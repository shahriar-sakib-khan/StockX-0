//Structure of the updated exchanged items lists for reference

// Updated Delivered Items: Used in Receipt
const brandId = 0;
const cylinderType = "";

const updatedDeliveredItems = {
  cylinder: {
    [brandId]: {
      id: brandId, // string or Number
      brandName: "Brand Name",
      [cylinderType]: {
        quantity: Number,
        price: Number,
        isDue: Boolean
      },
      //...
    },
    //...
  },
  regulator: {
    [brandId]: {
      productName: "Regulator Name",
      quantity: Number,
      price: Number,
      isDue: Boolean
    },
    //...
  },
  stove: {
    [brandId]: {
      productName: "Stove Name",
      quantity: Number,
      price: Number,
      isDue: Boolean
    },
    //...
  }
}



// Updated Received Items: Used in Receipt

const updatedReceivedItems = {
  [brandId]: {
    id: brandId, // string or number
    brandName: "Brand Name",
    [cylinderType]: {
      quantity: Number,
      isDue: Boolean
    },
    //...
  },
  //...
}
