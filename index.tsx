const App = () => {
  return (
    <Router>
      <Switch>
        {/* Rota inicial do sistema */}
        <Route exact path="/" component={Home} />

        {/* Nova página - Controle de Estoque */}
        <Route path="/inventory" component={InventoryControl} />
      </Switch>
    </Router>
  );
};

export default App;