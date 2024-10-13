'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CreditCard, Building, Smartphone, Trash2, DollarSign, AlertCircle } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'

type PaymentMethod = {
  type: 'card' | 'bank' | 'paypal' | 'upi'
  value: string
}

export default function PaymentMethods() {
  const [cardNumber, setCardNumber] = useState('')
  const [cardName, setCardName] = useState('')
  const [expiryDate, setExpiryDate] = useState('')
  const [cvv, setCvv] = useState('')
  const [bankAccount, setBankAccount] = useState('')
  const [routingNumber, setRoutingNumber] = useState('')
  const [paypalEmail, setPaypalEmail] = useState('')
  const [upiId, setUpiId] = useState('')
  const [savedMethods, setSavedMethods] = useState<PaymentMethod[]>([])
  const [methodToDelete, setMethodToDelete] = useState<number | null>(null)

  const handleAddPaymentMethod = (type: PaymentMethod['type'], value: string) => {
    setSavedMethods([...savedMethods, { type, value }])
  }

  const handleRemovePaymentMethod = (index: number) => {
    setSavedMethods(savedMethods.filter((_, i) => i !== index))
    setMethodToDelete(null)
  }

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault()
    handleAddPaymentMethod('card', `Card ending in ${cardNumber.slice(-4)}`)
    setCardNumber('')
    setCardName('')
    setExpiryDate('')
    setCvv('')
  }

  const handleAddBank = (e: React.FormEvent) => {
    e.preventDefault()
    handleAddPaymentMethod('bank', `Bank account ending in ${bankAccount.slice(-4)}`)
    setBankAccount('')
    setRoutingNumber('')
  }

  const handleAddPaypal = (e: React.FormEvent) => {
    e.preventDefault()
    handleAddPaymentMethod('paypal', paypalEmail)
    setPaypalEmail('')
  }

  const handleAddUpi = (e: React.FormEvent) => {
    e.preventDefault()
    handleAddPaymentMethod('upi', upiId)
    setUpiId('')
  }

  const groupedMethods = savedMethods.reduce(
    (acc, method) => {
      if (!acc[method.type]) {
        acc[method.type] = []
      }
      acc[method.type].push(method)
      return acc
    },
    {} as Record<PaymentMethod['type'], PaymentMethod[]>
  )

  return (
    <Card className='mx-auto w-full max-w-2xl'>
      <CardHeader>
        <CardTitle className='text-center text-2xl font-bold'>Payment Methods</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue='card' className='w-full'>
          <TabsList className='mb-6 grid h-auto w-full grid-cols-4'>
            <TabsTrigger value='card' className='flex flex-col items-center px-1 py-2'>
              <CreditCard className='mb-1 h-4 w-4' />
              <span className='text-xs'>Card</span>
            </TabsTrigger>
            <TabsTrigger value='bank' className='flex flex-col items-center px-1 py-2'>
              <Building className='mb-1 h-4 w-4' />
              <span className='text-xs'>Bank</span>
            </TabsTrigger>
            <TabsTrigger value='paypal' className='flex flex-col items-center px-1 py-2'>
              <DollarSign className='mb-1 h-4 w-4' />
              <span className='text-xs'>PayPal</span>
            </TabsTrigger>
            <TabsTrigger value='upi' className='flex flex-col items-center px-1 py-2'>
              <Smartphone className='mb-1 h-4 w-4' />
              <span className='text-xs'>UPI</span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value='card'>
            <form onSubmit={handleAddCard} className='space-y-4'>
              <div className='space-y-2'>
                <Label htmlFor='cardName'>Cardholder Name</Label>
                <Input
                  id='cardName'
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  required
                  className='border-gray-300'
                  placeholder='John Doe'
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='cardNumber'>Card Number</Label>
                <Input
                  id='cardNumber'
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  required
                  className='border-gray-300'
                  placeholder='1234 5678 9012 3456'
                />
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <Label htmlFor='expiryDate'>Expiry Date</Label>
                  <Input
                    id='expiryDate'
                    placeholder='MM/YY'
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    required
                    className='border-gray-300'
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='cvv'>CVV</Label>
                  <Input
                    id='cvv'
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    required
                    className='border-gray-300'
                    placeholder='123'
                  />
                </div>
              </div>
              <Button type='submit' className='w-full bg-orange-500 text-white hover:bg-orange-600'>
                Add Card
              </Button>
            </form>
          </TabsContent>
          <TabsContent value='bank'>
            <form onSubmit={handleAddBank} className='space-y-4'>
              <div className='space-y-2'>
                <Label htmlFor='bankAccount'>Bank Account Number</Label>
                <Input
                  id='bankAccount'
                  value={bankAccount}
                  onChange={(e) => setBankAccount(e.target.value)}
                  required
                  className='border-gray-300'
                  placeholder='123456789'
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='routingNumber'>Routing Number</Label>
                <Input
                  id='routingNumber'
                  value={routingNumber}
                  onChange={(e) => setRoutingNumber(e.target.value)}
                  required
                  className='border-gray-300'
                  placeholder='987654321'
                />
              </div>
              <Button type='submit' className='w-full bg-orange-500 text-white hover:bg-orange-600'>
                Add Bank Account
              </Button>
            </form>
          </TabsContent>
          <TabsContent value='paypal'>
            <form onSubmit={handleAddPaypal} className='space-y-4'>
              <div className='space-y-2'>
                <Label htmlFor='paypalEmail'>PayPal Email Address</Label>
                <Input
                  id='paypalEmail'
                  type='email'
                  value={paypalEmail}
                  onChange={(e) => setPaypalEmail(e.target.value)}
                  required
                  className='border-gray-300'
                  placeholder='your.email@example.com'
                />
              </div>
              <Button type='submit' className='w-full bg-orange-500 text-white hover:bg-orange-600'>
                Add PayPal Account
              </Button>
            </form>
          </TabsContent>
          <TabsContent value='upi'>
            <form onSubmit={handleAddUpi} className='space-y-4'>
              <div className='space-y-2'>
                <Label htmlFor='upiId'>UPI ID</Label>
                <Input
                  id='upiId'
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  required
                  className='border-gray-300'
                  placeholder='yourname@upi'
                />
              </div>
              <Button type='submit' className='w-full bg-orange-500 text-white hover:bg-orange-600'>
                Add UPI ID
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        <div className='mt-8'>
          <h3 className='mb-4 text-lg font-semibold'>Saved Payment Methods</h3>
          {Object.entries(groupedMethods).map(([type, methods]) => (
            <div key={type} className='mb-4'>
              <h4 className='text-md mb-2 font-medium capitalize'>{type}</h4>
              <div className='space-y-3'>
                {methods.map((method, index) => (
                  <div key={index} className='bg-gray-50 flex items-center justify-between rounded-lg p-3 shadow-sm'>
                    <div className='flex items-center space-x-3'>
                      {method.type === 'card' && <CreditCard className='h-5 w-5 text-blue-500' />}
                      {method.type === 'bank' && <Building className='h-5 w-5 text-green-500' />}
                      {method.type === 'paypal' && <DollarSign className='h-5 w-5 text-blue-700' />}
                      {method.type === 'upi' && <Smartphone className='h-5 w-5 text-purple-500' />}
                      <span className='text-sm font-medium'>{method.value}</span>
                    </div>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant='ghost'
                          size='sm'
                          onClick={() => setMethodToDelete(savedMethods.findIndex((m) => m === method))}
                          className='text-red-500 hover:text-red-700'
                        >
                          <Trash2 className='h-4 w-4' />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your saved payment method.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel onClick={() => setMethodToDelete(null)}>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => methodToDelete !== null && handleRemovePaymentMethod(methodToDelete)}
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                ))}
              </div>
            </div>
          ))}
          {savedMethods.length === 0 && (
            <div className='py-4 text-center'>
              <AlertCircle className='mx-auto mb-2 h-12 w-12 text-orange-500' />
              <p className='text-gray-500'>No payment methods saved yet.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
