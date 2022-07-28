import dynamic from 'next/dynamic';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRecoilValue } from 'recoil';
// Company
import { Button, DatePicker, Descriptions, Form, Input, Select, Tag, Upload } from 'antd';
import { PageHeader } from '@/components/Header';
import { BasicTable } from '@/components/Table';
import { StyledDetail } from '@/components/styles/Detail';
// Icon
const IoCloudUploadOutline = dynamic(() => import('react-icons/io5').then((mod: any): any => mod.IoCloudUploadOutline));
// Query
import { createTemplate, deleteTemplate, getTemplates, updateTemplate } from '@/models/apis/template';
// Query key
import { KEY_NEWS } from '@/models/type';
// State
import { accessTokenSelector } from '@/models/session';
// Type
import type { FormInstance, UploadProps } from 'antd';
// Util
import { transformToDate, transformToMoment } from 'utils/util';
import { errorNotification, successNotification, warningNotification } from 'utils/notification';


/** [Component] 템플릿 관리 */
const TemplateManagement: React.FC<any> = (): JSX.Element => {
  // 뉴스 ID
  const [template, setTemplate] = useState<any>({ id: '' });

  /** [Event handler] 뉴스 선택 초기화 */
  const onInit = useCallback(() => setTemplate({ id: '' }), []);
  /** [Event handler] 뉴스 선택 (생성 포함) */
  const onSelect = useCallback((record: any) => setTemplate(record), []);

  // 컴포넌트 반환
  return (
    <>
      {template.id === '' ? (
        <TemplateList onSelect={onSelect} />
      ) : (
        <TemplateDetail template={template} onInit={onInit} onSelect={onSelect} />
      )}
    </>
  );
}

/** [Internal Component] 템플릿 목록 */
const TemplateList: React.FC<any> = ({ onSelect }): JSX.Element => {
  // 가입된 회사 목록 조회
  const { isLoading, data: templates } = useQuery([KEY_NEWS], async () => await getTemplates());

  // 생성 버튼
  const tools: JSX.Element = useMemo(() => (<Button type='primary' onClick={() => onSelect({ id: 'new' })}>추가</Button>), [onSelect]);
  // 컴포넌트 반환
  return (
    <>
      <PageHeader isBack title='템플릿·참고자료 메뉴 관리' tools={tools} />
      <BasicTable columns={[
        { dataIndex: 'category', key: 'category', title: '카테고리', filters: [{ text: '기본 템플릿', value: 'default' }, { text: '템플릿', value: 'template' }, { text: '가이드라인', value: 'guide' }], onFilter: (value: any, record: any): boolean => record.category === value, render: (value: string): JSX.Element => value === 'default' ? (<Tag color='geekblue'>기본 템플릿</Tag>) : value === 'template' ? (<Tag color='geekblue'>템플릿</Tag>) : (<Tag color='geekblue'>가이드라인</Tag>), width: '25%' },
        { dataIndex: 'title', key: 'title', title: '제목', width: '50%' },
        { dataIndex: 'publishAt', key: 'publishAt', title: '게시일', render: (value: number): string => transformToDate(value), width: '25%', sortDirections: ['descend'], sorter: ((a: any, b: any): number => a.publishAt - b.publishAt) },
      ]} dataSource={templates ? templates : []} loading={isLoading} onSelect={onSelect} />
    </>
  );
}

