import { createContext, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import dotenv from 'dotenv';

// Font
import './contents/fonts/AppleSDGothicNeo.css';
import './contents/fonts/Montserrat.css'

// Router
import LoginRouter from './router/LoginRouter';
import WrongAccess from './router/WrongAccess';
import HomeRouter from './router/HomeRouter';
import InitRouter from './router/InitRouter';


// Context
export const ServerContext = createContext(null);
export const UserContext = createContext(null);

dotenv.config();

const __server = process.env.REACT_APP_SERVER_URL;

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
          <Route path={["/home", "/service","/product", "/account", "/request", "/event", "/connect"]} component={HomeRouter} />
          <Route exact path="/wrong" component={WrongAccess} />
          <Route exact path="/init" component={InitRouter} />
          <Route exact path={["/:id", "/"]} component={LoginRouter} />
        </Switch>
      </ServerContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
