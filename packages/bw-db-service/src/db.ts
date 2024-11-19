import * as schema from './schema';
import { drizzle } from 'drizzle-orm/neon-serverless';

const init = async (dbUrl:string) => {
    if(!dbUrl) throw new Error('DB_URL not found');
    return drizzle(dbUrl, { schema: schema });
}

export default init;
