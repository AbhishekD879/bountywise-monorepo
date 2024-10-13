import { GoogleGenerativeAI } from '@google/generative-ai'
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY!)
export const flash = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

export async function generateBountyDescription(title: string, description: string) {
  console.log(`Generating bounty description for title: ${title}, description: ${description}`)
  let prompt = `
  "Strict Rules: 
  1)Don't Return markdown
  2) Don't use any offensive or inappropriate language
  3) Don't use any explicit or suggestive language
  4) Return Response as if You are the Poster
  "
"Generate a concise, structured bounty description based on the provided title: [${title}] and any additional description: [${description}] from the user. The response should be brief but informative, clearly outlining what the Bounty Poster is looking for, with specific tasks or expectations included. If the user has typed any description, incorporate it appropriately into the response.

Use the following structure:

Objective: A one-line summary of what the bounty is about.
Requirements: Specific requirements or qualifications the Hunter should have.
Expectations: A short list of tasks or areas the Hunter will be working on.
Examples:

Title: "Want Someone to Conduct My Mock Interview for Paytm"

Description:
Objective: I am looking for a professional to conduct a mock interview for Paytm.
Requirements: Ideally, the person should have experience working at Paytm or have been previously interviewed there.
Expectations: The person should understand Paytm's interview process, including the rounds and types of questions asked.
Title: "Need Help with SEO Optimization for E-Commerce Website"

Description:
Objective: I need an SEO expert to optimize my e-commerce website for better search engine ranking.
Requirements: The Hunter should have prior experience in e-commerce SEO and keyword optimization.
Expectations: The tasks include keyword research, meta tag improvements, and on-page SEO for product pages.
Title: "Create a Social Media Strategy for My Brand"

Description:
Objective: I'm looking for a social media strategist to help build an online presence for my brand.
Requirements: Experience with creating and implementing social media campaigns for small businesses is preferred.
Expectations: The strategy should include content planning, platform recommendations, and growth tactics.
Make sure the description is short and straightforward, with a clear list of requirements and expectations that would help the Hunter understand the task quickly."

Example Output Based on the Prompt:
Input:
Title: "Want Someone to Conduct My Mock Interview for Paytm"
Generated Description:
Objective: I need someone to conduct a mock interview for Paytm.
Requirements: Preferably someone who has worked at Paytm or has been interviewed there.
Expectations: You should know the rounds conducted during the interview process and the type of questions typically asked
    `
  const result = await flash.generateContent(prompt)
  const resultText = result.response.text()
  //   const resultText = "dummy text";
  console.log(`Generated bounty description:`, resultText)
  return resultText
}

export async function rewriteBountyTitle(title: string) {
  const prompt = `
"Guidelines:
1) The title should not exceed 10 words.
2) Avoid markdown, offensive, inappropriate, explicit, or suggestive language.
3) The title should clearly convey a 'help wanted' request, if applicable.
4) Be concise and to the point.
5) Only Give One title
6) Do Not Return markdown
"

"Rewrite the title: [${title}] to be clear, professional, and under 10 words. Focus on conveying the main intent briefly and effectively."
`

  const result = await flash.generateContent(prompt)
  const resultText = result.response.text()
  return resultText
}
