export default function NewBountyLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex h-[calc(100%_-_76px)] items-center justify-center bg-gradient-to-br from-[#ff5722] to-[#ff9800] p-4'>
      <div className='flex h-[90%] w-full max-w-2xl transform flex-col justify-between rounded-lg bg-white p-8 shadow-2xl transition-all duration-500 ease-in-out overflow-y-auto'>
        <div className='mb-6 text-center'>
          <h2 className='text-3xl font-bold text-[#46515e]'>Create New Bounty</h2>
        </div>
        {children}
      </div>
    </div>
  )
}
