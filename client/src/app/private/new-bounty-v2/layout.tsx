export default function NewBountyLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='h-[calc(100vh_-_76px)] overflow-y-scroll p-5'>
      <div className='mx-auto max-w-3xl rounded bg-white px-4 py-2'>
        <h2 className='text-center text-3xl font-bold text-[#46515e]'>Create New Bounty</h2>
        {children}
      </div>
    </div>
  )
}
