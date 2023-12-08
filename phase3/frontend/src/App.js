import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Login } from "./pages/public/Login/Login";
import { NotFound } from "./pages/public/NotFound/NotFound";
import { SearchPage } from "./pages/petseeker/Search/SearchPage";
import { AuthenticatedRoute } from "./routes/AuthenticatedRoute";
import { AuthenticationProvider } from "./providers/AuthenticationProvider";
import RootProvider from "./providers/RootProvider";
import AppProvider from "./providers/AppProvider";
import { AdoptionForm } from "./pages/petseeker/AdoptionForm/AdoptionForm";
import { PetListingEditor } from "./pages/shelter/PetListingEditor";
import { StrayAnimalPage } from "./pages/common/StrayAnimal/StrayAnimalPage";
import { ShelterRoute } from "./routes/ShelterRoute";
import { SeekerRoute } from "./routes/SeekerRoute";
import { ShelterManagement } from "./pages/shelter/ShelterManagement/ShelterManagement";
import { HeaderRoute } from "./routes/HeaderRoute";
import { ApplicationsPage } from "./pages/shelter/Applications/ApplicationsPage";
import { CommentsPage } from "./pages/shelter/Comments/CommentsPage";

import "./App.scss";
import { PetDetailPage } from "./pages/petseeker/Detail/PetDetail/PetDetailPage";
import { ShelterDetail } from "./pages/common/ShelterDetail/ShelterDetail";

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

                {/* Put all routes that need authentication in here */}
                <Route path="/" element={<AuthenticatedRoute />}>
                  <Route path="" element={<HeaderRoute />}>
                    <Route path="" element={<ShelterRoute />}>
                      <Route
                        path="/manage_shelter"
                        element={<ShelterManagement />}
                      />
                      <Route
                        path="/createlisting"
                        element={<PetListingEditor />}
                      />
                      <Route
                        path="/editlisting/:id/"
                        element={<PetListingEditor />}
                      />
                    </Route>

                    <Route path="" element={<SeekerRoute />}>
                      <Route path="/search/list/" element={<SearchPage />} />
                    </Route>

                    <Route
                      path="/adoptionForm/:id/"
                      element={<AdoptionForm />}
                    />
                    <Route path="/petdetail/:id/" element={<PetDetailPage />} />
                    <Route
                      path="/applications"
                      element={<ApplicationsPage />}
                    />
                    <Route
                      path="/applications/:applicationId/messages/"
                      element={<CommentsPage />}
                    />
                    <Route
                      path="/stray_animal_locator"
                      element={<StrayAnimalPage />}
                    />
                    <Route
                      path="/shelterDetail/:id/"
                      element={<ShelterDetail />}
                    />
                  </Route>
                </Route>

                <Route path="*" exact={true} element={<NotFound />} />
              </Routes>
            </RootProvider>
          </AppProvider>
        </AuthenticationProvider>
      </Router>
    </div>
  );
}

export default App;
