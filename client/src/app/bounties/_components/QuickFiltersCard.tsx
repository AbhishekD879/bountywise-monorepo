import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import withServerSkeleton from '@/lib/hoc/withServerSkeleton'
import db from '@/lib/tembo.db'
import { quickFiltersTable } from '@/schema'
import Link from 'next/link'

const fetchQuickFilters = async () => {
  const data = db
    .select({
      name: quickFiltersTable.name,
      id: quickFiltersTable.id
    })
    .from(quickFiltersTable)
  return data
}

interface Params {
  [key: string]: string | string[] | undefined
}

const buildQueryString = (params: Params): string => {
  const queryParts: string[] = []

  for (const key in params) {
    if (key === 'quickFilter') continue // Skip 'quickFilter'
    const value = params[key]
    if (value) {
      const encodedValue = Array.isArray(value) ? value.join(',') : value
      queryParts.push(`${key}=${encodeURIComponent(encodedValue)}`)
    }
  }

  return queryParts.length > 0 ? `?${queryParts.join('&')}&` : '?'
}

const QuickFilterCardContent = async ({ params }: { params: Params }) => {
  const quickFilters = await fetchQuickFilters()

  return (
    <CardContent className='p-4'>
      <div className='flex flex-wrap gap-1'>
        {quickFilters.map(({ name, id }) => (
          <QuickFilterBadge key={id} name={name} id={id} params={params} />
        ))}
      </div>
    </CardContent>
  )
}


const QuickFilterBadge = ({ params, name, id }: { name: string; id: string; params: Params }) => {
  const filterAlreadyApplied = params['quickFilter'] === id
  if (filterAlreadyApplied) {
    delete params['quickFilter']
  }
  const queryString = buildQueryString(params).endsWith('&')
    ? buildQueryString(params).slice(0, -1)
    : buildQueryString(params)
  const href = filterAlreadyApplied ? `/bounties${queryString}` : `/bounties${queryString}&quickFilter=${id}`

  return (
    <Link scroll={false} href={href}>
      <Badge
        variant='outline'
        className={`mb-2 mx-1 justify-start last:mb-0 border border-input ${filterAlreadyApplied ? '!bg-[#ff5722] text-white' : 'bg-white text-[#303841] hover:bg-[#ff57221a] hover:text-[#ff5722]'}`}
      >
        {name}
      </Badge>
    </Link>
  )
}

const QuickFilterCardContentWithSkeleton = withServerSkeleton(QuickFilterCardContent, 'QuickFilterLoading.tsx')

export default function QuickFiltersCard({ params }: { params: { [key: string]: string | string[] | undefined } }) {
  return (
    <Card className='border-[#d4d4d4] bg-white'>
      <CardHeader className='pb-1'>
        <CardTitle className='text-lg py-0 font-bold text-[#303841]'>Quick Filters</CardTitle>
      </CardHeader>
      <QuickFilterCardContentWithSkeleton params={params} />
    </Card>
  )
}
