const subscriptionsModel = require('../models/subscriptionsModel');

const getAllSubscriptions = function() {
    return new Promise((resolve, reject) => {
        subscriptionsModel.find({}, function(err, sub) {
            if (err) {
                reject(err);
            } else {
                resolve(sub);
            }
        })
    })
}

const getSubscription = function(id) {
    return new Promise((resolve, reject) => {

        subscriptionsModel.findById(id, function(err, sub) {
            if (sub) {
                reject(err);
            } else {
                resolve(sub);
            }
        })
    })
}


const addSubscribe = function(subscribe) {
    return new Promise((resolve, reject) => {
        const p = new subscriptionsModel({
            MemberID: subscribe.MemberID,
            Movies: subscribe.Movies
        });
        p.save(function(err) {
            if (err) {
                reject(err);
            } else {
                console.log('The subscription was successfully registered');
                resolve('The subscription was successfully registered');
            }
        })
    })
}

const updateSubscribe = function(id, subscribe) {
    return new Promise((resolve, reject) => {
        subscriptionsModel.findByIdAndUpdate(id, {
            MemberID: subscribe.MemberID,
            Movies: subscribe.Movies
        }, function(err) {
            if (err) {
                reject(err);
            } else {
                console.log("is updated!!!!");
                resolve('Subscription is Updated');
            }
        })
    })
}

const deleteSubscribe = function(id) {
    return new Promise((resolve, reject) => {
        subscriptionsModel.findByIdAndDelete(id, function(err) {
            if (err) {
                reject(err);
            } else {
                resolve('Subscription is Deleted');
            }
        })
    })
}





module.exports = { getAllSubscriptions, getSubscription, addSubscribe, updateSubscribe, deleteSubscribe: deleteSubscribe };