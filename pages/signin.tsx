import type { NextPage } from 'next';
// Component
import { StyledSigninContainer } from '@/components/styles/Layout';
import Signin from '@/components/Signin';

const Page: NextPage = () => {
  return (
    <StyledSigninContainer>
      <Signin />
    </StyledSigninContainer>
  )
}

export default Page;