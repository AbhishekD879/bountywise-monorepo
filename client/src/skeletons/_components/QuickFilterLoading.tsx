// import { Skeleton } from '../skeletonTemplate/Skeleton'
import React from 'react'
import './../skeletonTemplate/skeletonStyle.css'


export default function QuickFilterLoading() {
  return (
    <>
      <div className='p-4 animate-pulse flex flex-col'>
        <div className='inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-5 px-4 py-2 mb-2 max-w-1/5 justify-start bg-zinc-500'></div>
        <div className='inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-5 px-4 py-2 mb-2 max-w-2/12 justify-start bg-zinc-500'></div>
        <div className='inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-5 px-4 py-2 mb-2 max-w-2/4 justify-start bg-zinc-500'></div>
        <div className='inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-5 px-4 py-2 mb-2 max-w-2/5 justify-start bg-zinc-500'></div>
        <div className='inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-5 px-4 py-2 mb-2 max-w-full justify-start bg-zinc-500'></div>
      </div>
    </>
  )
}
