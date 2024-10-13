import { cn } from '@/lib/utils'
const shimmer =
  'before:absolute before:inset-0 before:tr before:-translate-x-full before:animate-[shimmer_2s_infinite]  before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent'

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('relative animate-pulse overflow-hidden rounded-md bg-zinc-500', className, shimmer)}
      {...props}
    />
  )
}

export { Skeleton }
