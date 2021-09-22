/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Alert, Spinner } from 'react-bootstrap';

import { useProduct } from '../shared/contexts/ProductContext';
import RenderList from './RenderList';

import CatagoryMenu from './CatagoryMenu';

export default function List() {
  const { products, error, getProducts, selectedCatagory, setSelectedCatagory, loading } = useProduct();

  const handleCategoryClick = React.useCallback(
    (catagoryId) => {
      setSelectedCatagory(catagoryId);
    },
    [setSelectedCatagory]
  );

  React.useEffect(() => {
    getProducts(selectedCatagory);
  }, [selectedCatagory]);

  return (
    <>
      <h2 className="text-center mb-4">Products</h2>
      <CatagoryMenu selected={selectedCatagory} onCatagoryClick={handleCategoryClick} />
      {error && <Alert variant="danger">{error}</Alert>}
      {loading ? <Spinner animation="border" variant="primary" /> : <RenderList products={products} />}
    </>
  );
}
