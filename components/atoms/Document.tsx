import { useQuery } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { useCallback, useEffect, useMemo, useState } from 'react';
// Component
import { TableCard, UploadCard } from '@/components/atoms/Card';
import { PageHeader } from '@/components/atoms/Header';
import { Button, DatePicker, Descriptions, Form, Input, Popconfirm, Select, Table, Tag, Upload } from 'antd';
// Icon
const IoCloudUploadOutline = dynamic(() => import('react-icons/io5').then((mod: any): any => mod.IoCloudUploadOutline));
// Query
import { createDocument, deleteDocument, getDocuments, updateDocument } from '@/models/apis/document';
// Query key
import { KEY_DOCUMENTS } from '@/models/type';
// Type
import type { FormInstance, UploadProps } from 'antd';
// Util
import { transformToDate, transformToMoment } from 'utils/util';
import { errorNotification, successNotification, warningNotification } from 'utils/notification';

export const Documents: React.FC<any> = ({ onSelect }): JSX.Element => {
  // 뉴스 목록 조회
  const { isLoading, data: newsList } = useQuery([KEY_DOCUMENTS], async () => await getDocuments());

  /** [Event hander] 행 선택 */
  const onRow = useCallback((record: any) => ({
    onClick: () => onSelect(record)
  }), [onSelect]);

  // 생성 버튼을 포함한 Card extra
  const extra: JSX.Element = useMemo(() => (<Button type='primary' onClick={() => onSelect({ id: 'new' })}>추가</Button>), [onSelect]);
  // 컴포넌트 반환
  return (
    <TableCard extra={extra} title='뉴스 목록' >
      <Table columns={[
        { dataIndex: 'category', key: 'category', title: '카테고리', filters: [{ text: '기본 템플릿', value: 'default' }, { text: '템플릿', value: 'template' }, { text: '가이드라인', value: 'guideline' }], onFilter: (value: any, record: any): boolean => record.category === value, render: (value: string): JSX.Element => value === 'default' ? (<Tag color='geekblue'>기본 템플릿</Tag>) : value === 'template' ? (<Tag color='geekblue'>템플릿</Tag>) : (<Tag color='geekblue'>가이드라인</Tag>), width: '25%' },
        { dataIndex: 'title', key: 'title', title: '뉴스 제목', width: '50%' },
        { dataIndex: 'publishAt', key: 'publishAt', title: '게시일자', render: (value: number): string => transformToDate(value), sortDirections: ['descend'], sorter: ((a: any, b: any): number => b.publishAt - a.publishAt), width: '25%' },
      ]} dataSource={newsList ? newsList : []} loading={isLoading} onRow={onRow} showSorterTooltip={false} />
    </TableCard>
  );
}

