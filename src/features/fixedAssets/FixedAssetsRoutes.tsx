import { memo } from "react";
import { Route, Routes } from "react-router-dom";
import ConsultProperty from "./pages/propertyPages/ConsultProperty";
import CreateProperty from "./pages/propertyPages/CreateProperty";
import DetailProperty from "./pages/propertyPages/DetailProperty";
import EditProperty from "./pages/propertyPages/EditProperty";
import PrivateRoute from "../../common/components/Guard/auth-private-guard";

const FixedAssetsRoutes = () => {
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
            element={<ConsultProperty />}
            allowedAction="BIEN_MUEBLE_CONSULTAR"
          />
        }
      />
      <Route
        path="/crear"
        element={
          <PrivateRoute
            element={<CreateProperty />}
            allowedAction="BIEN_MUEBLE_CREAR"
          />
        }
      />
      <Route
        path="/detalle/:id"
        element={
          <PrivateRoute
            element={<DetailProperty />}
            allowedAction="BIEN_MUEBLE_DETALLE"
          />
        }
      />
      <Route
        path="/editar/:id"
        element={
          <PrivateRoute
            element={<EditProperty />}
            allowedAction="BIEN_MUEBLE_EDITAR"
          />
        }
      />
    </Routes>
  );
};

export default memo(FixedAssetsRoutes);
