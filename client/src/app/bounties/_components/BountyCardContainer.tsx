import db from '@/lib/tembo.db'
import BountyCard from './BountyCard'
import BountyPagination from './BountyPagination'
import React from 'react'
import { bountyTable } from '@/schema'
import type {InferSelectModel} from "drizzle-orm"
import {unstable_noStore as noStore} from "next/cache"
const fetchBounties = async () => {
  noStore()
  const bounties = await db.select().from(bountyTable)
  return bounties
}

type BountyType = InferSelectModel<typeof bountyTable>

export default async function BountyCardContainer() {
  // Fetch bounties data here and pass it to the BountyCard component as props
  const bounties = await fetchBounties()
  return (
    <>
      <div className='space-y-4'>
        {bounties.map((bounty:BountyType) => (
          <BountyCard key={bounty.id} {...bounty} />
        ))}
      </div>
      <BountyPagination />
    </>
  )
}
