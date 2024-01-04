import dotenv from "dotenv"
import assert from "assert"

dotenv.config()

const {
	PORT,
	HOST,
	HOST_URL,
	API_KEY,
	AUTH_DOMAIN,
	PROJECT_ID,
	STORAGE_BUCKET,
	MESSAGING_SENDER_ID,
	APP_ID,
	MEASUREMENT_ID,
	TYPE,
	PRIVATE_KEY_ID,
	PRIVATE_KEY,
	CLIENT_EMAIL,
	CLIENT_ID,
	AUTH_URL,
	TOKEN_URI,
	AUTH_PROVIDER_X509_CERT_URL,
	CLIENT_X509_CERT_URL,
	UNIVERSE_DOMAIN,
} = process.env

assert(PORT, "Port is required")
assert(HOST, "Host is required")

export default {
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
}
