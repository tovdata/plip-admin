import { useMemo } from "react";
// Component
import { Col, Modal, Row } from "antd";
import { DescriptionGroup } from "@/components/molecules/Group";
// Utilities
import { transformToDate } from "@/utilities/common";

/** [Component] 사용자 정보 팝업 */
export function UserInfoPopup({ onCancel, open, user }: { onCancel: () => void, open: boolean, user: any }): JSX.Element {
  // 팝업 바디(Body) 스타일
  const bodyStyle: React.CSSProperties = useMemo(() => ({ marginTop: 24 }), []);

  return (
    <Modal bodyStyle={bodyStyle} destroyOnClose={true} footer={null} onCancel={onCancel} open={open} title="사용자 정보">
      <Row gutter={[16, 16]}>
        <Col lg={12} span={24}>
          <DescriptionGroup label="이름">{user?.name}</DescriptionGroup>
        </Col>
        <Col lg={12} span={24}>
          <DescriptionGroup label="이메일">{user?.email}</DescriptionGroup>
        </Col>
        <Col lg={12} span={24}>
          <DescriptionGroup displayEmpty label="부서">{user?.department}</DescriptionGroup>
        </Col>
        <Col lg={12} span={24}>
          <DescriptionGroup displayEmpty label="직책">{user?.position}</DescriptionGroup>
        </Col>
        <Col lg={12} span={24}>
          <DescriptionGroup displayEmpty label="가입일시">{transformToDate(user?.created_at)}</DescriptionGroup>
        </Col>
        <Col lg={12} span={24}>
          <DescriptionGroup displayEmpty label="마케팅 여부">{user?.ssa1 ? "동의" : "비동의"}</DescriptionGroup>
        </Col>
      </Row>
    </Modal>
  );
}