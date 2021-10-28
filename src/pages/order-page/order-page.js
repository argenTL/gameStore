import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router';
import {fetchGamesDataBasket} from "../../redux/order/reducer";
import {addGamesInData} from "../../redux/cart/reducer";
import { calcTotalPrice } from '../../components/untils';
import OrderItem from '../../components/order-item/order-item';
import Button from "../../components/button/button";
import './order-page.css';

const OrderPage = () => {
    const items = useSelector(state => state.cart.itemsInCart);

    const history = useHistory();
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(fetchGamesDataBasket());
        history.push('/history');
    };

    const addData = () => {
        // items.map(game => dispatch(addGamesInData(game)));
        dispatch(addGamesInData(items))
    };

    if (items.length < 1) {
        return (
            <div className="order-page">
                <div className="order-page__left">
                    <h1>Ваша корзина пуста</h1>
                </div>
                <div className="order-page__right">
                    <div className="order-page__total-price">
                        <Button
                            type="primary"
                            size="m"
                            onClick={handleClick}
                        >
                            История заказов
                        </Button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="order-page">
            <div className="order-page__left">
                {items.map(game => <OrderItem game={game} key={game.id} />)}
            </div>
            <div className="order-page__right">
                <div className="order-page__total-price">
                    <span>
                        {items.length} товаров на сумму {calcTotalPrice(items)} сом.
                    </span>
                    <Button
                        type="primary"
                        size="m"
                        onClick={addData}
                    >
                        "Заказать"
                    </Button>
                    <Button
                        type="primary"
                        size="m"
                        onClick={handleClick}
                    >
                        История заказов
                    </Button>
                </div>
            </div>
        </div>
    )
};

export default OrderPage
