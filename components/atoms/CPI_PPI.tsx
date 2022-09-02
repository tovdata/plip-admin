import { useMemo, useState } from 'react';
import styled from 'styled-components';
// Component
import { Description } from '@/components/atoms/Description';
import { Col, Row } from 'antd';

const StyledTitle = styled.h2`
  color: #262626;
  font-size: 17px;
  font-weight: 700;
  line-height: 1.4;
  margin-bottom: 12px;
`;

interface CpiPpiFormProps {
  data: any[];
  type: 'cpi' | 'ppi';
}

const CpiPpiForm: React.FC<CpiPpiFormProps> = ({ data, type }): JSX.Element => {
  // Link
  const [link, setLink] = useState<boolean>(false);

  // 제목
  const title: string = useMemo(() => type === 'cpi' ? '제3자 위탁' : '제3자 제공', []);
  // 업체 수
  const count: number = useMemo(() => data ? data.filter((elem: any): boolean => {
    if ('url' in elem.data) {
      // 링크 존재 확인
      setLink(true);
      return false;
    } else {
      return true;
    }
  }).length : 0, [data]);
  // 국외 반출 수
  const foreign: number = useMemo(() => data ? data.filter((elem: any): boolean => elem.data ? elem.data.isForeign : false).length : 0, [data]);

  // 컴포넌트 반환
  return (
    <>
      <StyledTitle>{title}</StyledTitle>
      <Row gutter={[16, 8]}>
        <Col xl={12} lg={24} span={12}>
          <Description label='업체 수'>{count}</Description>
        </Col>
        <Col xl={12} lg={24} span={12}>
          <Description label='링크 포함 여부'>{link ? 'True' : 'False'}</Description>
        </Col>
        <Col xl={12} lg={24} span={12}>
          <Description label='국외 반출'>{foreign}</Description>
        </Col>
      </Row>
    </>
  )
}

export default CpiPpiForm;