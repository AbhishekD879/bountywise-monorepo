'use client'
import { Button } from '@/components/ui/button'
import { Modal } from '../Modal'
import CONSTANT from '@/constants'
import AuthForm from '../AuthForm/AuthForm'

// Define JoinAsAHunterCta component
export const SignUpCta: React.FC = () => {
  return (
    <Modal
      ModalComponent={AuthForm}
      modelProps={{
        isSignUpMode: true
      }}
    >
      <Button>{CONSTANT.SIGNUP_CTA}</Button>
    </Modal>
  )
}
