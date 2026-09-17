const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");
//const { string } = require("joi");

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,

  // Updated this section: this is new final code

  image: {
  url: {
    type: String,
    default: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85"
  },
  filename: {
    type: String,
    default: "default_image"
  }
},

  // image: {
  //   url: String,
  //   filename: String,
  // },

// old code
//   image: {
//     type: String,
//     default:
//       "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
//     set: (v) =>
//       v === ""
//         ? "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
//         : v,
//   },
 // price: Number,
   price: {
    type: Number,
    required: true
  },
  location: String,
  country: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  geometry: {
  type: {
    type: String,
    enum: ["Point"],
    required: true,
    default: "Point"  // Added new
  },
  coordinates: {
    type: [Number],
    required: true,
    default: [75.8577, 22.7196] // Default longitude and latitude
  },
},
});

listingSchema.post("findOneAndDelete", async (listing) => {
  if(listing) {
    await Review.deleteMany({_id : { $in: listing.reviews } });
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;