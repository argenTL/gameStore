import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {deleteGamesInData} from "../../redux/order/reducer";
import {calcTotalPrice} from "../../components/untils";
import GameCover from "../../components/game-cover/game-cover";
import Button from "../../components/button/button";
import '../order-page/order-page.css';

const HistoryPage = () => {
    const orderItems = useSelector(state => state.order.gamesInCart);
    const dispatch = useDispatch();

    const games = orderItems.map(el => el.orders).reduce((acc, orders) => acc.concat(orders), []);

    if (orderItems.length < 1) {
        return <h1>Ваша история покупок пуста</h1>
    }

    const deleteAll = () => {
        orderItems.map(el => dispatch(deleteGamesInData(el.id)))
    };

    return (
        <div className="order-page">
            <div className="order-page__left">
                {
                    orderItems.map(order => (
                        <>
                            <div className="order-item__time" key={order.id}>
                                <p>{order.time}</p>
                                <div className="order-page__total-price">
                                    <span>
                                        {order.orders.length} товаров на сумму {calcTotalPrice(order.orders)} сом.
                                    </span>
                                </div>
                            </div>
                            {
                                order.orders.map(game => (
                                    <div className="order-item" key={game.id}>
                                        <div className="order-item__cover">
                                            <GameCover image={game.image} />
                                        </div>
                                        <div className="order-item__title">
                                            <span>{game.title}</span>
                                            <p>{game.price} сом. </p>
                                        </div>
                                    </div>
                                ))
                            }
                        </>
                    ))
                }
            </div>
            <div className="order-page__right">
                <div className="order-page__total-price">
                    <span>
                        {games.length} товаров на сумму {calcTotalPrice(games)} сом.
                    </span>
                </div>
                <Button
                    type="primary"
                    size="m"
                    onClick={deleteAll}
                >
                    Очистить историю заказов
                </Button>
            </div>
        </div>
    )

};

export default HistoryPage;