import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AiFillCloseCircle} from "react-icons/all";
import {fetchGamesData} from "../../redux/cart/reducer";
import GameItem from '../../components/game-item/game-item';
import './home-page.css';

const HomePage = () => {
    const games = useSelector(state => state.cart.gamesData);

    const dispatch = useDispatch();

    const [searchValue, setSearchValue] = useState('');

    const inputValue = e => {
        setSearchValue(e.target.value);
    };

    const inputValueClear = (e) => {
        e.preventDefault()
        setSearchValue('')
    };

    useEffect(() => {
        dispatch(fetchGamesData())
    }, [dispatch]);

    return (
        <div className="home-page">
            <div className="home-page__search">
                <input type="text" placeholder="Поиск" value={searchValue} onChange={inputValue} />
                <div className="home-page__search-icons" onClick={inputValueClear}>
                    <AiFillCloseCircle size={25} color={'black'}/>
                </div>
            </div>
            <div className="home-page__items">
              {games.filter(el => el.title.toLowerCase().includes(searchValue.toLowerCase())).map(game => <GameItem game={game} key={game.id} />)}
            </div>
        </div>
    )
};

export default HomePage
