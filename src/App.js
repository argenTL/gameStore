import React from "react";
import {Switch, Route} from "react-router-dom";
import HomePage from './pages/home-page/home-page';
import GamePage from "./pages/game-page/game-page";
import OrderPage from "./pages/order-page/order-page";
import HistoryPage from "./pages/history-page/history-page";
import Header from './components/header/header';

function App() {
  return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={() => <HomePage />} />
          <Route path="/app/:title" component={() => <GamePage />} />
          <Route path="/order" component={() => <OrderPage />} />
          <Route path="/history" component={() => <HistoryPage />} />
        </Switch>
      </div>
  );
}

export default App;
