import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { BiCartAlt } from 'react-icons/bi';
import { useHistory } from 'react-router';
import CartMenu from '../cart-menu/cart-menu';
import { calcTotalPrice } from '../untils';
import ItemsInCart from '../items-in-cart/items-in-cart';
import './cart-block.css';

const CartBlock = () => {
    const [isCartMenuVisible, setIsCartMenuVisible] = useState(false);
    const items = useSelector((state) => state.cart.itemsInCart);
    const totalPrice = calcTotalPrice(items);
    const history = useHistory();

    const handleClick = useCallback(() => {
        setIsCartMenuVisible(false);
        history.push('/order');
    }, [history]);

    return (
        <div className="cart-block">
            <ItemsInCart quantity={items.length} />
            <BiCartAlt
                size={25}
                className="cart-block__icon"
                onClick={() => setIsCartMenuVisible(!isCartMenuVisible)}
            />
            {totalPrice > 0 ?
                <span className="cart-block__total-price"> {totalPrice} сом.</span>
                : null}
            {isCartMenuVisible && <CartMenu items={items} onClick={handleClick} />}
        </div>
    )
};

export default CartBlock