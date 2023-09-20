import { memo } from "react";
import { Route, Routes } from "react-router-dom";
import ConsultAccountStatement from "./pages/ConsultAccountStatement";
import CreateAccountStatement from "./pages/CreateAccountStatement";
import DetailAccountStatement from "./pages/DetailAccountStatement";
import EditAccountStatement from "./pages/EditAccountStatement";
import EditTracingAccountStatement from "./pages/EditTracingAccountStatement";
import TracingAccountStatement from "./pages/TracingAccountStatement";

const AccountStatementRoutes = () => (
  <Routes>
    <Route path="/crear" element={<CreateAccountStatement />} />
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
