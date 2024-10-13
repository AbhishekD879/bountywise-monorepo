import React, { Suspense, useEffect, useState } from 'react'

// Helper function to dynamically import a skeleton component (Client Side)
const importSkeleton = async (skeletonPath: string) => {
  try {
    const SkeletonComponent = await import(skeletonPath)
    return SkeletonComponent.default || SkeletonComponent
  } catch (err) {
    console.warn(`Skeleton for Path ${skeletonPath} not found.`)
    return null
  }
}

const withClientSkeleton = (Component: React.ComponentType, skeletonPath: string) => {
  return (props: any) => {
    const [Skeleton, setSkeleton] = useState<React.ComponentType | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
      const loadSkeleton = async () => {
        const loadedSkeleton = await importSkeleton(skeletonPath)
        setSkeleton(() => loadedSkeleton)
        setIsLoading(false)
      }

      loadSkeleton()
    }, [skeletonPath])

    return (
      <Suspense fallback={isLoading ? <div>Loading...</div> : Skeleton ? <Skeleton /> : null}>
        <Component {...props} />
      </Suspense>
    )
  }
}

export default withClientSkeleton
