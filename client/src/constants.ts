import { CreditCardIcon, InfoIcon, LucideIcon, NetworkIcon, PointerIcon, SignpostIcon, TimerIcon } from 'lucide-react'
type CONSTANT = {
  BRAND: string
  POST_A_BOUNTY_CTA: string
  JOIN_AS_A_HUNTER_CTA: string
  LOGIN_CTA: string
  SIGNUP_CTA: string
  SERVICES: Service[]
}

export type Service = {
  icon: LucideIcon
  title: string
  desc: string
}

const services: Service[] = [
  {
    icon: SignpostIcon,
    title: 'Post',
    desc: 'Create a bounty and describe your problem.'
  },
  {
    icon: NetworkIcon,
    title: 'Connect',
    desc: 'Get matched with experts in real-time.'
  },
  {
    icon: InfoIcon,
    title: 'Get Advice',
    desc: 'Receive tailored solutions from professionals.'
  },
  {
    icon: TimerIcon,
    title: 'Real-time Consultations',
    desc: 'Instantly connect with experts for live advice.'
  },
  {
    icon: CreditCardIcon,
    title: 'Secure Payments',
    desc: 'Your transactions are safe and secure.'
  },
  {
    icon: PointerIcon,
    title: 'Tailored Expert Advice',
    desc: 'Get solutions that are specific to your needs.'
  }
]

const CONSTANT: CONSTANT = {
  //+
  SERVICES: services,
  BRAND: 'Bountywise',
  POST_A_BOUNTY_CTA: 'Post a Bounty',
  JOIN_AS_A_HUNTER_CTA: 'Join as a Hunter',
  LOGIN_CTA: 'Login',
  SIGNUP_CTA: 'Sign Up'
}

export default CONSTANT

// export type CONSTANT = typeof CONSTANT; //+
