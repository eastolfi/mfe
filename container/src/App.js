import React, { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import { useAuth0 } from '@auth0/auth0-react';

import MicroFrontend from './MicroFrontend';

import "./App.css";

const defaultHistory = createBrowserHistory();

const {
  REACT_APP_DOGS_HOST: dogsHost,
  REACT_APP_CATS_HOST: catsHost,
  REACT_APP_PRUEBAS_HOST: pruebasHost,
} = process.env;

function Header() {
  return (
    <div className="banner">
      <h1 className="banner-title">&#128571; Cats and Dogs &#128021;</h1>
      <h4>Random pics of cats and dogs</h4>
    </div>
  );
}

function Dogs({ history }) {
  return <MicroFrontend history={history} host={dogsHost} name="Dogs" />;
}

function Cats({ history }) {
  return <MicroFrontend history={history} host={catsHost} name="Cats" />;
}

function Pruebas({ history }) {
  return <MicroFrontend history={history} host={pruebasHost} name="Pruebas" />;
}

function GreetingCat({ history }) {
  return (
    <div>
      <Header />
      <div className="home">
        <MicroFrontend history={history} host={catsHost} name="Cats" />
      </div>
    </div>
  );
}

function Home({ history }) {
  const [input, setInput] = useState("");

  const handleOnClick = () => {
    history.push(`/cat/${input}`);
  };

  return (
    <div>
      <Header />
      <div className="home">
        <input
          placeholder="Insert a greeting"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleOnClick}>Greet Me</button>
      </div>

      <div className="home">
        <div className="content">
          <div className="cat">
            <Cats/>
          </div>
          <div className="dog">
            <Dogs/>
          </div>

          <hr />

          <Pruebas />
        </div>
      </div>
    </div>
  );
}

function App({ history = defaultHistory }) {
  const { loginWithPopup, logout, isAuthenticated } = useAuth0();

  const authButton = !isAuthenticated ? (
    <button onClick={() => loginWithPopup({ screen_hint: "signup" })}>Log In</button>
  ) : (
    <button onClick={() => logout({ returnTo: window.location.origin })}>Log Out</button>
  );
  
  return (
    <BrowserRouter>
      <React.Fragment>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/cat/:greeting" component={GreetingCat} />
        </Switch>
      </React.Fragment>

      { authButton }
    </BrowserRouter>
  );
}

export default App;
