/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Spinner, Pagination } from 'react-bootstrap';
import { getPosts, selectPosts, selectPageCount, selectLoading, increaseOffset, decreaseOffset } from '../store/postsSlice';
import Post from './Post';

export default function Posts() {
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);
  const loading = useSelector(selectLoading);
  const pageCount = useSelector(selectPageCount);
  const [activePage, setActivePage] = React.useState(1);
  const paginationItems = [];

  function onPagination(e) {
    const nextPage = parseInt(e.target.innerHTML);
    setActivePage(nextPage);

    if (activePage < nextPage) {
      dispatch(increaseOffset());
    } else {
      dispatch(decreaseOffset());
    }
  }

  for (let number = 1; number <= pageCount; number++) {
    paginationItems.push(
      <Pagination.Item activeLabel="" key={number} active={number === activePage} onClick={onPagination}>
        {number}
      </Pagination.Item>
    );
  }

  React.useEffect(() => {
    dispatch(getPosts());
  }, []);

  if (loading) {
    return <Spinner animation="border" variant="primary" />;
  }

  return (
    <Container className="pt-4">
      <Row>
        {posts.map((post) => (
          <Col key={post.id} xs={6} className="mb-4 d-flex flex-row">
            <Post userId={post.userId} id={post.id} title={post.title} body={post.body} />
          </Col>
        ))}
      </Row>
      <Row className="justify-content-end">
        <Col xs="auto">
          <Pagination>{paginationItems}</Pagination>
        </Col>
      </Row>
    </Container>
  );
}
