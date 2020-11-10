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

//const Coupon = require('../api/models/Coupon');
//const User = require('../api/models/User');

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

  sails.bcrypt = require('bcryptjs');
  var salt = await sails.bcrypt.genSalt(10);

  if (await Coupon.count() > 0) {
    return generateUsers();
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

  return generateUsers();

  async function generateUsers() {

    if (await User.count() > 0) {
      return;
    }

    var hash = await sails.bcrypt.hash('123456', salt);

    await User.createEach([
      { username: "admin", password: hash, role:"admin" },
      { username: "martin", password: hash, role:"member", coins:5000 },
      { username: "kenny", password: hash, role:"member", coins:10000 },
      { username: "joe", password: hash, role:"member", coins:20000 },
      // etc.
    ]);

    const mango = await Coupon.findOne({ restaurant: "Mango Tree" });
    const yoogane = await Coupon.findOne({ restaurant: "Yoogane" });
    //const admin = await User.findOne({ username: "admin" });
    const member = await User.findOne({ username: "Martin" });

    //await User.addToCollection(admin.id, 'owners').members(kenny.id);
    await User.addToCollection(member.id, 'owners').members([mango.id, yoogane.id]);

    /*await User.createEach([
      { username: "admin", password: '123456' },
      { username: "boss", password: '123456' },
      // etc.
    ]);*/
  }

};
