import Services from './_components/Services'
import Hero from './_components/Hero'

export default function Home() {
  return (
    <main className='flex flex-col items-center space-y-8 p-6 max-w-7xl mx-auto'>
      <Hero />
      <Services />
    </main>
  )
}
