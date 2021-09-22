import React from 'react';
import PropTypes from 'prop-types';
import { Nav } from 'react-bootstrap';

import { Catagories } from '../shared/constants/Catagories';

import CatagoryItem from './CatagoryItem';

function CatagoryMenu({ selected, onCatagoryClick }) {
  return (
    <Nav variant="pills" defaultActiveKey="/home" className="mb-4">
      {Catagories.map((catagory, index) => (
        <CatagoryItem key={catagory.id} catagory={catagory} selected={selected} onCatagoryClick={onCatagoryClick} />
      ))}
    </Nav>
  );
}

CatagoryItem.propTypes = {
  selected: PropTypes.string.isRequired,
  onCatagoryClick: PropTypes.func.isRequired,
};

export default React.memo(CatagoryMenu);
