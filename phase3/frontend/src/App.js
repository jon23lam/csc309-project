import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Login } from "./pages/public/Login";
import { SearchPage } from "./pages/petseeker/Search/SearchPage";
import { AuthenticatedRoute } from "./routes/AuthenticatedRoute";
import { AuthenticationProvider } from "./providers/AuthenticationProvider";
import RootProvider from "./providers/RootProvider";
import AppProvider from "./providers/AppProvider";
import { Application } from "./pages/petseeker/Application/Application";
import { PetListingEditor } from "./pages/shelter/PetListingEditor";

import "./App.scss";
import { PetDetailPage } from "./pages/petseeker/Detail/PetDetail/PetDetailPage";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthenticationProvider>
          <AppProvider>
            <RootProvider>
              <Routes>
                <Route path="/login" element={<Login />} />

                {/* Put all routes that need authentication in here */}
                <Route path="/" element={<AuthenticatedRoute />}>
                  <Route path="/search" element={<SearchPage />} />
                  <Route path="/application/:id/" element={<Application />} />
                  <Route path="/createlisting" element={<PetListingEditor />} />
                  <Route
                    path="/editlisting/:id/"
                    element={<PetListingEditor />}
                  />
                  <Route path="/petdetail/:id/" element={<PetDetailPage />} />
                </Route>
              </Routes>
            </RootProvider>
          </AppProvider>
        </AuthenticationProvider>
      </Router>
    </div>
  );
}

export default App;
