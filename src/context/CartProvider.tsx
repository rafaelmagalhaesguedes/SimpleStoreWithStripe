import { useState } from 'react';
import { CartContext } from './CartContext';
import { ProductType } from '../types/ProductType';
import { getProductData } from '../utils/productStore';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartProducts, setCartProducts] = useState<ProductType[]>([]);

  const getProductQuantity = (id: string) => {
    const product = cartProducts.find(product => product.id === id);
    return product?.quantity || 0;
  };

  const addOneToCart = (id: string) => {
    const product = getProductData(id);
    if (!product) return;

    const productIndex = cartProducts.findIndex(product => product.id === id);
    
    if (productIndex === -1) {
      setCartProducts([...cartProducts, { ...product, quantity: 1 }]);
    } else {
      const updatedCartProducts = [...cartProducts];
      updatedCartProducts[productIndex].quantity = updatedCartProducts[productIndex].quantity! + 1;
      setCartProducts(updatedCartProducts);
    }
  };

  const removeOneFromCart = (id: string) => {
    const productIndex = cartProducts.findIndex(product => product.id === id);
    
    if (productIndex === -1) return;

    const updatedCartProducts = [...cartProducts];
    updatedCartProducts[productIndex].quantity = updatedCartProducts[productIndex].quantity! - 1;
    if (updatedCartProducts[productIndex].quantity === 0) {
      updatedCartProducts.splice(productIndex, 1);
    }
    setCartProducts(updatedCartProducts);
  };

  const deleteFromCart = (id: string) => {
    const updatedCartProducts = cartProducts.filter(product => product.id !== id);
    setCartProducts(updatedCartProducts);
  };

  const getTotalCost = () => {
    return cartProducts.reduce((total, product) => {
      return total + (product.price * product.quantity!);
    }, 0);
  };

  const contextValue = {
    items: cartProducts,
    getProductQuantity,
    addOneToCart,
    removeOneFromCart,
    deleteFromCart,
    getTotalCost
  }

  return (
    <CartContext.Provider value={ contextValue }>
      { children }
    </CartContext.Provider>
  );
}

export default CartProvider;
