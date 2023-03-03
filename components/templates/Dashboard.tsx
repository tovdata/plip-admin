import { useCallback, useState } from "react";
// Component
import { CompanyListForm } from "@/components/organisms/form/Company";
import { Button, Drawer } from "antd";

/** [Component] 대시보드 템플릿 */
export function DashboardTemplate(): JSX.Element {
  // 드로워 표시 상태
  const [open, setOpen] = useState<boolean>(false);

  /** [Event handler] 드로워 닫기 */
  const onClose = useCallback((): void => setOpen(false), []);
  /** [Event handler] 드로워 열기 */
  const onOpen = useCallback((): void => setOpen(true), []);

  return (
    <div>
      <Button onClick={onOpen}>Open</Button>
      <Drawer bodyStyle={{ padding: 0 }} closable={false} onClose={onClose} open={open}>
        <CompanyListForm />
      </Drawer>
    </div>
  );
}