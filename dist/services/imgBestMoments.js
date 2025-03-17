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
Object.defineProperty(exports, "__esModule", { value: true });
exports.imgBestMoments = void 0;
const admin_js_1 = require("../util/admin.js");
const storage_1 = require("firebase-admin/storage");
const { BUCKET_VIDEO } = process.env;
const imgBestMoments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const imgFiles = yield admin_js_1.adminStorage
        .bucket(BUCKET_VIDEO)
        .getFiles({ prefix: 'img/', autoPaginate: false })
        .then(([files]) => files);
    const imgFilesPNG = imgFiles.filter((file) => file.metadata.contentType === 'image/png');
    const imgUrls = yield Promise.all(imgFilesPNG.map((file) => __awaiter(void 0, void 0, void 0, function* () {
        return {
            url: yield (0, storage_1.getDownloadURL)(file),
            name: file.name,
        };
    })));
    return res.status(200).json(imgUrls);
});
exports.imgBestMoments = imgBestMoments;
