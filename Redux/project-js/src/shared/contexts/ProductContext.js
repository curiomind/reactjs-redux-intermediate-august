/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { addDoc, getDoc, getDocs, collection, query, where, doc, updateDoc, increment } from 'firebase/firestore';

import { db } from '../services/firebase';

import { Catagories } from '../constants/Catagories';

const ProductContext = React.createContext();

export function useProduct() {
  return React.useContext(ProductContext);
}

export function ProductProvider({ children }) {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const [selectedCatagory, setSelectedCatagory] = React.useState('grocery');
  const [products, setProducts] = React.useState([]);
  const [product, setProduct] = React.useState({});
  const [numberOfProducts, setNumberProducts] = React.useState(0);
  const [numberOfCategories, setNumberOfCategories] = React.useState(0);
  const [tolalProductQuantity, setTolalProductQuantity] = React.useState(0);
  const [tolalProductValue, setTolalProductValue] = React.useState(0);

  const { user, isManager } = useSelector((state) => state.auth);

  function getCatagoryName(id) {
    const catagoryName = Catagories.find((catagory) => catagory.id === id);

    return catagoryName ? catagoryName.name : '';
  }

  function getProducts(catagoryId) {
    setLoading(true);
    if (user && catagoryId) {
      getDocs(query(collection(db, 'products'), where('catagory', '==', catagoryId)))
        .then((docSnap) => {
          const list = [];
          docSnap.forEach((docSnapItem) => {
            list.push({ ...docSnapItem.data(), catagory: getCatagoryName(catagoryId), id: docSnapItem.id });
          });
          setProducts(list);
          setLoading(false);
        })
        .catch((err) => {
          setError(`Code: ${err.code} | Message: ${err.message}`);
          setProducts([]);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }

  function getProduct(id) {
    setLoading(true);
    if (user) {
      getDoc(doc(db, 'products', id))
        .then((docSnap) => {
          setProduct({ ...docSnap.data(), id: docSnap.id });
          setLoading(false);
        })
        .catch((err) => {
          setError(`Code: ${err.code} | Message: ${err.message}`);
          setProduct({});
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }

  function addProduct(name, description, price, catagory, quantity) {
    return new Promise((resolve) => {
      setLoading(true);
      if (user && isManager) {
        addDoc(collection(db, 'products'), { name, description, price: parseInt(price), catagory, quantity: parseInt(quantity) })
          .then(() => {
            const newPriceValue = price * quantity;
            updateDoc(doc(db, 'count', 'oQupygrUx7gILuECGxo6'), {
              product: increment(1),
              quantity: increment(quantity),
              value: increment(newPriceValue),
              [catagory]: increment(1),
            })
              .then(() => {
                setNumberProducts(numberOfProducts + 1);
                setNumberOfCategories(numberOfCategories + 1);
                setTolalProductQuantity(tolalProductQuantity + quantity);
                setTolalProductValue(tolalProductValue + newPriceValue);
                setLoading(false);
                resolve(true);
              })
              .catch((errr) => {
                setError(`Code: ${errr.code} | Message: ${errr.message}`);
                setLoading(false);
                resolve(false);
              });
          })
          .catch((err) => {
            setError(`Code: ${err.code} | Message: ${err.message}`);
            setLoading(false);
            resolve(false);
          });
      } else {
        setError('Managers can only add products');
        setLoading(false);
        resolve(false);
      }
    });
  }

  React.useEffect(() => {
    setLoading(true);
    if (user) {
      getDoc(doc(db, 'count', 'oQupygrUx7gILuECGxo6'))
        .then((docSnap) => {
          const count = docSnap.data();
          console.log(docSnap.data());
          setNumberProducts(count.product);
          setTolalProductQuantity(count.quantity);
          setTolalProductValue(count.value);

          let catagoryCount = 0;
          for (const catagory in count) {
            switch (catagory) {
              case 'appliances':
                catagoryCount += count[catagory] > 0 ? 1 : 0;
                break;
              case 'electronics':
                catagoryCount += count[catagory] > 0 ? 1 : 0;
                break;
              case 'fashion':
                catagoryCount += count[catagory] > 0 ? 1 : 0;
                break;
              case 'grocery':
                catagoryCount += count[catagory] > 0 ? 1 : 0;
                break;
              case 'mobiles':
                catagoryCount += count[catagory] > 0 ? 1 : 0;
                break;
              default:
                catagoryCount += 0;
            }
          }
          setNumberOfCategories(catagoryCount);
          setLoading(false);
        })
        .catch((err) => {
          setError(`Code: ${err.code} | Message: ${err.message}`);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const value = {
    products,
    product,
    numberOfProducts,
    numberOfCategories,
    tolalProductQuantity,
    tolalProductValue,
    error,
    loading,
    getProducts,
    getProduct,
    addProduct,
    selectedCatagory,
    setSelectedCatagory,
  };

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
}

ProductProvider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element.isRequired),
};
