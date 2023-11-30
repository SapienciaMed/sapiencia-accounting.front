import { memo } from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "../../common/components/Guard/auth-private-guard";
import ConsultAccountStatement from "./pages/ConsultAccountStatement";
import CreateAccountStatement from "./pages/CreateAccountStatement";
import DetailAccountStatement from "./pages/DetailAccountStatement";
import EditAccountStatement from "./pages/EditAccountStatement";
import EditTracingAccountStatement from "./pages/EditTracingAccountStatement";
import TracingAccountStatement from "./pages/TracingAccountStatement";

const AccountStatementRoutes = () => (
  <Routes>
    <Route
      path="/crear"
      element={
        <PrivateRoute
          element={<CreateAccountStatement />}
          allowedAction="CUENTA_COBRO_CREAR"
        />
      }
    />
    <Route
      path="/consultar"
      element={
        <PrivateRoute
          element={<ConsultAccountStatement />}
          allowedAction="CUENTA_COBRO_CONSULTAR"
        />
      }
    />
    <Route
      path="/detalle/:id"
      element={
        <PrivateRoute
          element={<DetailAccountStatement />}
          allowedAction="CUENTA_COBRO_DETALLE"
        />
      }
    />
    <Route
      path="/editar/:id"
      element={
        <PrivateRoute
          element={<EditAccountStatement />}
          allowedAction="CUENTA_COBRO_EDITAR"
        />
      }
    />
    <Route
      path="/seguimiento"
      element={
        <PrivateRoute
          element={<TracingAccountStatement />}
          allowedAction="SEGUIMIENTO_CUENTA_COBRO_CONSULTAR"
        />
      }
    />
    <Route
      path="/seguimiento/:accountNum"
      element={<EditTracingAccountStatement />}
    />
  </Routes>
);

export default memo(AccountStatementRoutes);
