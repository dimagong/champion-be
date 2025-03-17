"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminStorage = exports.adminDB = exports.admin = void 0;
//import { createRequire } from 'module'
const firebase_admin_1 = __importDefault(require("firebase-admin"));
exports.admin = firebase_admin_1.default;
const config_1 = __importDefault(require("../config"));
//const require = createRequire(import.meta.url);
//var serviceAccount = require("./../champion-db-b530d-firebase-adminsdk-7lyvu-9a4bdd139c.json")
// const { serviceAccount } = require("./../config")
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(config_1.default.serviceAccount),
});
const adminDB = firebase_admin_1.default.firestore();
exports.adminDB = adminDB;
const adminStorage = firebase_admin_1.default.storage();
exports.adminStorage = adminStorage;
