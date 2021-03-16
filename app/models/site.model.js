module.exports = mongoose => {

    const Site = mongoose.model (
      "site",
      mongoose.Schema (
        {
            //siteName: String,
            name: String,
            street: String,
            city: String,
            zip: String,
            website: String,
            dphLink: String,
            signUpLink: String,
            hasAvailability: Boolean,
            availability: {},
            timestamp: Date,
            latitude: Number,
            longitude: Number
        },
        { timestamps: true }
      )
    );
    
    return Site;
    
  };
