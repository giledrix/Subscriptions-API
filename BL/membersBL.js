const MemberModel = require('../models/membersModel');


const getAllMembers = function () {
    return new Promise((resolve, reject) => {
        MemberModel.find({}, function (err, pers) {
            if (err) {
                reject(err);
            }
            else {
                resolve(pers);
            }
        })
    })
}

const getMember = function (id) {
    return new Promise((resolve, reject) => {
        MemberModel.findById(id, function (err, per) {
            if (err) {
                reject(err);
            }
            else {
                resolve(per);
            }
        })
    })
}

const addMember = function (member) {
    return new Promise((resolve, reject) => {
        const p = new MemberModel({
            Name: member.Name,
            Email: member.Email,
            City: member.City
        });

        p.save(function (err) {
            if (err) {
                reject(err);
            }
            else {
                resolve('Member is Created');
            }
        })
    })
}

const updateMember = function (id, member) {
    return new Promise((resolve, reject) => {
        MemberModel.findByIdAndUpdate(id,
            {
                Name: member.Name,
                Email: member.Email,
                City: member.City
            }, function (err) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve('Member is Updated');
                }
            })
    })
}

const deleteMember = function (id) {
    return new Promise((resolve, reject) => {
        MemberModel.findByIdAndDelete(id, function (err) {
            if (err) {
                reject(err);
            }
            else {
                resolve('Member is Deleted');
            }
        })
    })
}

module.exports = { getAllMembers, getMember, addMember, updateMember, deleteMember }