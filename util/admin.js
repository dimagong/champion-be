import { createRequire } from "module"
import admin from "firebase-admin"
import config from "./../config.js"

const require = createRequire(import.meta.url)

//var serviceAccount = require("./../champion-db-b530d-firebase-adminsdk-7lyvu-9a4bdd139c.json")
// const { serviceAccount } = require("./../config")

admin.initializeApp({
	credential: admin.credential.cert({ ...config.serviceAccount }),
})

const adminDB = admin.firestore()
export { admin, adminDB }
