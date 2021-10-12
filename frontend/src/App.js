import { createContext, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';

// Font
import './contents/fonts/AppleSDGothicNeo.css';
import './contents/fonts/Montserrat.css'

// Router
import LoginRouter from './router/LoginRouter';
import WrongAccess from './router/WrongAccess';
import HelpRouter from './router/HelpRouter';
import HomeRouter from './router/HomeRouter';
import InitRouter from './router/InitRouter';
import MainBlankRouter from './router/MainBlankRouter';

// Context
export const ServerContext = createContext(null);
export const UserContext = createContext(null);
const __server = 'http://localhost:3003';

function App() {
  const [user, __setUser] = useState(() => JSON.parse(sessionStorage.getItem("authSizelity")));
  function setUser(data) {
    sessionStorage.setItem("authSizelity",JSON.stringify(data));
    __setUser(data);
  }
  
  return (
    <UserContext.Provider value={{user, setUser}}>
      <ServerContext.Provider value={__server}>
        <Switch>
          <Route path={["/home", "/product", "/account", "/request", "/event", "/advertisement", "/connect"]} component={HomeRouter} />
          <Route exact path="/wrong" component={WrongAccess} />
          <Route exact path="/help" component={HelpRouter} />
          <Route exact path="/init" component={InitRouter} />
          <Route exact path="/:id" component={LoginRouter} />
          <Route exact path="/" component={MainBlankRouter} />
        </Switch>
      </ServerContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
