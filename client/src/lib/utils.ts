import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function safeExec(fn: () => Promise<any> | (() => any)) {
  // Get current timestamp for logging purposes
  const timestamp = new Date().toISOString()

  // Validation to ensure input is a function or a Promise
  if (typeof fn !== 'function' && !((fn as any) instanceof Promise)) {
    const errMsg = `Invalid input at ${timestamp}: Expected a function or Promise, got ${typeof fn}`
    console.error(errMsg)
    return Promise.resolve([new Error(errMsg), null])
  }

  try {
    // If input is a synchronous function, execute and wrap in a promise
    const result = fn instanceof Promise ? fn : Promise.resolve(fn())

    // Process the Promise or synchronous result
    try {
      const data = await result
      console.log(`Success at ${timestamp}:`, { result: data })
      return [null, data]
    } catch (err: unknown) {
      logError(err as Error, timestamp) // Log error
      return [err, null]
    }
  } catch (error: unknown) {
    // Handle synchronous exceptions, log them
    logError(error as Error, timestamp)
    return Promise.resolve([error, null])
  }
}

// Utility to log errors
function logError(error: Error, timestamp: string) {
  console.error(`Error occurred at ${timestamp}:`, {
    message: error.message,
    stack: error.stack
  })
}
