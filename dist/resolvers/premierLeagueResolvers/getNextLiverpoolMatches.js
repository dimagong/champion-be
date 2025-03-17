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
exports.getNextLiverpoolMatches = void 0;
const getNextLiverpoolMatches = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const url = 'https://footballapi.pulselive.com/football/fixtures?comps=1&teams=10&statuses=U,L&pageSize=5&startDate=2025-03-17&page=0&altIds=true&sort=ASCENDING';
    try {
        const response = yield fetch(url);
        const data = yield response.json();
        return res.status(200).json(data);
    }
    catch (error) {
        next(error);
    }
});
exports.getNextLiverpoolMatches = getNextLiverpoolMatches;
