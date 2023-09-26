import { memo } from "react";
import { Route, Routes } from "react-router-dom";
import CreateManageCompanyName from "./pages/businnesPages/CreateManageCompanyName";
import ConsultBusiness from "./pages/businnesPages/ConsultBusiness";
import DetailBusiness from "./pages/businnesPages/EditBusiness";
import ConsultManageContract from "./pages/manageContractPages/ConsultManageContract";
import CreateManageContract from "./pages/manageContractPages/CreateManageContract";
import DetailContract from "./pages/manageContractPages/EditContract";

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
      <Route path="/razon-social" element={<ConsultBusiness />} />
      <Route path="/razon-social/crear" element={<CreateManageCompanyName />} />
      <Route path="/razon-social/editar/:id" element={<DetailBusiness />} />
      <Route path="/contrato" element={<ConsultManageContract />} />
      <Route path="/contrato/crear" element={<CreateManageContract />} />

      <Route path="/contrato/editar/:id" element={<DetailContract />} />
    </Routes>
  );
};

export default memo(MasterDataRoutes);
