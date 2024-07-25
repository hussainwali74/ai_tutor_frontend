const { MONGO_ATLAS_USERNAME, MONGO_ATLAS_PASSWORD, MONGO_ATLAS_DB } = process.env

export const mongo_atlas_connection_str = "mongodb+srv://" + MONGO_ATLAS_USERNAME + ":" + MONGO_ATLAS_PASSWORD + "@cluster0.wegcqoh.mongodb.net/" + MONGO_ATLAS_DB + "?retryWrites=true&w=majority"

