/**
 * CouponController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

//const Coupon = require("../models/Coupon");

module.exports = {
    // action - create
    create: async function (req, res) {
        if (req.method == "GET") return res.view('coupon/create');
        var coupon = await Coupon.create(req.body).fetch();
        return res.status(201).redirect('/coupon/read/' + coupon.id);
    },
    // json function
    json: async function (req, res) {

        var everyones = await Coupon.find();

        return res.json(everyones);
    },
    // action - list
    list: async function (req, res) {

        var everyones = await Coupon.find();

        return res.view('coupon/list', { coupons: everyones });
    },
    // action - index
    index: async function (req, res) {

        var everyones = await Coupon.find();

        return res.view('coupon/index', { coupons: everyones });
    },
    // action - read
    read: async function (req, res) {

        var thatCoupon = await Coupon.findOne(req.params.id);

        if (!thatCoupon) return res.notFound();

        if (req.wantsJSON) {
            return res.json(thatCoupon);	    // for ajax request
        } else {
            return res.view('coupon/read', { coupon: thatCoupon });			// for normal request
        }

    },
    // action - delete 
    delete: async function (req, res) {

        var deletedCoupon = await Coupon.destroyOne(req.params.id);

        if (!deletedCoupon) return res.notFound();

        if (req.wantsJSON) {
            return res.status(204).json();	    // for ajax request
        } else {
            return res.redirect('/');			// for normal request
        }
        //return res.ok();
    },
    // action - update
    update: async function (req, res) {

        if (req.method == "GET") {

            var thatCoupon = await Coupon.findOne(req.params.id);

            if (!thatCoupon) return res.notFound();

            return res.view('coupon/update', { coupon: thatCoupon });

        } else {

            var updatedCoupon = await Coupon.updateOne(req.params.id).set(req.body);

            if (!updatedCoupon) return res.notFound();

            return res.redirect('/coupon/read/' + updatedCoupon.id);
        }
    },
    // search function
    search: async function (req, res) {

        var whereClause = {};

        if (req.query.region) whereClause.region = { contains: req.query.region };

        var parsedMaxCoins = parseInt(req.query.maxCoins);
        var parsedMinCoins = parseInt(req.query.minCoins);
        if ((!isNaN(parsedMaxCoins)) && (!isNaN(parsedMinCoins))) {
            whereClause.coins = { '<=': parsedMaxCoins, '>=': parsedMinCoins };
        } else if ((!isNaN(parsedMaxCoins)) && (isNaN(parsedMinCoins))) {
            whereClause.coins = { '<=': parsedMaxCoins };
        } else if ((isNaN(parsedMaxCoins)) && (!isNaN(parsedMinCoins))) {
            whereClause.coins = { '>=': parsedMinCoins };
        }

        var parsedValidDate = req.query.validOn;
        if (parsedValidDate) whereClause.expiryDate = { '<=': parsedValidDate };

        if (req.wantsJSON) {
            var limit = Math.max(req.query.limit, 2) || 2;
            var offset = Math.max(req.query.offset, 0) || 0;
            var thoseCoupons = await Coupon.find({
                limit: limit,
                skip: offset,
                where: whereClause,
                sort: 'region'
            });

            return res.json(thoseCoupons);
        } else {
            var count = await Coupon.count({
                where: whereClause,
            });
            return res.view('coupon/search', { coupons: thoseCoupons, numOfRecords: count });
        }
    },

    // action - paginate
    paginate: async function (req, res) {

        var limit = Math.max(req.query.limit, 2) || 2;
        var offset = Math.max(req.query.offset, 0) || 0;

        var someCoupons = await Coupon.find({
            limit: limit,
            skip: offset
        });

        var count = await Coupon.count();

        return res.view('coupon/paginate', { coupons: someCoupons, numOfRecords: count });
    },
    // action - populate
    populate: async function (req, res) {

        var coupon = await Coupon.findOne(req.params.id).populate("belong");

        if (!coupon) return res.notFound();

        return res.json(coupon);
    },
};

