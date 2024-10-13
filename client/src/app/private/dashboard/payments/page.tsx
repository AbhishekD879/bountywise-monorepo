import React from 'react'
import { DollarSign, Clock, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function Page() {
  return (
    <div className='space-y-6'>
      <h2 className='text-3xl font-bold text-[#303841]'>Payments</h2>
      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
        <Card className='border-none bg-[#ffffff] shadow-lg transition-shadow hover:shadow-xl'>
          <CardHeader className='bg-gradient-to-r from-[#ff5722] to-[#ff7f50] text-[#ffffff]'>
            <CardTitle className='flex items-center'>
              <DollarSign className='mr-2 h-6 w-6' />
              Total Earnings
            </CardTitle>
          </CardHeader>
          <CardContent className='pt-6'>
            <div className='text-4xl font-bold text-[#303841]'>$5,280</div>
            <p className='text-[#46515e]'>Lifetime earnings</p>
          </CardContent>
        </Card>
        <Card className='border-none bg-[#ffffff] shadow-lg transition-shadow hover:shadow-xl'>
          <CardHeader className='bg-gradient-to-r from-[#46515e] to-[#303841] text-[#ffffff]'>
            <CardTitle className='flex items-center'>
              <Clock className='mr-2 h-6 w-6' />
              Pending Payments
            </CardTitle>
          </CardHeader>
          <CardContent className='pt-6'>
            <div className='text-4xl font-bold text-[#303841]'>$750</div>
            <p className='text-[#46515e]'>From 3 consultations</p>
          </CardContent>
        </Card>
        <Card className='border-none bg-[#ffffff] shadow-lg transition-shadow hover:shadow-xl'>
          <CardHeader className='bg-gradient-to-r from-[#ff5722] to-[#ff7f50] text-[#ffffff]'>
            <CardTitle className='flex items-center'>
              <TrendingUp className='mr-2 h-6 w-6' />
              Next Payout
            </CardTitle>
          </CardHeader>
          <CardContent className='pt-6'>
            <div className='text-4xl font-bold text-[#303841]'>$1,200</div>
            <p className='text-[#46515e]'>Scheduled for June 1, 2023</p>
          </CardContent>
        </Card>
      </div>
      <Card className='border-none bg-[#ffffff] shadow-lg'>
        <CardHeader>
          <CardTitle className='text-2xl text-[#303841]'>Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            {[
              {
                title: 'Legal Consultation',
                amount: 200,
                date: 'May 20, 2023'
              },
              {
                title: 'Financial Planning Session',
                amount: 150,
                date: 'May 18, 2023'
              },
              { title: 'Technical Support', amount: 100, date: 'May 15, 2023' }
            ].map((transaction, index) => (
              <div
                key={transaction.title}
                className='flex items-center justify-between rounded-lg bg-[#eeeeee] p-4 transition-colors hover:bg-[#d4d4d4]'
              >
                <div>
                  <h4 className='font-semibold text-[#303841]'>{transaction.title}</h4>
                  <p className='text-sm text-[#46515e]'>{transaction.date}</p>
                </div>
                <div className='text-right'>
                  <p className='font-bold text-[#303841]'>${transaction.amount}</p>
                  <Badge variant='outline' className='border-[#ff5722] bg-[#ffffff] text-[#ff5722]'>
                    Completed
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
