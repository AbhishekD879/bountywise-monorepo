import { Card } from '@/components/ui/card'
import CONSTANT, { Service } from '@/constants'
import { ContactIcon, CheckIcon, ConciergeBellIcon } from 'lucide-react'

export default function Services() {
  return (
    <div className='m-auto mt-12 grid gap-8 md:grid-cols-3'>
      {CONSTANT.SERVICES.map((service) => {
        return <ServiceCard key={service.title} {...service} />
      })}
    </div>
  )
}

const ServiceCard = ({ icon: Icon, title, desc }: Service) => (
  <Card className='bg-white p-6 text-center shadow-md'>
    <Icon className='mx-auto h-12 w-12 text-accentOrange' />
    <h3 className='mt-4 text-xl font-semibold'>{title}</h3>
    <p className='mt-2 text-blueGray'>{desc}</p>
  </Card>
)
