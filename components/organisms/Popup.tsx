import { useMemo } from "react";
// Component
import { Col, Modal, Row } from "antd";
import { DescriptionGroup } from "@/components/molecules/Group";
import { CpiTable, PiTable, PpiTable } from "@/components/molecules/Table";
// Data type
import type { PIM_TYPE } from "@/types";
// Utilities
import { transformToDate } from "@/utilities/common";

/** [Component] 개인정보 관리(PIM) 데이터에 대한 팝업 */
export function PimPopup({ onCancel, open, serviceId, type }: { onCancel: () => void, open: boolean, serviceId: string, type: PIM_TYPE | undefined }): JSX.Element {
  // 팝업 바디(Body) 스타일
  const bodyStyle: React.CSSProperties = useMemo(() => ({ marginTop: 16 }), []);

  // 팝업 제목
  const title: string = useMemo(() => {
    switch (type) {
      case "cpi":
        return "개인정보 위탁";
      case "dpi":
        return "개인정보 파기";
      case "pi":
        return "개인정보 수집 및 이용";
      case "ppi":
        return "개인정보 제3자 제공";
      default:
        return "";
    }
  }, [type]);
  // 테이블
  const table: React.ReactNode = useMemo(() => {
    switch (type) {
      case "cpi":
        return (<CpiTable serviceId={serviceId} />);
      case "pi":
        return (<PiTable serviceId={serviceId} />);
      case "ppi":
        return (<PpiTable serviceId={serviceId} />);
      default:
        return (<></>)
    }
  }, [serviceId, type]);

  return (
    <Modal bodyStyle={bodyStyle} destroyOnClose={true} footer={null} onCancel={onCancel} open={open} title={title} width={1024}>{table}</Modal>
  );
}


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
          <DescriptionGroup displayEmpty label="연락처">{user?.contact?.toString().replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3")}</DescriptionGroup>
        </Col>
        <Col lg={12} span={24}>
          <DescriptionGroup displayEmpty label="가입일시">{transformToDate(user?.created_at)}</DescriptionGroup>
        </Col>
        <Col lg={12} span={24}>
          <DescriptionGroup displayEmpty label="부서">{user?.department}</DescriptionGroup>
        </Col>
        <Col lg={12} span={24}>
          <DescriptionGroup displayEmpty label="직책">{user?.position}</DescriptionGroup>
        </Col>
        <Col lg={12} span={24}>
          <DescriptionGroup displayEmpty label="마케팅 여부">{user?.ssa1 ? "동의" : "비동의"}</DescriptionGroup>
        </Col>
      </Row>
    </Modal>
  );
}