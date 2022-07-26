import dynamic from 'next/dynamic';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useMemo, useState } from 'react';
// Company
import { Button, DatePicker, Descriptions, Form, Input, Select, Table, Upload } from 'antd';
import { PageHeader, TableFormHeader } from '@/components/Header';
import { StyledDetail } from '@/components/styles/Detail';
// Icon
const IoCloudUploadOutline = dynamic(() => import('react-icons/io5').then((mod: any): any => mod.IoCloudUploadOutline));
// Query
import { createTemplate, deleteTemplate, getTemplates, updateTemplate } from '@/models/apis/template';
// Query key
import { KEY_NEWS } from '@/models/type';
// Type
import type { UploadProps } from 'antd';
// Util
import { transformToDate, transformToMoment } from 'utils/util';
import { errorNotification, successNotification } from 'utils/notification';


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
      <TableFormHeader title='템플릿·참고자료 메뉴 관리' tools={tools} />
      <Table columns={[
        { dataIndex: 'category', key: 'category', title: '카테고리' },
        { dataIndex: 'title', key: 'title', title: '제목' },
        { dataIndex: 'publishAt', key: 'publishAt', title: '게시일', render: (value: number): string => transformToDate(value) },
      ]} dataSource={templates ? templates : []} loading={isLoading} onRow={(record: any) => ({ onClick: (): void => onSelect(record) })} />
    </>
  );
}

const TemplateDetail: React.FC<any> = ({ template, onInit, onSelect }): JSX.Element => {
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
    { label: '참고자료', value: 'references' }
  ], []);

  /** [Event handler] 편집 취소 */
  const onCancel = useCallback(() => setEdit(false), []);
  /** [Event handler] 생성 */
  const onCreate = useCallback(async () => {
    // API 호출
    const response = await createTemplate({ ...form.getFieldsValue(), publishAt: form.getFieldValue('publishAt').unix() });
    // 결과 처리
    if (response) {
      successNotification('추가 완료', '템플릿을 추가하였습니다.');
      // 뉴스 선택 초기화
      onInit();
    } else {
      errorNotification('추가 실패', '템플릿을 추가하는 과정에서 문제가 발생하였습니다.');
    }
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
    // API 호출
    const response = await updateTemplate(form.getFieldValue('id'), { ...form.getFieldsValue(), publishAt: form.getFieldValue('publishAt').unix() });
    // 결과 처리
    if (response) {
      successNotification('수정 완료', '템플릿을 수정하였습니다.');
      // 데이터 수정
      onSelect(form.getFieldsValue());
      // 편집 상태 변경
      setEdit(false);
    } else {
      errorNotification('수정 실패', '템플릿을 수정하는 과정에서 문제가 발생하였습니다.');
    }
  }, [form, isCreate, onSelect]);
  // 데이터 설정
  useEffect(() => form.setFieldsValue({ ...template, publishAt: template.publishAt ? transformToMoment(template.publishAt) : undefined }), [template]);

  // 업로드 속성
  const props: UploadProps = useMemo(() => ({
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        console.info(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        console.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  }), []);

  // 컴포넌트 반환
  return (
    <StyledDetail>
      <PageHeader isBack onEvent={onInit} title={template.id === 'new' ? '자료 추가' : '자료 편집'} />
      <Form form={form} onFinish={isCreate ? onCreate : onSave }>
        <Form.Item hidden name='id'>{template.id}</Form.Item>
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
            <Form.Item name='url'>
              {edit ? (
                <Upload.Dragger { ...props }>
                  <p className="ant-upload-drag-icon">
                    <IoCloudUploadOutline />
                  </p>
                  <p className="ant-upload-text">Click or drag file to this area to upload</p>
                </Upload.Dragger>
              ) : (<>{template.url}</>)}
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

export default TemplateManagement;