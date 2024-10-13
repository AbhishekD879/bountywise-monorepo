import React from 'react'
import { Video, Clock, Star, BarChart2, PieChart } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function Page() {
  return (
    <div className='space-y-6'>
      <h2 className='text-3xl font-bold text-[#303841]'>Analytics</h2>
      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
        <Card className='border-none bg-[#ffffff] shadow-lg transition-shadow hover:shadow-xl'>
          <CardHeader className='bg-gradient-to-r from-[#ff5722] to-[#ff7f50] text-[#ffffff]'>
            <CardTitle className='flex items-center'>
              <Video className='mr-2 h-6 w-6' />
              Total Consultations
            </CardTitle>
          </CardHeader>
          <CardContent className='pt-6'>
            <div className='text-4xl font-bold text-[#303841]'>47</div>
            <p className='text-[#46515e]'>This month</p>
          </CardContent>
        </Card>
        <Card className='border-none bg-[#ffffff] shadow-lg transition-shadow hover:shadow-xl'>
          <CardHeader className='bg-gradient-to-r from-[#46515e] to-[#303841] text-[#ffffff]'>
            <CardTitle className='flex items-center'>
              <Clock className='mr-2 h-6 w-6' />
              Average Session Duration
            </CardTitle>
          </CardHeader>
          <CardContent className='pt-6'>
            <div className='text-4xl font-bold text-[#303841]'>38 min</div>
            <p className='text-[#46515e]'>Across all consultations</p>
          </CardContent>
        </Card>
        <Card className='border-none bg-[#ffffff] shadow-lg transition-shadow hover:shadow-xl'>
          <CardHeader className='bg-gradient-to-r from-[#ff5722] to-[#ff7f50] text-[#ffffff]'>
            <CardTitle className='flex items-center'>
              <Star className='mr-2 h-6 w-6' />
              Client Satisfaction
            </CardTitle>
          </CardHeader>
          <CardContent className='pt-6'>
            <div className='text-4xl font-bold text-[#303841]'>4.8/5</div>
            <div className='flex text-[#ff5722]'>
              {[...Array(5)].map((_, i) => (
                <Star key={i} className='h-6 w-6 fill-current' />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <Card className='border-none bg-[#ffffff] shadow-lg'>
        <CardHeader>
          <CardTitle className='text-2xl text-[#303841]'>Performance Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='flex h-[300px] items-center justify-center rounded-md bg-[#eeeeee]'>
            <BarChart2 className='h-16 w-16 text-[#46515e]' />
          </div>
        </CardContent>
      </Card>
      <div className='grid gap-6 md:grid-cols-2'>
        <Card className='border-none bg-[#ffffff] shadow-lg'>
          <CardHeader>
            <CardTitle className='text-2xl text-[#303841]'>Top Performing Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              {['Legal Advice', 'Financial Planning', 'Technical Support'].map((category, index) => (
                <div key={category} className='flex items-center justify-between'>
                  <span className='text-[#303841]'>{category}</span>
                  <div className='h-2 w-1/2 rounded-full bg-[#eeeeee]'>
                    <div
                      className='h-2 rounded-full bg-gradient-to-r from-[#ff5722] to-[#ff7f50]'
                      style={{ width: `${100 - index * 20}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className='border-none bg-[#ffffff] shadow-lg'>
          <CardHeader>
            <CardTitle className='text-2xl text-[#303841]'>Client Demographics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='flex h-[200px] items-center justify-center rounded-md bg-[#eeeeee]'>
              <PieChart className='h-16 w-16 text-[#46515e]' />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