export const Document: React.FC<any> = ({ document, onClear, onSelect }): JSX.Element => {
  // 폼 객체
  const [form] = Form.useForm();
  // 자료 생성 여부
  const isCreate: boolean = useMemo(() => document.id === 'new' ? true : false, [document]);
  // 편집 상태
  const [edit, setEdit] = useState<boolean>(isCreate ? true : false);
  // 폼 제목
  const [title, setTitle] = useState<string>('자료 편집');
  // 카테고리 옵션
  const options: any[] = useMemo(() => [
    { label: '기본템플릿', value: 'default' },
    { label: '템플릿', value: 'template' },
    { label: '가이드라인', value: 'guideline' }
  ], []);

  // 편집 상태 확인 (Render 시점)
  useEffect(() => isCreate ? setEdit(true) : undefined, [isCreate]);
  // 데이터 설정
  useEffect(() => {
    // 데이터 설정
    form.setFieldsValue({ ...document, regAt: document.publicAt ? transformToMoment(document.publicAt) : undefined });
    // 폼 제목 설정
    document.id === 'new' ? setTitle('자료 생성') : setTitle('자료 편집');
  }, [document]);

  /** [Event handler] 편집 취소 */
  const onCancel = useCallback(() => {
    // 데이터 재설정
    form.setFieldsValue({ ...document, publishAt: document.publishAt ? transformToMoment(document.publishAt) : undefined });
    // 상태 변경
    setEdit(false);
  }, [form, document]);
  /** [Event handler] 생성 */
  const onCreate = useCallback(async () => {
    // 파일 업로드 여부 확인
    if (emptyFiles(form)) {
      return warningNotification('업로드할 자료를 선택해주세요');
    }
    // 폼 데이터 생성
    const formData: FormData = new FormData();
    // 데이터 설정
    formData.append('category', form.getFieldValue('category'));
    formData.append('title', form.getFieldValue('title'));
    formData.append('source', form.getFieldValue('source'));
    formData.append('publishAt', form.getFieldValue('publishAt').unix());
    formData.append('filename', form.getFieldValue('file').file.name);
    formData.append('templateFile', form.getFieldValue('file').file);
    // API 호출
    const response = await createDocument(formData);
    // 결과 처리
    if (response) {
      successNotification('추가 완료', '자료를 추가하였습니다.');
      // 뉴스 선택 초기화
      onClear();
    } else {
      errorNotification('추가 실패', '자료를 추가하는 과정에서 문제가 발생하였습니다.');
    }
  }, [form, onClear]);
  /** [Event handler] 삭제 */
  const onDelete = useCallback(async () => {
    // API 호출
    const response = await deleteDocument(form.getFieldValue('id'));
    // 결과 처리
    if (response) {
      successNotification('삭제 완료', '템플릿을 삭제하였습니다.');
      // 뉴스 선택 초기화
      onClear();
    } else {
      errorNotification('삭제 실패', '템플릿을 삭제하는 과정에서 문제가 발생하였습니다.');
    }
  }, [form, onClear]);
  /** [Event handler] 편집 */
  const onEdit = useCallback(() => {
    setEdit(true);
  }, []);
  /** [Event handler] 저장 */
  const onSave = useCallback(async () => {
    if (emptyFiles(form)) {
      return warningNotification('업로드할 자료를 선택해주세요');
    }
    // 폼 데이터 생성
    const formData: FormData = new FormData();
    // 데이터 설정
    formData.append('category', form.getFieldValue('category'));
    formData.append('title', form.getFieldValue('title'));
    formData.append('source', form.getFieldValue('source'));
    formData.append('publishAt', form.getFieldValue('publishAt').unix());
    formData.append('filename', form.getFieldValue('file').file.name);
    formData.append('templateFile', form.getFieldValue('file').file);
    // API 호출
    const response = await updateDocument(form.getFieldValue('id'), formData);
    // 결과 처리
    if (response.result) {
      successNotification('수정 완료', '템플릿을 수정하였습니다.');
      // 데이터 수정
      onSelect({ ...form.getFieldsValue(), filename: form.getFieldValue('file').file.name, url: response.data.url, file: undefined });
      // 편집 상태 변경
      setEdit(false);
    } else {
      errorNotification('수정 실패', '템플릿을 수정하는 과정에서 문제가 발생하였습니다.');
    }
  }, [form, onSelect]);
  // 데이터 설정
  useEffect(() => form.setFieldsValue({ ...document, publishAt: document.publishAt ? transformToMoment(document.publishAt) : undefined }), [document]);

  // 업로드 속성
  const props: UploadProps = useMemo(() => ({
    beforeUpload: () => false,
    maxCount: 1,
    name: 'file',
    multiple: false,
    onChange(info) {
      if (info.file.status === 'done') {
        info.fileList.length === 0 ? form.setFieldsValue({ ...form, file: undefined }) : form.setFieldsValue({ ...form, file: info.file.originFileObj });
      }
    }
  }), [form]);
  // 기본 업로드된 파일
  const defaultFileList: any = useMemo(() => document.url ? [{ uid: '1', name: document.filename, status: 'done', url: document.url }] : undefined, [document]);

  // 컴포넌트 반환
  return (
    <>
      <PageHeader ghost onBack={onClear} title={title} />
      <UploadCard>
        <Form form={form} onFinish={isCreate ? onCreate : onSave } acceptCharset='UTF-8'>
          <Form.Item hidden name='id'>
            <Input disabled value={document.id} />
          </Form.Item>
          <Descriptions bordered column={1} labelStyle={{ width: 160 }}>
            <Descriptions.Item label='카테고리'>
              <Form.Item name='category' rules={[{ required: true, message: '카테고리를 선택해주세요' }]}>
                {edit ? (<Select options={options} placeholder='카테고리를 선택해주세요' />) : (<>{document.category === 'default' ? '기본 템플릿' : document.category === 'template' ? '템플릿' : '가이드라인'}</>)}
              </Form.Item>
            </Descriptions.Item>
            <Descriptions.Item label='제목'>
              <Form.Item name='title' rules={[{ required: true, message: '자료에 대한 제목을 해주세요' }]}>
                {edit ? (<Input allowClear autoComplete='off' placeholder='제목을 입력해주세요' />) : (<>{document.title}</>)}
              </Form.Item>
            </Descriptions.Item>
            <Descriptions.Item label='파일업로드'>
              <Form.Item name='file'>
                {edit ? (
                  <Upload.Dragger {...props} defaultFileList={defaultFileList}>
                    <p className="ant-upload-drag-icon">
                      <IoCloudUploadOutline />
                    </p>
                    <p className="ant-upload-text">업로드할 자료를 드래그 또는 선택해주세요</p>
                  </Upload.Dragger>
                ) : document.url ? (<a href={document.url}>{document.filename}</a>) : (<></>)}
              </Form.Item>
            </Descriptions.Item>
            <Descriptions.Item label='게시일'>
              <Form.Item name='publishAt' rules={[{ required: true, message: '자료에 대한 게시일을 선택해주세요' }]}>
                {edit ? (<DatePicker placeholder='게시일을 선택해주세요' />) : (<>{document.publishAt ? transformToDate(document.publishAt) : undefined}</>)}
              </Form.Item>
            </Descriptions.Item>
            <Descriptions.Item label='출처(작성자)'>
              <Form.Item name='source' rules={[{ required: true, message: '자료에 대한 출처를 입력해주세요' }]}>
                {edit ? (<Input placeholder='출처를 입력해주세요' />) : (<>{document.source}</>)}
              </Form.Item>
            </Descriptions.Item>
          </Descriptions>
          <div className='footer'>
            <div>
              {!isCreate && !edit ? (
                <Popconfirm cancelText='아니오' onConfirm={onDelete} okText='예' title='해당 자료를 삭제하시겠습니까?'>
                  <Button danger>삭제</Button>
                </Popconfirm>
              ) : (<></>)}
            </div>
            {isCreate ? (
              <div>
                <Button type='default' onClick={onClear}>취소</Button>
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
      </UploadCard>
    </>
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