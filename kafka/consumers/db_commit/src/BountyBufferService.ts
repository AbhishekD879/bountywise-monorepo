// import { BaseBufferService } from "./BaseBufferService.js";
import {BaseBufferService} from "@bountywise/basebuffer"

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

        // db.insert(bountyTable).values(bounties)
    }
}