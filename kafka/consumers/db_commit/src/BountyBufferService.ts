import { BaseBufferService } from "./BaseBufferService.js";
import db from "./db.js";
import { bountyTable } from "./schema.js";

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
        super('bounty_buffer', 3, 5 * 60 * 1000);
    }

    // Implement bulkInsert for bounties
    async bulkInsert(bounties:Bounty[]) {
        console.log(`Inserting ${bounties.length} bounties into the database...`);
        // Add your DB insertion logic here
        // For example: await db.insertMany(bounties);

        // db.insert(bountyTable).values(bounties)
    }
}