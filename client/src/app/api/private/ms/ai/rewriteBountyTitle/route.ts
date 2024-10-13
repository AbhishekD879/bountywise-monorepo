import { rewriteBountyTitle } from '@/lib/_aiAdapters/flash-model'

export async function POST(req: Request) {
  const { title } = await req.json()
  console.log(title)
  const response = await rewriteBountyTitle(title)
  console.log('response title', response)
  return new Response(
    JSON.stringify({
      title: response,
      success: true,
      error: null,
      code: 200,
      message: 'Bounty description generated successfully' // or any other message you want to return. This message will be displayed in the client's console.log.
    }),
    { headers: { 'Content-Type': 'application/json' } }
  )
}
