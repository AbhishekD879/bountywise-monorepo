// utils/advancedRecommendationSystem.js
// @ts-nocheck
// Sample user interaction events
const InteractionType = {
    VIEW: 'view',
    CLICK: 'click',
    TIME_SPENT: 'timeSpent',
    APPLY: 'apply',
    SAVE: 'save',
    SHARE: 'share'
};

// Weight configurations for different factors
const WEIGHTS = {
    tagSimilarity: 0.3,
    categoryMatch: 0.2,
    rewardRange: 0.1,
    popularity: 0.15,
    recency: 0.15,
    userInteraction: 0.1
};

// Sample user profile structure
class UserProfile {
    constructor(userId) {
        this.userId = userId;
        this.tagPreferences = new Map(); // Tags and their weights
        this.categoryPreferences = new Map();
        this.rewardRangePreference = {
            min: 0,
            max: Infinity,
            average: 0
        };
        this.interactionHistory = [];
        this.lastActive = Date.now();
    }

    updateFromInteraction(bounty, interactionType, value = 1) {
        // Update tag preferences
        bounty.tags.forEach(tag => {
            const currentWeight = this.tagPreferences.get(tag) || 0;
            this.tagPreferences.set(tag, currentWeight + value);
        });

        // Update category preferences
        if (bounty.category) {
            const currentWeight = this.categoryPreferences.get(bounty.category) || 0;
            this.categoryPreferences.set(bounty.category, currentWeight + value);
        }

        // Update reward range preference
        const { reward } = bounty;
        this.rewardRangePreference.min = Math.min(this.rewardRangePreference.min, reward);
        this.rewardRangePreference.max = Math.max(this.rewardRangePreference.max, reward);
        this.rewardRangePreference.average = (this.rewardRangePreference.min + this.rewardRangePreference.max) / 2;

        // Record interaction
        this.interactionHistory.push({
            bountyId: bounty.id,
            timestamp: Date.now(),
            type: interactionType,
            value
        });
    }
}

// Enhanced bounty data structure
class BountyManager {
    constructor() {
        this.bounties = new Map();
        this.userProfiles = new Map();
        this.globalMetrics = {
            tagPopularity: new Map(),
            categoryPopularity: new Map(),
            averageReward: 0,
            bountyViews: new Map(),
            bountyApplications: new Map()
        };
    }

    addBounty(bounty) {
        this.bounties.set(bounty.id, {
            ...bounty,
            created: Date.now(),
            metrics: {
                views: 0,
                applications: 0,
                saves: 0,
                shares: 0,
                averageTimeSpent: 0
            }
        });
        this.updateGlobalMetrics(bounty);
    }

    updateGlobalMetrics(bounty) {
        // Update tag popularity
        bounty.tags.forEach(tag => {
            const current = this.globalMetrics.tagPopularity.get(tag) || 0;
            this.globalMetrics.tagPopularity.set(tag, current + 1);
        });

        // Update category popularity
        if (bounty.category) {
            const current = this.globalMetrics.categoryPopularity.get(bounty.category) || 0;
            this.globalMetrics.categoryPopularity.set(bounty.category, current + 1);
        }

        // Update average reward
        const allRewards = Array.from(this.bounties.values()).map(b => b.reward);
        this.globalMetrics.averageReward = allRewards.reduce((a, b) => a + b, 0) / allRewards.length;
    }

    recordInteraction(userId, bountyId, interactionType, value = 1) {
        let userProfile = this.userProfiles.get(userId);
        if (!userProfile) {
            userProfile = new UserProfile(userId);
            this.userProfiles.set(userId, userProfile);
        }

        const bounty = this.bounties.get(bountyId);
        if (bounty) {
            userProfile.updateFromInteraction(bounty, interactionType, value);

            // Update bounty metrics
            const metrics = bounty.metrics;
            switch (interactionType) {
                case InteractionType.VIEW:
                    metrics.views++;
                    this.globalMetrics.bountyViews.set(bountyId, metrics.views);
                    break;
                case InteractionType.APPLY:
                    metrics.applications++;
                    this.globalMetrics.bountyApplications.set(bountyId, metrics.applications);
                    break;
                // Add other interaction types as needed
            }
        }
    }

