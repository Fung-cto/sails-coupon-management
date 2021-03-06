/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    login: async function (req, res) {

        if (req.method == "GET") return res.view('user/login');

        if (!req.body.username || !req.body.password) return res.badRequest();

        var user = await User.findOne({ username: req.body.username });

        if (!user) return res.status(401).json("User not found");

        var match = await sails.bcrypt.compare(req.body.password, user.password);

        if (!match) return res.status(401).json("Wrong Password");

        // Reuse existing session 
        if (!req.session.username) {
            req.session.username = user.username;
            req.session.userId = user.id;
            req.session.role = user.role;
            req.session.coins = user.coins;
            return res.json(user);
        }

        // Start a new session for the new login user
        req.session.regenerate(function (err) {

            if (err) return res.serverError(err);

            req.session.username = user.username;
            req.session.userId = user.id;
            req.session.role = user.role;
            req.session.coins = user.coins;
            return res.json(user);
        });
    },

    logout: async function (req, res) {

        req.session.destroy(function (err) {

            if (err) return res.serverError(err);

            if (req.wantsJSON) {
                return res.status(200).send();	    // for ajax request
            } else {
                return res.redirect('/');			// for normal request
            }

        });
    },

    populate: async function (req, res) {

        var thatUser = await User.findOne(req.session.userId).populate("owners");

        if (!thatUser) return res.notFound();

        //if (thatUser.id != session.userId) return res.forbidden();

        if (req.wantsJSON) {
            return res.status(200).json(thatUser);	    // for ajax request
        } else {
            return res.view('user/redeem', { user: thatUser });			// for normal request
        }

        //return res.view('user/redeem', { user:thatUser });
        //return res.json(user);
    },

    check: async function (req, res) {

        if (!await User.findOne(req.params.id)) return res.status(404).json("User not found.");

        var thatCoupon = await Coupon.findOne(req.params.fk).populate("belong", { id: req.params.id });

        //if (!thatCoupon) return res.status(404).json("Coupon not found.");

        if (thatCoupon.belong.length > 0)
            return res.status(409);   // conflict

        //await User.addToCollection(req.params.id, "owners").members(req.params.fk);

        return res.ok();
    },

    add: async function (req, res) {

        if (!await User.findOne(req.session.userId)) return res.status(404).json("User not found.");

        var thatCoupon = await Coupon.findOne(req.params.fk).populate("belong", { id: req.session.userId });

        if (!thatCoupon) return res.status(404).json("Coupon not found.");

        if (thatCoupon.belong.length > 0)
            return res.status(409).json("Already added.");   // conflict

        var coupon = await Coupon.findOne(req.params.fk);
        var user = await User.findOne(req.session.userId);

        if (user.coins >= coupon.coins) {
            if (coupon.quota > 0) {
                await User.addToCollection(req.session.userId, "owners").members(req.params.fk);
                var coinsUpdate = {
                    coins: user.coins - coupon.coins
                }
                var quotaUpdate = {
                    quota: coupon.quota - 1
                }
                var updatedUser = await User.updateOne(user.id).set(coinsUpdate);
                var updateCoupon = await Coupon.updateOne(coupon.id).set(quotaUpdate);
                if (req.wantsJSON) {
                    return res.ok();	    // for ajax request
                } else {
                    return res.redirect('user/' + user.id + '/owners');			// for normal request
                }
            } else {
                return res.status().json("No quota remain");
            }
        } else {
            return res.status().json("Not enough coins");
        }
    },

    remove: async function (req, res) {

        if (!await User.findOne(req.params.id)) return res.status(404).json("User not found.");

        var thatCoupon = await Coupon.findOne(req.params.fk).populate("belong", { id: req.params.id });

        if (!thatCoupon) return res.status(404).json("Coupon not found.");

        if (thatCoupon.belong.length == 0)
            return res.status(409).json("Nothing to delete.");    // conflict

        await User.removeFromCollection(req.params.id, "owners").members(req.params.fk);

        return res.ok();
    },
};

