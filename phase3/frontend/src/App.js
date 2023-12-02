import React from "react";
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
import { CommentsPage } from "./pages/shelter/Comments/CommentsPage";

import "./App.scss";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthenticationProvider>
          <AppProvider>
            <RootProvider>
              <Routes>
                {/* Public route */}
                <Route path="/login" element={<Login />} />

                {/* Authenticated routes */}
                <Route path="/" element={<AuthenticatedRoute />}>
                  {/* HeaderRoute includes routes with headers */}
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

                    {/* Nested route for application messages */}
                    <Route
                      path="/applications/:applicationId/messages/"
                      element={<CommentsPage />}
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
