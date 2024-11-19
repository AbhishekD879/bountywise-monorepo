// import { BaseBufferService } from "./BaseBufferService.js";
import {BaseBufferService} from "@bountywise/basebuffer"
import {schema} from "@bountywise/dbservice"
import {db} from "./db.js"
type Bounty = {
    id: string;
    title:string,
    description:string,
    tags: string[],
    communicationMethod: 'video'|'audio'|'chat',
    budget?: number,
    currency: string|null,
    deadline?:Date|null,
}

export default class BountyService extends BaseBufferService<Bounty>{
    constructor() {
        // Set bounty-specific configurations (buffer key, threshold, flush interval)
        super({threshold:3, flushInterval:5 * 60 * 1000, bufferKey:'bounty_buffer'})
    }

    // Implement bulkInsert for bounties
    async bulkInsert(bounties:Bounty[]) {
        console.log(`Inserting ${bounties.length} bounties into the database...`);
        // Add your DB insertion logic here
        // For example: await db.insertMany(bounties);
        (await db).insert(schema.bountyTable).values(bounties)
        // await db.insert(bountyTable).values(bounties)
    }
}