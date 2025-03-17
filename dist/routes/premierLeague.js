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
exports.routerPremierLeague = void 0;
const express_1 = __importDefault(require("express"));
const getPremierLeagueCompetitions_js_1 = require("../resolvers/premierLeagueResolvers/getPremierLeagueCompetitions.js");
const getPremierLeagueResults_js_1 = require("../resolvers/premierLeagueResolvers/getPremierLeagueResults.js");
exports.routerPremierLeague = express_1.default.Router();
const timeLog = (req, res, next) => {
    console.log('Time routerPremierLeague: ', Date.now());
    next();
};
exports.routerPremierLeague.use(timeLog);
exports.routerPremierLeague.get('/competitions', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, getPremierLeagueCompetitions_js_1.getPremierLeagueCompetitions)(req, res, next);
}));
exports.routerPremierLeague.get('/results', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, getPremierLeagueResults_js_1.getPremierLeagueResults)(req, res, next);
}));