    calculateSimilarityScore(bounty1, bounty2) {
        let score = 0;

        // Tag similarity (Jaccard similarity)
        const tags1 = new Set(bounty1.tags);
        const tags2 = new Set(bounty2.tags);
        const tagIntersection = new Set([...tags1].filter(tag => tags2.has(tag)));
        const tagUnion = new Set([...tags1, ...tags2]);
        score += (tagIntersection.size / tagUnion.size) * WEIGHTS.tagSimilarity;

        // Category match
        if (bounty1.category && bounty2.category) {
            score += (bounty1.category === bounty2.category ? 1 : 0) * WEIGHTS.categoryMatch;
        }

        // Reward range similarity
        const rewardDiff = Math.abs(bounty1.reward - bounty2.reward);
        const maxRewardDiff = this.globalMetrics.averageReward * 2;
        score += (1 - (rewardDiff / maxRewardDiff)) * WEIGHTS.rewardRange;

        // Popularity score
        const popularity1 = (this.globalMetrics.bountyViews.get(bounty1.id) || 0) +
            (this.globalMetrics.bountyApplications.get(bounty1.id) || 0);
        const popularity2 = (this.globalMetrics.bountyViews.get(bounty2.id) || 0) +
            (this.globalMetrics.bountyApplications.get(bounty2.id) || 0);
        const popularityScore = Math.min(popularity1, popularity2) / Math.max(popularity1, popularity2) || 0;
        score += popularityScore * WEIGHTS.popularity;

        // Recency score
        const timeDiff = Math.abs(bounty1.created - bounty2.created);
        const maxTimeDiff = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds
        score += (1 - (timeDiff / maxTimeDiff)) * WEIGHTS.recency;

        return score;
    }

    getPersonalizedRecommendations(userId, currentBountyId = null, limit = 10) {
        const userProfile = this.userProfiles.get(userId) || new UserProfile(userId);
        const currentBounty = currentBountyId ? this.bounties.get(currentBountyId) : null;

        // Get all bounties except current one
        const candidates = Array.from(this.bounties.values())
            .filter(bounty => bounty.id !== currentBountyId);

        // Calculate scores for each candidate
        const scoredCandidates = candidates.map(candidate => {
            let score = 0;

            // Content-based similarity
            if (currentBounty) {
                score += this.calculateSimilarityScore(currentBounty, candidate);
            }

            // User preference matching
            const userTagScore = candidate.tags.reduce((sum, tag) => {
                return sum + (userProfile.tagPreferences.get(tag) || 0);
            }, 0) / candidate.tags.length;

            score += userTagScore * WEIGHTS.userInteraction;

            return {
                ...candidate,
                score
            };
        });

        // Sort by score and return top recommendations
        return scoredCandidates
            .sort((a, b) => b.score - a.score)
            .slice(0, limit);
    }

    getHomePageRecommendations(userId, limit = 20) {
        const recommendations = [];
        const userProfile = this.userProfiles.get(userId);

        // Mix of different recommendation strategies
        if (userProfile) {
            // Personalized recommendations based on user history
            recommendations.push(...this.getPersonalizedRecommendations(userId, null, limit * 0.4));

            // Trending bounties (high engagement in last 24h)
            const trending = Array.from(this.bounties.values())
                .filter(bounty => {
                    const dayOld = Date.now() - (24 * 60 * 60 * 1000);
                    return bounty.created > dayOld;
                })
                .sort((a, b) => b.metrics.views + b.metrics.applications - (a.metrics.views + a.metrics.applications))
                .slice(0, limit * 0.3);
            recommendations.push(...trending);
        }

        // New bounties
        const newBounties = Array.from(this.bounties.values())
            .sort((a, b) => b.created - a.created)
            .slice(0, limit * 0.3);
        recommendations.push(...newBounties);

        // Remove duplicates and return limited results
        return [...new Map(recommendations.map(item => [item.id, item])).values()]
            .slice(0, limit);
    }
}

export { BountyManager, UserProfile, InteractionType };