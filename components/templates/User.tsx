// Component
import { Container } from "@/components/atoms/Container";
import { FormBox } from "@/components/molecules/Box";
import { UserTableForm } from "@/components/organisms/form/User";

/** [Component] 사용자 전체 목록 페이지 템플릿 */
export function UserListTemplate(): JSX.Element {
  return (
    <Container>
      <FormBox title="사용자 전체 목록">
        <UserTableForm />
      </FormBox>
    </Container>
  );
}