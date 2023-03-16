import { useCallback, useEffect, useMemo, useState } from "react";
// Component
import { Button, DatePicker, Form, Input, InputNumber, Radio } from "antd";
import { DescriptionGroupLabel, InputGroupLabel, SearchGroupLabel } from "@/components/atoms/Label";
import { DescriptionParagraph } from "@/components/atoms/Paragraph";
// Data type
import type { SearchOption, SearchOptionProps } from "@/types";
// Utilities
import { transformToDate } from "@/utilities/common";
import { isNull } from "util";
import dayjs from "dayjs";

/** [Component] 설명 그룹 */
export function DescriptionGroup({ children, className, displayEmpty, label }: { children?: React.ReactNode, className?: string, displayEmpty?: boolean, label: React.ReactNode }): JSX.Element {
  return (
    <div className={className}>
      <div className="flex items-center mb-1">
        <DescriptionGroupLabel>{label}</DescriptionGroupLabel>
      </div>
      {children ? (
        <>{children}</>
      ) : displayEmpty ? (
        <p className="m-0 text-gray-300">None</p>
      ) : (<></>)}
    </div>
  );
}
/** [Component] 폼(Form) 입력 그룹 */
export function FormInputGroup({ children, label, name, rules }: {  children?: React.ReactNode, label: React.ReactNode, name: string, rules?: any[] }): JSX.Element {
  return (
    <div>
      <div className="mb-1">
        <InputGroupLabel>{label}</InputGroupLabel>
      </div>
      <Form.Item name={name} rules={rules}>{children}</Form.Item>
    </div>
  )
}
/** [Component] 최근 정보 수정일 그룹 */
export function LastModifiedInfoGroup({ className, datetime, label, user }: { className?: string, datetime?: number, label: string, user?: string }): JSX.Element {
  // 클래스
  const combineClassName: string = useMemo(() => {
    const cn: string = "font-semibold mb-1 mt-0 text-sm";
    return className ? `${cn} ${className}` : cn;
  }, [className]);

  return (
    <div className="flex flex-wrap justify-between last:mb-0 mb-1">
      <h4 className={combineClassName}>{label}</h4>
      {datetime ? (
        <div className="flex justify-between w-36">
          <DescriptionParagraph>{transformToDate(datetime)}</DescriptionParagraph>
          <DescriptionParagraph>{user}</DescriptionParagraph>
        </div>
      ) : (<></>)}
    </div>
  );
}
/** [Component] 검색 그룹 */
export function SearchGroup({ onSearch, type }: { onSearch: (value: SearchOption) => void, type?: string }): JSX.Element {
  // 폼(Form) 객체
  const [form] = Form.useForm();
  // 검색 유형
  const [searchType, setSearchType] = useState<SearchOptionProps>("period");

  // 키워드 Placeholder
  const keywordPlaceholder: string | undefined = useMemo(() => {
    switch (type) {
      case "company":
        return "회사명";
      case "service":
        return "서비스명";
      case "user":
        return "사용자명";
      default:
        return undefined;
    }
  }, [type]);

  /** [Event handler] 검색 유형 변경 */
  const onValuesChange = useCallback((values: any): void => values.type ? setSearchType(values.type) : undefined, []);
  /** [Event handler] 검색 */
  const onFinish = useCallback((values: any): void => {
    // 기간일 경우, timestamp 변환
    if (values.type === "period") onSearch({ period: { from: values?.from ? values.from.unix() : undefined, to: values?.to ? values.to.unix() : undefined } });
    // 크기
    else if (values.type === "size") onSearch({ size: { offset: values?.offset, limit: values?.limit } })
    // 키워드
    else if (values.type === "keyword") onSearch({ keyword: values.input });
  }, []);

  /** [Event hook] 데이터 초기화 */
  useEffect((): void => form.setFieldValue("from", dayjs(dayjs().subtract(1, "month").format("YYYY-MM-DD"))), [form]);

  return (
    <Form form={form} onFinish={onFinish} onValuesChange={onValuesChange}>
      <div className="grid grid-cols-6 gap-4">
        <div className="col-span-2">
          <SearchGroupLabel>검색 유형</SearchGroupLabel>
          <Form.Item initialValue={searchType} name="type" noStyle>
            <Radio.Group>
              <Radio value="keyword">키워드</Radio>
              <Radio value="period">기간</Radio>
              <Radio value="size">크기</Radio>
            </Radio.Group>
          </Form.Item>
        </div>
        <div className="col-span-3">
          {searchType === "period" ? (
            <div>
              <SearchGroupLabel>기간</SearchGroupLabel>
              <div className="grid grid-cols-2 gap-4">
                <Form.Item name="from" noStyle>
                  <DatePicker placeholder="검색 시작일" />
                </Form.Item>
                <Form.Item name="to" noStyle>
                  <DatePicker placeholder="검색 종료일" />
                </Form.Item>
              </div>
            </div>
          ) : searchType === "size" ? (
            <div>
              <SearchGroupLabel>배치(Batch) 크기</SearchGroupLabel>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Form.Item name="offset" noStyle>
                    <InputNumber className="w-full" placeholder="시작 Index" />
                  </Form.Item>
                </div>
                <Form.Item name="limit" noStyle>
                  <InputNumber className="w-full" placeholder="데이터 크기" />
                </Form.Item>
              </div>
            </div>
          ) : (
            <div>
              <SearchGroupLabel>검색어</SearchGroupLabel>
              <Form.Item name="input" noStyle>
                <Input width="100%" placeholder={keywordPlaceholder} />
              </Form.Item>
            </div>
          )}
        </div>
        <div className="col-span-1 flex items-end justify-end">
          <Button htmlType="submit" type="primary">검색</Button>
        </div>
      </div>
    </Form>
  );
}