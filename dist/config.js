"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const assert_1 = __importDefault(require("assert"));
dotenv_1.default.config();
const { PORT, HOST, HOST_URL, API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID, MEASUREMENT_ID, TYPE, PRIVATE_KEY_ID, PRIVATE_KEY, CLIENT_EMAIL, CLIENT_ID, AUTH_URL, TOKEN_URI, AUTH_PROVIDER_X509_CERT_URL, CLIENT_X509_CERT_URL, UNIVERSE_DOMAIN, PUBLIC_KEY_STRIPE, SECRET_KEY_STRIPE, } = process.env;
(0, assert_1.default)(PORT, "Port is required");
(0, assert_1.default)(HOST, "Host is required");
exports.default = {
    port: PORT,
    host: HOST,
    hostUrl: HOST_URL,
    serviceAccount: {
        type: TYPE,
        project_id: PROJECT_ID,
        private_key_id: PRIVATE_KEY_ID,
        private_key: process.env.PRIVATE_KEY.replace(/\\n/gm, "\n")
            ? Buffer.from(process.env.PRIVATE_KEY.replace(/\\n/gm, "\n")).toString()
            : undefined,
        client_email: CLIENT_EMAIL,
        client_id: CLIENT_ID,
        auth_uri: AUTH_URL,
        token_uri: TOKEN_URI,
        auth_provider_x509_cert_url: AUTH_PROVIDER_X509_CERT_URL,
        client_x509_cert_url: CLIENT_X509_CERT_URL,
        universe_domain: UNIVERSE_DOMAIN,
    },
    firebaseConfig: {
        apiKey: API_KEY,
        authDomain: AUTH_DOMAIN,
        projectId: PROJECT_ID,
        storageBucket: STORAGE_BUCKET,
        messagingSenderId: MESSAGING_SENDER_ID,
        appId: APP_ID,
        measurementId: MEASUREMENT_ID,
    },
    stripeConfig: {
        publicKeyStripe: PUBLIC_KEY_STRIPE,
        secretKeyStripe: SECRET_KEY_STRIPE,
    },
};
