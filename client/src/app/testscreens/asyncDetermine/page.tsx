import LoginLoadingSkeleton from '@/skeletons/_components/LoginLoading'
import TestAsync from './_componets/TestAsync'

function page() {
  console.log(TestAsync instanceof Promise)
  console.log()
  return (
    <div>
      <TestAsync/>
    </div>
  )
}

export default page
