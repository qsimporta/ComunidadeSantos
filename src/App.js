import React from 'react';
import './App.css';
import Store from "./redux/store";
import {Provider} from "react-redux";
import {HashRouter, Route} from 'react-router-dom'
import IntroductionPage from "./pages/IntroductionPage";
import RegisterPage from "./pages/RegisterPage";
import AccountPage from "./pages/AccountPage";

function App() {
  return (
      <Provider store={Store}>
        <HashRouter>
            <Route path={'/'} component={IntroductionPage} exact={true} />
            <Route path={'/register'} component={RegisterPage} />
            <Route path={'/account'} component={AccountPage} />
        </HashRouter>
      </Provider>
  );
}

export default App;
