import Link from 'next/link'
import SearchBountites from './_components/SearchBountites'
import BountyCardContainer from './_components/BountyCardContainer'
import PostBountySignPosting from './_components/PostBountySignPosting'
import FeaturedBountiesCard from './_components/FeaturedBountiesCard'
import QuickFiltersCard from './_components/QuickFiltersCard'
import {unstable_noStore as noStore} from "next/cache"

export default function page({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  console.log("pageSearch",searchParams)
  noStore()
  return (
    <div className='min-h-screen bg-[#f8f9fa] p-4 lg:p-8'>
      <div className='mx-auto max-w-7xl'>
        <nav className='mb-4 text-sm text-[#46515e]'>
          <Link href='/' className='hover:underline'>
            Home
          </Link>{' '}
          &gt; <span className='font-semibold'>Bounties</span>
        </nav>
        <div className='grid gap-8 lg:grid-cols-3'>
          <div className='lg:col-span-2'>
            <h1 className='mb-6 text-3xl font-bold text-[#303841]'>Explore Bounties</h1>
            <SearchBountites />
            <BountyCardContainer />
          </div>

          <div className='space-y-4 lg:col-span-1'>
            <PostBountySignPosting />
            <QuickFiltersCard params={searchParams} />
            <FeaturedBountiesCard />
          </div>
        </div>
      </div>
    </div>
  )
}
