import { Routes, Route } from "react-router";
import { AuthProvider } from "./hooks/use-auth";
import { ProtectedRouteAdmin } from "./components/layout-admin/ProtectedRoute";
import { ProtectedRoutePartner } from "./components/layout-partner/ProtectedRoute";
import { ProtectedRouteCandidate } from "./components/layout-candidate/ProtectedRoute";
import Login from "./pages/Login";
import LayoutAdmin from "./components/layout-admin/layout";
import LayoutPatner from "./components/layout-partner/layout";
import HomeAdmin from "./pages/admin/Home";
import Home from "./pages/patner/Home";

import Partners from "./pages/admin/Patners";
import CreatePartner from "./pages/admin/CreatePatner";
import PartnerDetail from "./pages/admin/PatnerDetail";
import EditPartner from "./pages/admin/EditPatner";
import CreateLevel from "./pages/admin/CreateLevel";
import Projects from "./pages/patner/projects/Projects";
import ProjectCreate from "./pages/patner/projects/ProjectCreate";
import ProjectDetail from "./pages/patner/projects/ProjectDetail";
import ProjectEdit from "./pages/patner/projects/ProjectEdit";
import Candidates from "./pages/patner/candidates/Candidates";
import CandidateDetail from "./pages/patner/candidates/CandidateDetail";
import CandidateEdit from "./pages/patner/candidates/CandidateEdit";
import LayoutCandidate from "./components/layout-candidate/layout";
import HomeCandidate from "./pages/candidate/Home";
import Psikotest from "./pages/candidate/Psikotest";
// import SettingsCandidate from "./pages/candidate/Settings";
import Reports from "./pages/patner/candidates/Reports";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Login />} path="login" />

        <Route
          path="/admin"
          element={
            <ProtectedRouteAdmin>
              <LayoutAdmin />
            </ProtectedRouteAdmin>
          }
        >
          <Route
            index
            element={
              <ProtectedRouteAdmin>
                <HomeAdmin />
              </ProtectedRouteAdmin>
            }
          />
          <Route
            path="partners/create"
            element={
              <ProtectedRouteAdmin>
                <CreatePartner />
              </ProtectedRouteAdmin>
            }
          />
          <Route
            path="partners"
            element={
              <ProtectedRouteAdmin>
                <Partners />
              </ProtectedRouteAdmin>
            }
          />
          <Route
            path="partners/:id"
            element={
              <ProtectedRouteAdmin>
                <PartnerDetail />
              </ProtectedRouteAdmin>
            }
          />
          <Route
            path="partners/:id/edit"
            element={
              <ProtectedRouteAdmin>
                <EditPartner />
              </ProtectedRouteAdmin>
            }
          />
          <Route
            path="level/create"
            element={
              <ProtectedRouteAdmin>
                <CreateLevel />
              </ProtectedRouteAdmin>
            }
          />
        </Route>

        <Route
          path="/"
          element={
            <ProtectedRoutePartner>
              <LayoutPatner />
            </ProtectedRoutePartner>
          }
        >
          <Route
            index
            element={
              <ProtectedRoutePartner>
                <Home />
              </ProtectedRoutePartner>
            }
          />
          <Route
            path="projects"
            element={
              <ProtectedRoutePartner>
                <Projects />
              </ProtectedRoutePartner>
            }
          />
          <Route
            path="projects/create"
            element={
              <ProtectedRoutePartner>
                <ProjectCreate />
              </ProtectedRoutePartner>
            }
          />
          <Route
            path="projects/:id"
            element={
              <ProtectedRoutePartner>
                <ProjectDetail />
              </ProtectedRoutePartner>
            }
          />
          <Route
            path="projects/:id/edit"
            element={
              <ProtectedRoutePartner>
                <ProjectEdit />
              </ProtectedRoutePartner>
            }
          />

          <Route
            path="candidates"
            element={
              <ProtectedRoutePartner>
                <Candidates />
              </ProtectedRoutePartner>
            }
          />
          <Route
            path="candidates/:id"
            element={
              <ProtectedRoutePartner>
                <CandidateDetail />
              </ProtectedRoutePartner>
            }
          />
          <Route
            path="candidates/:id/edit"
            element={
              <ProtectedRoutePartner>
                <CandidateEdit />
              </ProtectedRoutePartner>
            }
          />
          <Route
            path="candidates/:id/reports"
            element={
              <ProtectedRoutePartner>
                <Reports />
              </ProtectedRoutePartner>
            }
          />
        </Route>

        <Route
          path="/psikotest"
          element={
            <ProtectedRouteCandidate>
              <LayoutCandidate />
            </ProtectedRouteCandidate>
          }
        >
          <Route
            index
            element={
              <ProtectedRouteCandidate>
                <HomeCandidate />
              </ProtectedRouteCandidate>
            }
          />
          <Route
            path=":name"
            element={
              <ProtectedRouteCandidate>
                <Psikotest />
              </ProtectedRouteCandidate>
            }
          />
          {/* <Route
            path="settings"
            element={
              <ProtectedRouteCandidate>
                <SettingsCandidate />
              </ProtectedRouteCandidate>
            }
          /> */}
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
