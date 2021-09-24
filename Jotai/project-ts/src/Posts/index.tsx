/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useAtom } from 'jotai';
import { Container, Row, Col, Spinner, Pagination } from 'react-bootstrap';
import { getPostAtom, loadingAtom, pageCountAtom, increaseOffsetAtom, decreaseOffsetAtom } from '../store';
import Post from './Post';

export default function Posts(): JSX.Element {
  const [, increaseOffset] = useAtom(increaseOffsetAtom);
  const [, decreaseOffset] = useAtom(decreaseOffsetAtom);
  const [posts, getPosts] = useAtom(getPostAtom);
  const [loading] = useAtom(loadingAtom);
  const [pageCount] = useAtom(pageCountAtom);
  const [activePage, setActivePage] = React.useState(1);
  const paginationItems = [];

  function onPagination(e: React.MouseEvent<HTMLSpanElement>) {
    const nextPage = parseInt((e.target as HTMLSpanElement).innerHTML);
    setActivePage(nextPage);

    if (activePage < nextPage) {
      increaseOffset();
    } else {
      decreaseOffset();
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
    getPosts();
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
