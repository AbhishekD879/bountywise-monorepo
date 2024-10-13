import { generateBountyDescription } from '@/lib/_aiAdapters/flash-model'

export async function POST(req: Request) {
  const { title, description } = await req.json()
  console.log(title, description)
  const response = await generateBountyDescription(title, description)
  return new Response(
    JSON.stringify({
      description: response,
      success: true,
      error: null,
      code: 200,
      message: 'Bounty description generated successfully' // or any other message you want to return. This message will be displayed in the client's console.log.
    }),
    { headers: { 'Content-Type': 'application/json' } }
  )
}
