import { memo } from "react";
import { Route, Routes } from "react-router-dom";
import CreateManageCompanyName from "./pages/CreateManageCompanyName";
import ConsultBusiness from "./pages/ConsultBusiness";
import DetailBusiness from "./pages/EditBusiness";

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
      {/* <Route path="/razon-social" element={<ConsultBusiness />} /> */}

      <Route path="/razon-social" element={<ConsultBusiness />} />
      <Route path="/razon-social/crear" element={<CreateManageCompanyName />} />
      <Route path="/razon-social/editar/:id" element={<DetailBusiness />} />
    </Routes>
  );
};

export default memo(MasterDataRoutes);
