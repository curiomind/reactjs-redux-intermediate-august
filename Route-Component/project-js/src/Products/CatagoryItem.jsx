import React from 'react';

import PropTypes from 'prop-types';

import { Nav } from 'react-bootstrap';

function CatagoryItem({ catagory, selected, onCatagoryClick }) {
  const handleCatagoryClick = React.useCallback(
    (e) => {
      e.preventDefault();
      onCatagoryClick(catagory.id);
    },
    [onCatagoryClick, catagory]
  );

  return (
    <Nav.Item>
      <Nav.Link active={selected === catagory.id} as="button" onClick={handleCatagoryClick}>
        {catagory.name}
      </Nav.Link>
    </Nav.Item>
  );
}

CatagoryItem.propTypes = {
  catagory: PropTypes.exact({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
  selected: PropTypes.string.isRequired,
  onCatagoryClick: PropTypes.func.isRequired,
};

export default React.memo(CatagoryItem);
