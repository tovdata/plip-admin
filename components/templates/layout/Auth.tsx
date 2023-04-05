import { PropsWithChildren, useEffect, useState } from 'react'
import { useRouter } from 'next/router';
// Component
import { QueryErrorBoundary } from "@suspensive/react-query";

type ERROR_NAME = string | null;  // Error name을 위한 type 입니다.

const AuthLayout = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const [error, setError] = useState<ERROR_NAME>(null)

  useEffect(() => {
    if (error === "UNAUTHORIZED") router.push('/login');  // 로그인 권한이 없는 에러일 때 login 페이지로 route 시킵니다.
  }, [error])
  
  return (
    <QueryErrorBoundary
      fallback={queryError => {
        setError(queryError.error.name);
        queryError.reset();
        return(
          <></>  // 즉시 로그인 페이지로 보내기 위한 더미 컴포넌트 입니다.
        )
      }}
    >
      {children}
    </QueryErrorBoundary>
  )
}

export default AuthLayout