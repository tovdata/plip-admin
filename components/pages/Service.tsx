import { getCompany, getService, getServices } from "@/models/apis/company";
import { KEY_COMPANY, KEY_SERVICE } from "@/models/type";
import { useQuery } from "@tanstack/react-query";
import { Breadcrumb as AntBreadcrumb, Descriptions, PageHeader, Row, Statistic, Tag } from "antd";
import Link from "next/link";
import Router from "next/router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { transformToDate } from "utils/util";
import Layout from "../atoms/Layout";

const Page: React.FC<any> = ({ serviceId }): JSX.Element => {
  // 회사
  const [company, setCompany] = useState<string>('');
  // API 호출
  const { data: service } = useQuery([KEY_SERVICE], async () => await getService(serviceId));
  /** [Event handler] 뒤로가기 */
  const onBack = useCallback(() => window.history.back(), []);
  // 회사 정보 조회
  useEffect(() => {
    if (service) {
      (async () => {
        // API 호출
        const response: any = await getCompany(service.companyId);
        if (response) {
          setCompany(response.companyName);
        }
      })();
    }
  }, [service]);

  // 컴포넌트 반환
  return (
    <Layout selectedKey='management'>
      {service === undefined ? (<></>) : (
        <>
          <PageHeader ghost={false} onBack={onBack} title={service.serviceName}>
            <Descriptions size='small'>
              <Descriptions.Item label='담당회사'>
                <Link passHref href={`/company/${service.companyId}`}>
                  <a>{company}</a>
                </Link>
              </Descriptions.Item>
              <Descriptions.Item label='생성일자'>{transformToDate(service.createAt)}</Descriptions.Item>
              <Descriptions.Item label='서비스 유형'>
                <>{service.types.map((type: string): JSX.Element => (<Tag key={type}>{type}</Tag>))}</>
              </Descriptions.Item>
              <Descriptions.Item label='URL' span={3}>{service.url ? service.url : 'none'}</Descriptions.Item>
            </Descriptions>
          </PageHeader>
        </>
      )}
    </Layout>
  );
}

export default Page;