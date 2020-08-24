import React from "react";
import Pokedex from "./Pokedex";
import Pokemon from "./Pokemon";
import { Route, Switch, BrowserRouter as Router} from "react-router-dom";


const App = () => (
  <Router>
    <Switch>
    <Route exact path="/" render={(props) => <Pokedex {...props} />} />
    <Route
      exact
      path="/:pokemonId"
      render={(props) => <Pokemon {...props} />}
    />
    </Switch>

  </Router>
  
);

export default App;
