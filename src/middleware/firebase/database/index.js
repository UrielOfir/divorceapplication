import firebaseInstance from "@/middleware/firebase";
import database from 'firebase/database';

export default {
    listenUserData,
    getUserData,
    update,
    arrayConvertor,
    objectConvertor,
}

function listenUserData(options, callback) {
    return firebaseInstance.firebase.database()
        .ref(`users/${window.user.uid}/data/${options.entity}`)
        .on(`value`,
            res => {
                callback(res.val());
            })
}

function getUserData(options) {
    return firebaseInstance.firebase.database()
        .ref(`users/${window.user.uid}/data/${options.entity}`).once(`value`)
        .then(res => {
            return res.val();
        })
}

function update(options) {
    return firebaseInstance.firebase.database()
        .ref(`users/${window.user.uid}/data/${options.entity}`).set(options.details);
}

function arrayConvertor(array) {
    const tmpArr = JSON.parse(JSON.stringify(array))
    const object = {};
    for (let index in tmpArr) {
        object[index] = tmpArr[index];
    }
    return object;
}

function objectConvertor(object) {
    if (!object) {
        return []
    }
    const tmpObj = JSON.parse(JSON.stringify(object))
    const array = [];
    for (let index in tmpObj) {
        array[index] = tmpObj[index];
    }
    return array;
}
