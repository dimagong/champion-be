"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = exports.db = void 0;
// Import the functions you need from the SDKs you need
const app_1 = require("firebase/app");
const config_js_1 = __importDefault(require("../config.js"));
const firestore_1 = require("firebase/firestore");
const storage_1 = require("firebase/storage");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Initialize Firebase
const firebase = (0, app_1.initializeApp)(config_js_1.default.firebaseConfig); //initialize firebase app
//const analytics = getAnalytics(firebase)
exports.db = (0, firestore_1.getFirestore)(firebase);
exports.storage = (0, storage_1.getStorage)(firebase);
