import { createContext, useContext } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ContextPath from "./context";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";




function Router() {
  const path = useContext<string>(ContextPath);
  return (
    <BrowserRouter>
      <Switch>
        <Route path={`/${path}/:coinId`}>
          <Coin />
        </Route>
        <Route path={`/${path}`}>
          <Coins contextPath={path} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
export default Router;
