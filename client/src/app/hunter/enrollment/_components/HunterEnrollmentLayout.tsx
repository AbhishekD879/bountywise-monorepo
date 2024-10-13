// components/HunterEnrollmentLayout.tsx (Server Component)
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function HunterEnrollmentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='py-4'>
      <Card className='mx-auto w-full max-w-2xl'>
        <CardHeader>
          <CardTitle className='text-center text-2xl font-bold'>Hunter Profile Setup</CardTitle>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  )
}
