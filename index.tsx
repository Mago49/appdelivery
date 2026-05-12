import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home"; // Página já existente (exemplo)
import InventoryControl from "./pages/InventoryControl"; // Página a ser criada

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} /> {/* Página inicial */}
        <Route path="/inventory" component={InventoryControl} /> {/* Nova rota */}
      </Switch>
    </Router>
  );
};

export default App;