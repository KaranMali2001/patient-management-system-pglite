import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { Layout } from "./components/layout/Layout";
import { DatabaseProvider } from "./context/DatabaseContext";
import Home from "./pages/home/Home";
import NotFound from "./pages/notFound/NotFound";
import PatientRegistration from "./pages/registerPatient/PatientRegistration";
import ViewRecord from "./pages/view-records/ViewRecord";

function App() {
  return (
    <DatabaseProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="register-patient" element={<PatientRegistration />} />
            <Route path="/view-records" element={<ViewRecord />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </DatabaseProvider>
  );
}

export default App;
