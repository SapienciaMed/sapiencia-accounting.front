import { memo } from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "../../common/components/Guard/auth-private-guard";
import ConsultTechActive from "./pages/ConsultTechActive";
import CreateTechActive from "./pages/CreateTechActive";
import EditTechActive from "./pages/EditTechActive";
import DetailsTechActive from "./pages/DetailsTechActive";

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
            allowedAction="ACTIVO_FIJO_CONSULTAR"
          />
        }
      />
      <Route
        path="/crear"
        element={
          <PrivateRoute
            element={<CreateTechActive />}
            allowedAction="ACTIVO_FIJO_CREAR"
          />
        }
      />
      <Route
        path="/detalle/:id"
        element={
          <PrivateRoute
            element={<DetailsTechActive />}
            allowedAction="ACTIVO_FIJO_DETALLE"
          />
        }
      />
      <Route
        path="/editar/:id"
        element={
          <PrivateRoute
            element={<EditTechActive />}
            allowedAction="ACTIVO_FIJO_EDITAR"
          />
        }
      />
    </Routes>
  );
};

export default memo(TechActivesRoutes);
