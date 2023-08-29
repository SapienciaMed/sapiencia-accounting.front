import "primereact/resources/primereact.min.css";
import { Suspense, lazy, memo, useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ApplicationProvider from "./application-provider";
import ModalMessageComponent from "./common/components/modal-message.component";
import { AppContextProvider } from "./common/contexts/app.context";
import useAppCominicator from "./common/hooks/app-communicator.hook";
import "./styles/_app.scss";

function App() {
  const { publish } = useAppCominicator();
  const HomePage = lazy(() => import("./common/components/home.page"));
  const AccountStatementRoutes = lazy(
    () => import("./features/accountStatement/accountStatementRoutes")
  );
  // Effect que comunica la aplicación actual
  useEffect(() => {
    localStorage.setItem("currentAplication", process.env.aplicationId);
    setTimeout(
      () => publish("currentAplication", process.env.aplicationId),
      500
    );
  }, []);
  return (
    <AppContextProvider>
      <ModalMessageComponent />
      <ApplicationProvider>
        <Router>
          <Suspense fallback={<p>Loading...</p>}>
            <Routes>
              <Route path="/contabilidad" element={<HomePage />} />
              <Route
                path="/contabilidad/cuenta-de-cobro/*"
                element={<AccountStatementRoutes />}
              />
            </Routes>
          </Suspense>
        </Router>
      </ApplicationProvider>
    </AppContextProvider>
  );
}

export default memo(App);
