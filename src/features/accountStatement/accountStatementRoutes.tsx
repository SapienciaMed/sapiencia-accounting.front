import { lazy, memo } from "react";
import { Route, Routes } from "react-router-dom";

const AccountStatementRoutes = () => {
  const CreateAccountStatement = lazy(
    () => import("./pages/CreateAccountStatement")
  );
  const ConsultAccountStatement = lazy(
    () => import("./pages/ConsultAccountStatement")
  );
  const DetailAccountStatement = lazy(
    () => import("./pages/DetailAccountStatement")
  );
  const EditAccountStatement = lazy(
    () => import("./pages/EditAccountStatement")
  );
  return (
    <Routes>
      <Route path="/crear" element={<CreateAccountStatement />} />
      <Route path="/consultar" element={<ConsultAccountStatement />} />
      <Route path="/detalle/:id" element={<DetailAccountStatement />} />
      <Route path="/editar/:id" element={<EditAccountStatement />} />
    </Routes>
  );
};

export default memo(AccountStatementRoutes);
