import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Login } from "./pages/public/Login";
import { SearchPage } from "./pages/petseeker/Search/SearchPage";
import { AuthenticatedRoute } from "./routes/AuthenticatedRoute";
import { AuthenticationProvider } from "./providers/AuthenticationProvider";
import RootProvider from "./providers/RootProvider";
import AppProvider from "./providers/AppProvider";
import { AdoptionForm } from "./pages/petseeker/AdoptionForm/AdoptionForm";
import { PetListingEditor } from "./pages/shelter/PetListingEditor";
import { ShelterManagement } from "./pages/shelter/ShelterManagement/ShelterManagement";
import { HeaderRoute } from "./routes/HeaderRoute";
import { ApplicationsPage } from "./pages/shelter/Applications/ApplicationsPage";

import "./App.scss";

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
                  <Route path="" element={<HeaderRoute />}>
                    <Route path="/search" element={<SearchPage />} />
                    <Route
                      path="/manage_shelter"
                      element={<ShelterManagement />}
                    />
                    <Route path="/adoption-form" element={<AdoptionForm />} />
                    <Route
                      path="/createlisting"
                      element={<PetListingEditor />}
                    />
                    <Route
                      path="/editlisting/:id/"
                      element={<PetListingEditor />}
                    />
                    <Route
                      path="/applications"
                      element={<ApplicationsPage />}
                    />
                  </Route>
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
