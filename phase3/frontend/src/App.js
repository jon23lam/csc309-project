import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Login } from "./pages/public/Login";
import { SearchPage } from "./pages/petseeker/SearchPage";

import "./App.scss";
import { AuthenticationProvider } from "./providers/AuthenticationProvider";
import RootProvider from "./providers/RootProvider";
import AppProvider from "./providers/AppProvider";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthenticationProvider>
          <AppProvider>
            <RootProvider>
              <Routes>
                <Route path="/login" element={<Login />} />
              </Routes>
              <Routes>
                <Route path="/search" element={<SearchPage />} />
              </Routes>
            </RootProvider>
          </AppProvider>
        </AuthenticationProvider>
      </Router>
    </div>
  );
}

export default App;
