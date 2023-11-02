import { memo } from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "../../common/components/Guard/auth-private-guard";
import ManageTechActivesForm from "./forms/techActiveForm/ManageTechActivesForm";
import ConsultTechActive from "./pages/ConsultTechActive";
import CreateTechActive from "./pages/CreateTechActive";

const TechActivesRoutes = () => {
  // const CreateAccountStatement = lazy(
  //   () => import("./pages/CreateAccountStatement")
  // );
  // const ConsultAccountStatement = lazy(
  //   () => import("./pages/ConsultAccountStatement")
  // );
  // const DetailAccountStatement = lazy(
  //   () => import("./pages/DetailAccountStatement")
  // );
  // const EditAccountStatement = lazy(
  //   () => import("./pages/EditAccountStatement")
  // );
  return (
    <Routes>
      <Route
        path="/consultar"
        element={
          <PrivateRoute
            element={<ConsultTechActive />}
            allowedAction="BIEN_MUEBLE_CONSULTAR"
          />
        }
      />
      <Route
        path="/crear"
        element={
          <PrivateRoute
            element={<CreateTechActive />}
            allowedAction="BIEN_MUEBLE_CREAR"
          />
        }
      />
    </Routes>
  );
};

export default memo(TechActivesRoutes);
