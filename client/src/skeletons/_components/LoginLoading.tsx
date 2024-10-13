import './../skeletonTemplate/skeletonStyle.css'
import { Skeleton, SVGSkeleton } from '../skeletonTemplate/Skeleton'

const LoginLoadingSkeleton = () => (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-5 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <SVGSkeleton className="mx-auto " />
        <h2 className="mt-4 leading-9 tracking-tight">
          <Skeleton className="w-full" />
        </h2>
      </div>
      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-2">
          <div>
            <label className="block leading-6">
              <Skeleton className="w-[104px] max-w-full" />
            </label>
            <div className="mt-1">
              <div className="block w-full border-0 px-2 py-1.5 shadow-sm sm:leading-6"></div>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label className="block leading-6">
                <Skeleton className="w-[64px] max-w-full" />
              </label>
              <div>
                <a>
                  <Skeleton className="w-[128px] max-w-full" />
                </a>
              </div>
            </div>
            <div className="mt-1">
              <div className="block w-full border-0 px-2 py-1.5 shadow-sm sm:leading-6"></div>
            </div>
          </div>
          <div>
            <div className="relative flex w-full justify-center px-3 py-1.5 leading-6 shadow-sm">
              <Skeleton className="w-[56px] max-w-full" />
            </div>
          </div>
        </form>
        <div>
          <form>
            <div className="relative mt-2 flex w-full justify-center px-3 py-1.5 leading-6 shadow-sm">
              <Skeleton className="w-[152px] max-w-full" />
              <SVGSkeleton className="-ml-1 mr-2 mt-1 w-4 h-4" />
            </div>
          </form>
          <div className="relative mt-2 flex w-full justify-center px-3 py-1.5 leading-6 shadow-sm">
            <Skeleton className="w-[144px] max-w-full" />
            <SVGSkeleton className="-ml-1 mr-2 w-5 h-5" />
          </div>
        </div>
        <div className="mt-4">
          <div>
            <Skeleton className="w-[200px] max-w-full" />
            <a className="leading-6">
              <Skeleton className="w-[56px] max-w-full" />
            </a>
          </div>
        </div>
      </div>
    </div>
)
export default LoginLoadingSkeleton
