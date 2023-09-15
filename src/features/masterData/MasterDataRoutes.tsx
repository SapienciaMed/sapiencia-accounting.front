import { memo } from "react";
import { Route, Routes } from "react-router-dom";
import ManageCompanyNameMain from "./pages/ManageCompanyNameMain";
import CreateManageCompanyName from "./pages/CreateManageCompanyName";

const MasterDataRoutes = () => {
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
      <Route path="/razon-social" element={<ManageCompanyNameMain />} />
      <Route path="/razon-social/crear" element={<CreateManageCompanyName />} />
    </Routes>
  );
};

export default memo(MasterDataRoutes);
