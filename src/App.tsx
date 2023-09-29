import "index.css";
import "./App.scss";
import Sidemenu from "components/Sidemenu";
import AppContextProvider, { useAppContext } from "context/AppContext";
import Main from "components/Main";

function App() {

  return (
      <div className="App">
        <AppContextProvider>
          <Sidemenu />
          <Main />
        </AppContextProvider>
      </div>
  );
}

export default App;
