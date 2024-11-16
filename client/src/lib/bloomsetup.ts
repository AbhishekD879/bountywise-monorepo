import { ScalableBloomFilter as BloomFilter } from 'bloom-filters';
import crypto from 'crypto';
import db from "@/lib/tembo.db"; // Drizzle database instance
import {bloomFilterStateTable, userTable} from "@/schema";
import {eq} from "drizzle-orm"; // Import the schema definition

class BloomUserFilterSingleton {
    private static instance: BloomUserFilterSingleton;
    private bloomFilter: BloomFilter;
    private BLOOM_USER_FILTER = 'bloom_user_filter';

    private constructor(size = 1000) {
        this.bloomFilter = new BloomFilter(size);

        // Load existing state from the database
        this.loadState().then((loaded) => {
            if (!loaded) {
                console.log('Initializing Bloom filter with default state...');
                db.select().from(userTable).then((users) => {
                    users.forEach((user) => {
                        this.addCombination(user.email);
                    });
                    // Save the initialized state back to the database
                    this.saveState();
                });
            }
        });
    }

    public static getInstance(size = 1000): BloomUserFilterSingleton {
        if (!BloomUserFilterSingleton.instance) {
            BloomUserFilterSingleton.instance = new BloomUserFilterSingleton(size);
        }
        return BloomUserFilterSingleton.instance;
    }

    private hashCombination(email: string): string {
        return crypto.createHash('sha256').update(email).digest('hex');
    }

    public addCombination(email: string): void {
        const hashedCombination = this.hashCombination(email);
        this.bloomFilter.add(hashedCombination);
        this.saveState(); // Save updated state
    }

    public isCombinationInFilter(email: string): boolean {
        const hashedCombination = this.hashCombination(email);
        return this.bloomFilter.has(hashedCombination);
    }

    // Save Bloom filter state to the database using Drizzle
    private async saveState(): Promise<void> {
        const serializedState = JSON.stringify(this.bloomFilter.saveAsJSON());
        try {
            const existingRecord = await db
                .select()
                .from(bloomFilterStateTable)
                .where(eq(bloomFilterStateTable.name, this.BLOOM_USER_FILTER))
                .limit(1);

            if (existingRecord.length > 0) {
                // Update existing record
                await db
                    .update(bloomFilterStateTable)
                    .set({ state: serializedState, updatedAt: new Date() })
                    .where(eq(bloomFilterStateTable.name, this.BLOOM_USER_FILTER));
            } else {
                // Insert new record
                await db.insert(bloomFilterStateTable).values({
                    id: crypto.randomUUID(),
                    name: this.BLOOM_USER_FILTER,
                    state: serializedState,
                    updatedAt: new Date(),
                });
            }
            console.log('Bloom filter state saved to the database.');
        } catch (error) {
            console.error('Failed to save Bloom filter state to the database:', error);
        }
    }

    // Load Bloom filter state from the database using Drizzle
    private async loadState(): Promise<boolean> {
        try {
            const record = await db
                .select()
                .from(bloomFilterStateTable)
                .where(eq(bloomFilterStateTable.name, this.BLOOM_USER_FILTER))
                .limit(1);

            if (record.length > 0 && record[0].state) {
                const deserializedState = JSON.parse(record[0].state);
                this.bloomFilter = BloomFilter.fromJSON(deserializedState);
                console.log('Bloom filter state loaded from the database.');
                return true;
            }
        } catch (error) {
            console.error('Failed to load Bloom filter state from the database:', error);
        }
        return false; // State not found
    }
}

export default BloomUserFilterSingleton;
