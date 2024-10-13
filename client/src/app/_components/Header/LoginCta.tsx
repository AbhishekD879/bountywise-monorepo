import { Button } from '@/components/ui/button'
import { Modal } from '../Modal'
import CONSTANT from '@/constants'
import AuthForm from '../AuthForm/AuthForm'

// Define PostABountyCta component
export const LoginCta: React.FC = () => {
  return (
    <Modal
      ModalComponent={AuthForm}
      modelProps={{
        isSignUpMode: false
      }}
    >
      <Button className='bg-accentOrange hover:bg-accentOrange/80'>{CONSTANT.LOGIN_CTA}</Button>
    </Modal>
  )
}
