"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("./config"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const articles_1 = require("./services/articles");
const createArticle_1 = require("./services/createArticle");
const updateArticle_1 = require("./services/updateArticle");
const deleteArticle_1 = require("./services/deleteArticle");
const videoBestMoments_1 = require("./services/videoBestMoments");
const imgBestMoments_1 = require("./services/imgBestMoments");
const paymentMethod_js_1 = require("./services/paymentMethod.js");
const premierLeague_1 = require("./routes/premierLeague");
const errorHandler_1 = require("./util/errorHandler");
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });
app.get('/articles', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, articles_1.articles)(req, res);
        next();
    }
    catch (err) {
        next(err);
    }
}));
app.post('/add', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, createArticle_1.createArticle)(req, res);
        next();
    }
    catch (err) {
        next(err);
    }
}));
app.put('/update/:id', (req, res, next) => {
    try {
        (0, updateArticle_1.updateArticle)(req, res);
    }
    catch (err) {
        next(err);
    }
});
app.delete('/delete/:id', (req, res, next) => {
    try {
        (0, deleteArticle_1.deleteArticle)(req, res);
    }
    catch (err) {
        next(err);
    }
});
app.get('/video', (req, res, next) => {
    try {
        (0, videoBestMoments_1.videoBestMoments)(req, res);
    }
    catch (err) {
        next(err);
    }
});
app.get('/img', (req, res, next) => {
    try {
        (0, imgBestMoments_1.imgBestMoments)(req, res);
    }
    catch (err) {
        next(err);
    }
});
app.post('/payment-sheet', (req, res, next) => {
    try {
        (0, paymentMethod_js_1.createPaymentSheet)(req, res);
    }
    catch (err) {
        next(err);
    }
});
app.get('/payment-public-permission', (req, res, next) => {
    try {
        (0, paymentMethod_js_1.getPublicKeyStripe)(req, res);
    }
    catch (err) {
        next(err);
    }
});
//=======
//====
//=
app.use('/premierLeague', premierLeague_1.routerPremierLeague);
app.use((err, req, res, next) => {
    (0, errorHandler_1.errorHandler)(req, res, next, err);
});
//=======
//====
//=
app.listen(config_1.default.port, () => console.log(`Server is live @ ${config_1.default.hostUrl}`));