const TemplateDetail: React.FC<any> = ({ template, onInit, onSelect }): JSX.Element => {
  // 액세스 토큰
  const accessToken: string|undefined = useRecoilValue(accessTokenSelector);

  // Form
  const [form] = Form.useForm();
  // 생성 여부
  const isCreate: boolean = useMemo(() => template.id === 'new' ? true : false, [template]);
  // 편집 가능 상태
  const [edit, setEdit] = useState<boolean>(isCreate ? true : false);
  // 카테고리 옵션
  const options: any[] = useMemo(() => [
    { label: '기본템플릿', value: 'default' },
    { label: '템플릿', value: 'template' },
    { label: '가이드라인', value: 'guide' }
  ], []);

  /** [Event handler] 편집 취소 */
  const onCancel = useCallback(() => {
    // 데이터 재설정
    form.setFieldsValue({ ...template, publishAt: template.publishAt ? transformToMoment(template.publishAt) : undefined });
    // 상태 변경
    setEdit(false);
  }, [form, template]);
  /** [Event handler] 생성 */
  const onCreate = useCallback(async () => {
    // 파일 업로드 여부 확인
    if (emptyFiles(form)) {
      return warningNotification('업로드할 자료를 선택해주세요');
    }

    console.log(form.getFieldsValue());
    // // API 호출
    // const response = await createTemplate({ ...form.getFieldsValue(), publishAt: form.getFieldValue('publishAt').unix() });
    // // 결과 처리
    // if (response) {
    //   successNotification('추가 완료', '템플릿을 추가하였습니다.');
    //   // 뉴스 선택 초기화
    //   onInit();
    // } else {
    //   errorNotification('추가 실패', '템플릿을 추가하는 과정에서 문제가 발생하였습니다.');
    // }
  }, [form, onInit]);
  /** [Event handler] 삭제 */
  const onDelete = useCallback(async () => {
    // API 호출
    const response = await deleteTemplate(form.getFieldValue('id'));
    // 결과 처리
    if (response) {
      successNotification('삭제 완료', '템플릿을 삭제하였습니다.');
      // 뉴스 선택 초기화
      onInit();
    } else {
      errorNotification('삭제 실패', '템플릿을 삭제하는 과정에서 문제가 발생하였습니다.');
    }
  }, [form, onInit]);
  /** [Event handler] 편집 */
  const onEdit = useCallback(() => {
    setEdit(true);
  }, []);
  /** [Event handler] 저장 */
  const onSave = useCallback(async () => {
    if (emptyFiles(form)) {
      return warningNotification('업로드할 자료를 선택해주세요');
    }

    console.log({ ...form.getFieldsValue(), publishAt: form.getFieldValue('publishAt').unix() });
    // // API 호출
    // const response = await updateTemplate(form.getFieldValue('id'), { ...form.getFieldsValue(), publishAt: form.getFieldValue('publishAt').unix() });
    // // 결과 처리
    // if (response) {
    //   successNotification('수정 완료', '템플릿을 수정하였습니다.');
    //   // 데이터 수정
    //   onSelect(form.getFieldsValue());
    //   // 편집 상태 변경
    //   setEdit(false);
    // } else {
    //   errorNotification('수정 실패', '템플릿을 수정하는 과정에서 문제가 발생하였습니다.');
    // }
  }, [form, onSelect]);
  // 데이터 설정
  useEffect(() => form.setFieldsValue({ ...template, publishAt: template.publishAt ? transformToMoment(template.publishAt) : undefined }), [template]);

  // 업로드 속성
  const props: UploadProps = useMemo(() => ({
    maxCount: 1,
    name: 'file',
    multiple: false,
    onChange(info) {
      if (info.file.status === 'done') {
        info.fileList.length === 0 ? form.setFieldsValue({ ...form, file: undefined }) : form.setFieldsValue({ ...form, file: info.file.originFileObj });
      }
    }
  }), [form]);

  // 컴포넌트 반환
  return (
    <StyledDetail>
      <PageHeader isBack onEvent={onInit} title={template.id === 'new' ? '자료 추가' : '자료 편집'} />
      <Form form={form} onFinish={isCreate ? onCreate : onSave }>
        <Form.Item hidden name='id'>
          <Input disabled value={template.id} />
        </Form.Item>
        <Descriptions bordered column={1} labelStyle={{ width: 160 }}>
          <Descriptions.Item label='카테고리'>
            <Form.Item name='category' rules={[{ required: true, message: '카테고리를 선택해주세요' }]}>
              {edit ? (<Select options={options} placeholder='카테고리를 선택해주세요' />) : (<>{template.category}</>)}
            </Form.Item>
          </Descriptions.Item>
          <Descriptions.Item label='제목'>
            <Form.Item name='title' rules={[{ required: true, message: '자료에 대한 제목을 해주세요' }]}>
              {edit ? (<Input allowClear autoComplete='off' placeholder='제목을 입력해주세요' />) : (<>{template.title}</>)}
            </Form.Item>
          </Descriptions.Item>
          <Descriptions.Item label='파일업로드'>
            <Form.Item name='file'>
              {edit ? (
                <Upload.Dragger {...props}>
                  <p className="ant-upload-drag-icon">
                    <IoCloudUploadOutline />
                  </p>
                  <p className="ant-upload-text">업로드할 자료를 드래그 또는 선택해주세요</p>
                </Upload.Dragger>
              ) : template.url ? (<a href={template.url}>{template.fileName}</a>) : (<></>)}
            </Form.Item>
          </Descriptions.Item>
          <Descriptions.Item label='게시일'>
            <Form.Item name='publishAt' rules={[{ required: true, message: '자료에 대한 게시일을 선택해주세요' }]}>
              {edit ? (<DatePicker placeholder='게시일을 선택해주세요' />) : (<>{template.publishAt ? transformToDate(template.publishAt) : undefined}</>)}
            </Form.Item>
          </Descriptions.Item>
          <Descriptions.Item label='출처(작성자)'>
            <Form.Item name='source' rules={[{ required: true, message: '자료에 대한 출처를 입력해주세요' }]}>
              {edit ? (<Input placeholder='출처를 입력해주세요' />) : (<>{template.source}</>)}
            </Form.Item>
          </Descriptions.Item>
        </Descriptions>
        <div className='footer'>
          <div>
            {!isCreate && !edit ? (
              <Button danger onClick={onDelete}>삭제</Button>
            ) : (<></>)}
          </div>
          {isCreate ? (
            <div>
              <Button type='default' onClick={onInit}>취소</Button>
              <Button htmlType='submit' type='primary'>등록</Button>
            </div>
          ) : edit ? (
            <div>
              <Button type='default' onClick={onCancel}>취소</Button>
              <Button htmlType='submit' type='primary'>저장</Button>
            </div>
          ) : (
            <div>
              <Button onClick={onEdit} type='primary'>수정</Button>
            </div>
          )}
        </div>
      </Form>
    </StyledDetail>
  );
}

/**
 * [Internal Function] 업로드 파일이 있는지 확인
 * @param form 폼 객체
 * @returns 파일 확인 결과
 */
const emptyFiles = (form: FormInstance<any>): boolean => {
  // file 속성 확인
  const file: any = form.getFieldValue('file');
  // 확인 결과
  return file === undefined ? true : false;
}

export default TemplateManagement;