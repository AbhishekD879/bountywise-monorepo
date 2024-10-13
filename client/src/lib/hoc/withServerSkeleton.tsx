import React, { Suspense } from 'react'

// Helper function to dynamically import a skeleton component (Server Side)
const importSkeleton = async (skeletonPath: string) => {
  try {
    const SkeletonComponent = await import(`./../../skeletons/_components/${skeletonPath}`)
    return SkeletonComponent.default || SkeletonComponent
  } catch (err) {
    console.warn(`Skeleton for Path: ${skeletonPath} not found.`)
    return null
  }
}

const withServerSkeleton = (Component: React.ComponentType<any>, skeletonPath: string) => {
  return async (props: any) => {
    const isAsync = Component.constructor.name === 'AsyncFunction'
    console.log('Component.prototype?.constructor?.name:', Component.constructor.name)
    if (isAsync) {
      // If the component is async, wrap it in Suspense
      const Skeleton = await importSkeleton(skeletonPath)
      return (
        <Suspense fallback={Skeleton ? <Skeleton /> : <div>Loading...</div>}>
          <Component {...props} />
        </Suspense>
      )
    }

    // If not async, render the component directly
    return <Component {...props} />
  }
}

export default withServerSkeleton
