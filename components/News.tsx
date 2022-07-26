import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useMemo, useState } from 'react';
// Company
import { Button, DatePicker, Descriptions, Form, Input, Select, Table } from 'antd';
import { PageHeader, TableFormHeader } from '@/components/Header';
import { StyledDetail } from '@/components/styles/Detail';
// Query
import { createNews, deleteNews, getNews, updateNews } from '@/models/apis/news';
// Query key
import { KEY_NEWS } from '@/models/type';
// Util
import { transformToDate, transformToMoment } from 'utils/util';
import { errorNotification, successNotification } from 'utils/notification';

/** [Component] 뉴스 관리 */
const NewsManagement: React.FC<any> = (): JSX.Element => {
  // 뉴스 ID
  const [news, setNews] = useState<any>({ id: '' });

  /** [Event handler] 뉴스 선택 초기화 */
  const onInit = useCallback(() => setNews({ id: '' }), []);
  /** [Event handler] 뉴스 선택 (생성 포함) */
  const onSelect = useCallback((record: any) => setNews(record), []);

  // 컴포넌트 반환
  return (
    <>
      {news.id === '' ? (
        <NewsList onSelect={onSelect} />
      ) : (
        <NewDetail news={news} onInit={onInit} onSelect={onSelect} />
      )}
    </>
  );
}

/** [Internal Component] 뉴스 목록 */
const NewsList: React.FC<any> = ({ onSelect }): JSX.Element => {
  // 가입된 회사 목록 조회
  const { isLoading, data: news } = useQuery([KEY_NEWS], async () => await getNews());

  // 생성 버튼
  const tools: JSX.Element = useMemo(() => (<Button type='primary' onClick={() => onSelect({ id: 'new' })}>추가</Button>), [onSelect]);
  // 컴포넌트 반환
  return (
    <>
      <TableFormHeader title='뉴스 게시판' tools={tools} />
      <Table columns={[
        { dataIndex: 'category', key: 'category', title: '카테고리' },
        { dataIndex: 'title', key: 'title', title: '뉴스 제목' },
        { dataIndex: 'regAt', key: 'regAt', title: '등록일자', render: (value: number): string => transformToDate(value) },
      ]} dataSource={news ? news : []} loading={isLoading} onRow={(record: any) => ({ onClick: (): void => onSelect(record) })} />
    </>
  );
}

const NewDetail: React.FC<any> = ({ news, onInit, onSelect }): JSX.Element => {
  // Form
  const [form] = Form.useForm();
  // 생성 여부
  const isCreate: boolean = useMemo(() => news.id === 'new' ? true : false, [news]);
  // 편집 가능 상태
  const [edit, setEdit] = useState<boolean>(isCreate ? true : false);
  // 카테고리 옵션
  const options: any[] = useMemo(() => [
    { label: '정부자료', value: '정부자료' },
    { label: '업계동향', value: '업계동향' },
    { label: '정책동향', value: '정책동향' },
    { label: '침해사례', value: '침해사례' }
  ], []);

  /** [Event handler] 편집 취소 */
  const onCancel = useCallback(() => setEdit(false), []);
  /** [Event handler] 생성 */
  const onCreate = useCallback(async () => {
    // API 호출
    const response = await createNews({ ...form.getFieldsValue(), regAt: form.getFieldValue('regAt').unix() });
    // 결과 처리
    if (response) {
      successNotification('추가 완료', '뉴스를 추가하였습니다.');
      // 뉴스 선택 초기화
      onInit();
    } else {
      errorNotification('추가 실패', '뉴스를 추가하는 과정에서 문제가 발생하였습니다.');
    }
  }, [form, onInit]);
  /** [Event handler] 삭제 */
  const onDelete = useCallback(async () => {
    // API 호출
    const response = await deleteNews(form.getFieldValue('id'));
    // 결과 처리
    if (response) {
      successNotification('삭제 완료', '뉴스를 삭제하였습니다.');
      // 뉴스 선택 초기화
      onInit();
    } else {
      errorNotification('삭제 실패', '뉴스를 삭제하는 과정에서 문제가 발생하였습니다.');
    }
  }, [form, onInit]);
  /** [Event handler] 편집 */
  const onEdit = useCallback(() => {
    setEdit(true);
  }, []);
  /** [Event handler] 저장 */
  const onSave = useCallback(async () => {
    // API 호출
    const response = await updateNews(form.getFieldValue('id'), { ...form.getFieldsValue(), regAt: form.getFieldValue('regAt').unix() });
    // 결과 처리
    if (response) {
      successNotification('수정 완료', '뉴스를 수정하였습니다.');
      // 데이터 수정
      onSelect(form.getFieldsValue());
      // 편집 상태 변경
      setEdit(false);
    } else {
      errorNotification('수정 실패', '뉴스를 수정하는 과정에서 문제가 발생하였습니다.');
    }
  }, [form, isCreate, onSelect]);
  // 데이터 설정
  useEffect(() => form.setFieldsValue({ ...news, regAt: news.regAt ? transformToMoment(news.regAt) : undefined }), [news]);

  // 컴포넌트 반환
  return (
    <StyledDetail>
      <PageHeader isBack onEvent={onInit} title={news.id === 'new' ? '뉴스 추가' : '뉴스 편집'} />
      <Form form={form} onFinish={isCreate ? onCreate : onSave }>
        <Form.Item hidden name='id'>{news.id}</Form.Item>
        <Descriptions bordered column={1} labelStyle={{ width: 160 }}>
          <Descriptions.Item label='카테고리'>
            <Form.Item name='category' rules={[{ required: true, message: '카테고리를 선택해주세요' }]}>
              {edit ? (<Select options={options} placeholder='카테고리를 선택해주세요' />) : (<>{news.category}</>)}
            </Form.Item>
          </Descriptions.Item>
          <Descriptions.Item label='뉴스 제목'>
            <Form.Item name='title' rules={[{ required: true, message: '뉴스 제목을 입력해주세요' }]}>
              {edit ? (<Input allowClear autoComplete='off' placeholder='뉴스 제목을 입력해주세요' />) : (<>{news.title}</>)}
            </Form.Item>
          </Descriptions.Item>
          <Descriptions.Item label='URL'>
            <Form.Item name='url' rules={[{ required: true, message: '뉴스 기사에 대한 URL을 입력해주세요' }]}>
              {edit ? (<Input allowClear autoComplete='off' placeholder='URL을 입력해주세요' />) : (<>{news.url}</>)}
            </Form.Item>
          </Descriptions.Item>
          <Descriptions.Item label='등록일'>
            <Form.Item name='regAt' rules={[{ required: true, message: '뉴스 등록일을 선택해주세요' }]}>
              {edit ? (<DatePicker placeholder='등록일을 선택해주세요' />) : (<>{news.regAt ? transformToDate(news.regAt) : undefined}</>)}
            </Form.Item>
          </Descriptions.Item>
          <Descriptions.Item label='출처(작성자)'>
            <Form.Item name='source' rules={[{ required: true, message: '뉴스에 대한 출처를 입력해주세요' }]}>
              {edit ? (<Input allowClear placeholder='출처를 입력해주세요' />) : (<>{news.source}</>)}
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

export default NewsManagement;