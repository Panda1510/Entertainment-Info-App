import { Container } from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import SimpleBottomNavigation from "./components/MainNav";
import Trending from "./Pages/Trending";
import Movies from "./Pages/Movies";
import Series from "./Pages/Series";
import Search from "./Pages/Search";

function App() {
  return (
    <BrowserRouter>
      {/* header component */}
      <Header />

      {/* main middle content */}

      <div className="app">
        {/* The container adapts according to the screen size */}
        <Container>
          <Switch>
            <Route path="/" component={Trending} exact />
            <Route path="/movies" component={Movies} />
            <Route path="/series" component={Series} />
            <Route path="/search" component={Search} />
          </Switch>
        </Container>
      </div>

      {/* the bottom navigation bar */}
      <SimpleBottomNavigation />
    </BrowserRouter>
  );
}

export default App;
