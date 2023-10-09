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
    <Route path="/consultar" element={<ConsultAccountStatement />} />
    <Route path="/detalle/:id" element={<DetailAccountStatement />} />
    <Route path="/editar/:id" element={<EditAccountStatement />} />
    <Route path="/seguimiento" element={<TracingAccountStatement />} />
    <Route
      path="/seguimiento/:accountNum"
      element={<EditTracingAccountStatement />}
    />
  </Routes>
);

export default memo(AccountStatementRoutes);
