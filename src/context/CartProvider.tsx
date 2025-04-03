import { createContext, useContext, useState } from 'react';
import { MenuItemProps } from '../constants/types';

type CartContextState = {
    cartItems: MenuItemProps[],
    addItem: (item: MenuItemProps) => void,
    getCartTotal: () => number,
    getCartIds: () => string[],
    clearCart: () => void,
};

const contextDefaultValues: CartContextState = {
    cartItems: [],
    addItem: () => {},
    getCartTotal: () => 0,
    getCartIds: () => [],
    clearCart: () => {},
};

export const CartContext = createContext<CartContextState>(contextDefaultValues);

export const useCartContext = () => useContext(CartContext);

const CartProvider: React.FC = ({ children }) => {
    const [cartItems, setCartItems] = useState<MenuItemProps[]>(contextDefaultValues.cartItems);

    function addItem(item: MenuItemProps) {
        let cart = cartItems ?? [];
        if (!cart.includes(item)) {
            setCartItems([...cart, item]);
        }
    }

    function getCartTotal(): number {
        let total = 0;
        cartItems.forEach((item) => {
            total += item.price;
        });

        return total;
    }

    function getCartIds(): string[] {
        return cartItems.map(i => i.id);
    }

    function clearCart() {
        setCartItems([]);
    }

    return (
        <CartContext.Provider value={{
            cartItems,
            addItem,
            getCartTotal,
            getCartIds,
            clearCart,
        }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
