import React, { Fragment, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { getUser } from "./actions/user";
import { register } from "./actions/auth";
import { createPosition } from "./actions/positions";
import { getCurrenciesNames } from "./actions/aux";
import { getLatestCryptoPrice } from "./actions/currencies";

import Navbar from "./components/navbar/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

import PositionInput from "./components/input/PositionInput";

import Position from "./components/portfolio/Position";
import PositionChart from "./components/portfolio/PositionChart";

import CurrencyTotalChart from "./components/portfolio/CurrencyTotalChart";
import TotalChart from "./components/portfolio/TotalChart";

import Alert from "./components/layout/Alert";

import "./App.css";
import { login, logout } from "./actions/auth";

const App = () => {
  const [user, setUser] = useState({});

  const [logedin, setLogedin] = useState(false);

  const [alert, setAlert] = useState({});

  const [cryptoCurrencies, setCryptoCurrencies] = useState({});

  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    async function updateState() {
      if (logedin) {
        const currencyNames = getCurrenciesNames(user);

        const crypto = await getLatestCryptoPrice(currencyNames);

        setCryptoCurrencies(crypto);
      }
    }
    updateState();
  }, [logedin]);

  const signin = async (email, password) => {
    const returnValue = await login(email, password);
    if (returnValue instanceof Error) {
      setAlert({
        message: returnValue.response.data.errors.msg,
        type: "danger",
      });
      setTimeout(() => setAlert({}), 5000);
    } else {
      loadUser();
    }
  };

  const signout = () => {
    logout();
    setUser({});
    setLogedin(false);
  };

  const signup = async (email, password, password2) => {
    if (password !== password2) {
      setAlert({ message: "Passwords do not match", type: "danger" });
    } else {
      const returnValue = await register({ email, password });
      if (returnValue instanceof Error) {
        setAlert({
          message: returnValue.response.data.errors.msg,
          type: "danger",
        });
        setTimeout(() => setAlert({}), 5000);
      } else {
        loadUser();
      }
    }
  };

  const makePosition = async (formData) => {
    const returnValue = await createPosition(formData);
    if (returnValue instanceof Error) {
      setAlert({
        message: returnValue.response.data.errors.msg,
        type: "danger",
      });
      setTimeout(() => setAlert({}), 5000);
    } else {
      setAlert({
        message: "Position added",
        type: "success",
      });
      setTimeout(() => setAlert({}), 5000);
    }
  };

  const loadUser = async () => {
    if (localStorage.crypto_token) {
      const returnValue = await getUser();
      if (returnValue instanceof Error) {
        setAlert({
          message: returnValue.response.data.errors.msg,
          type: "danger",
        });
        setTimeout(() => setAlert({}), 5000);
      } else {
        setUser(returnValue);
        setLogedin(true);
      }
    }
  };

  return (
    <Router>
      <Fragment>
        <Navbar signout={signout} logedin={logedin} />
        <Alert alert={alert} />
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <Landing
                user={user}
                cryptoCurrencies={cryptoCurrencies}
                logedin={logedin}
              />
            )}
          />
          <Route exact path="/position" render={() => <Position />} />
          <Route
            exact
            path="/position_chart"
            render={() => <PositionChart />}
          />
          <Route
            exact
            path="/currency_total_chart"
            render={() => (
              <CurrencyTotalChart
                user={user}
                cryptoCurrencies={cryptoCurrencies}
                logedin={logedin}
              />
            )}
          />
          <Route
            exact
            path="/total_chart"
            render={() => (
              <TotalChart
                user={user}
                cryptoCurrencies={cryptoCurrencies}
                logedin={logedin}
              />
            )}
          />
          <Route
            exact
            path="/login"
            render={() => <Login signin={signin} logedin={logedin} />}
          />
          <Route
            exact
            path="/register"
            render={() => <Register signup={signup} logedin={logedin} />}
          />
          {logedin && (
            <Route
              exact
              path="/input"
              render={() => (
                <PositionInput
                  makePosition={makePosition}
                  loadUser={loadUser}
                />
              )}
            />
          )}
        </Switch>
      </Fragment>
    </Router>
  );
};

export default App;
