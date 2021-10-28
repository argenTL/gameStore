import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteItemFromCart, setItemInCart } from '../../redux/cart/reducer';
import Button from '../button/button';
import './game-buy.css';

const GameBuy = ({ game }) => {
    const dispatch = useDispatch();
    const items = useSelector(state => state.cart.itemsInCart);

    localStorage.setItem("status_cart", JSON.stringify(items));
    const itemsLocal = JSON.parse(localStorage.getItem("status_cart"));
    const isItemsInCart = itemsLocal.some(item => item.id === game.id);


    const handleClick = (e) => {
        e.stopPropagation();
        if (isItemsInCart) {
            dispatch(deleteItemFromCart(game.id))
        } else {
            dispatch(setItemInCart(game));
        }
    };

    return (
        <div className="game-buy">
            <span className="game-buy__price">{game.price} сом </span>
            <Button
                type={isItemsInCart ? "secondary" : "primary"}
                onClick={handleClick}
            >
                {isItemsInCart ? "Убрать из корзины" : "В Корзину"}
            </Button>
        </div>
    )
};

export default GameBuy