import "primereact/resources/primereact.min.css";
import { Suspense, memo, useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ApplicationProvider from "./application-provider";
import HomePage from "./common/components/home.page";
import ModalMessageComponent from "./common/components/modal-message.component";
import { AppContextProvider } from "./common/contexts/app.context";
import useAppCominicator from "./common/hooks/app-communicator.hook";
import AccountStatementRoutes from "./features/accountStatement/accountStatementRoutes";
import "./styles/_app.scss";

function App() {
  const { publish } = useAppCominicator();
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
