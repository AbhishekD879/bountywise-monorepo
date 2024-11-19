import {initDb} from "@bountywise/dbservice"

export const db = initDb(process.env.DB_URL!)