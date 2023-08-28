import { memo } from "react";
import { Route, Routes } from "react-router-dom";
import { CreateAccountStatement } from "./pages/CreateAccountStatement";

const AccountStatementRoutes = () => {
  return (
    <Routes>
      <Route path="/crear" element={<CreateAccountStatement />} />
    </Routes>
  );
};

export default memo(AccountStatementRoutes);
