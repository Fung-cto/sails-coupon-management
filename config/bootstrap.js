/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function () {

  // By convention, this is a good place to set up fake data during development.
  //
  // For example:
  // ```
  // // Set up fake development data (or if we already have some, avast)
  // if (await User.count() > 0) {
  //   return;
  // }
  //
  // await User.createEach([
  //   { emailAddress: 'ry@example.com', fullName: 'Ryan Dahl', },
  //   { emailAddress: 'rachael@example.com', fullName: 'Rachael Shaw', },
  //   // etc.
  // ]);
  // ```

  if (await Coupon.count() > 0) {
    return;
  }

  await Coupon.createEach([
    {
      title: "50% discount on Supreme Seafood Feast (for 2 persons)",
      restaurant: "Mango Tree",
      region: "Kowloon",
      mall: "Festival Walk",
      image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
      quota: 10,
      coins: 750,
      expiryDate: "2030-02-20",
      detail: ""
    },
    {
      title: "Simply receive a complimentary drink",
      restaurant: "Greyhound Cafe",
      region: "New Territories",
      mall: "Tsuen Wan Plaza",
      image: "https://images.unsplash.com/photo-1525610553991-2bede1a236e2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
      quota: 12,
      coins: 451,
      expiryDate: "2020-10-19",
      detail: ""
    },
    {
      title: "50% Off Yoogane's Chicken Galbi",
      restaurant: "Yoogane",
      region: "HK Island",
      mall: "Pacific Place",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1934&q=80",
      quota: 5,
      coins: 10000,
      expiryDate: "2020-10-30",
      detail: "detail is detail"
    },
    {
      title: "15% Off on Whole Bill",
      restaurant: "ANA Gura",
      region: "Kowloon",
      mall: "Elements",
      image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
      quota: 12,
      coins: 750,
      expiryDate: "2020-10-30",
      detail: "come and have a good meal"
    },
    {
      title: "70% off on Whole Bill",
      restaurant: "not that good restaurant",
      region: "New Territories",
      mall: "New Town Plaza",
      image: "https://images.unsplash.com/photo-1585518419759-7fe2e0fbf8a6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=624&q=80",
      quota: 50,
      coins: 1200,
      expiryDate: "2030-02-20",
      detail: "70% off on Whole Bill, Whole Bill!!!"
    },
    {
      title: "kowloon 20% off",
      restaurant: "kowloonoooon rest",
      region: "Kowloon",
      mall: "APM",
      image: "https://images.unsplash.com/photo-1531973968078-9bb02785f13d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=977&q=80",
      quota: 15,
      coins: 300,
      expiryDate: "2020-10-19",
      detail: "kowloon detail"
    }
    // etc.
  ]);

};
