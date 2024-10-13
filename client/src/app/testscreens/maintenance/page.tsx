import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Wrench, ArrowRight, Server, Shield, Zap, Clock, CheckCircle } from 'lucide-react'

export default function MaintenancePage() {
  return (
    <html>
      <body className='grid h-screen place-content-center'>
        <div className='flex h-[calc(100%_-_76px)] flex-col bg-white'>
          <main className='flex flex-grow flex-col items-center justify-center p-6 text-[#303841]'>
            <div className='w-full max-w-2xl space-y-12'>
              <div className='space-y-4 text-center'>
                <div className='flex justify-center space-x-8'>
                  <Wrench className='icon-float h-16 w-16 text-[#ff5722]' style={{ animationDelay: '0s' }} />
                  <Server className='icon-float h-16 w-16 text-[#ff5722]' style={{ animationDelay: '0.5s' }} />
                  <Shield className='icon-float h-16 w-16 text-[#ff5722]' style={{ animationDelay: '1s' }} />
                </div>
                <h1 className='text-4xl font-bold'>We&apos;re improving BountyWise</h1>
                <p className='text-xl text-[#46515e]'>
                  Our site is currently undergoing maintenance. We&apos;ll be back shortly.
                </p>
              </div>

              <div className='space-y-6'>
                <div className='h-[1px] bg-[#e0e0e0]' />
                <div className='flex items-center justify-between'>
                  <span className='flex items-center text-sm text-[#46515e]'>
                    <Clock className='icon-spin mr-2 h-4 w-4' />
                    Estimated downtime
                  </span>
                  <span className='text-sm font-medium'>2 hours</span>
                </div>
                <div className='h-[1px] bg-[#e0e0e0]' />
              </div>

              <div className='space-y-6'>
                <h2 className='text-xl font-semibold'>What we&apos;re working on:</h2>
                <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
                  <div className='flex items-center space-x-2 transition-transform duration-300 hover:translate-y-[-5px]'>
                    <Zap className='h-6 w-6 text-[#ff5722]' />
                    <span>Performance upgrades</span>
                  </div>
                  <div className='flex items-center space-x-2 transition-transform duration-300 hover:translate-y-[-5px]'>
                    <Shield className='h-6 w-6 text-[#ff5722]' />
                    <span>Security enhancements</span>
                  </div>
                  <div className='flex items-center space-x-2 transition-transform duration-300 hover:translate-y-[-5px]'>
                    <Server className='h-6 w-6 text-[#ff5722]' />
                    <span>Server optimizations</span>
                  </div>
                </div>
              </div>

              <div className='space-y-4'>
                <h2 className='text-xl font-semibold'>Get notified when we&apos;re back</h2>
                {false ? (
                  <p className='flex items-center text-[#46515e]'>
                    <CheckCircle className='mr-2 h-5 w-5 text-green-500' />
                    Thank you! We&apos;ll notify you when we&apos;re back online.
                  </p>
                ) : (
                  <form className='flex space-x-2'>
                    <Input
                      type='email'
                      placeholder='Enter your email'
                      className='flex-grow border-[#e0e0e0] transition-all duration-300 focus:border-transparent focus:ring-2 focus:ring-[#ff5722]'
                      required
                    />
                    <Button
                      type='submit'
                      className='transform bg-[#ff5722] transition-all duration-300 hover:scale-105 hover:bg-[#ff784e]'
                    >
                      <ArrowRight className='h-4 w-4' />
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </main>

          <footer className='w-full p-6 text-center text-sm text-[#46515e]'>
            <p>&copy; {new Date().getFullYear()} BountyWise. All rights reserved.</p>
          </footer>
        </div>
      </body>
    </html>
  )
}
