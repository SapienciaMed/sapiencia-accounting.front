import { memo } from "react";
import { Route, Routes } from "react-router-dom";
import CreateManageCompanyName from "./pages/businnesPages/CreateManageCompanyName";
import ConsultBusiness from "./pages/businnesPages/ConsultBusiness";
import DetailBusiness from "./pages/businnesPages/EditBusiness";
import ConsultManageContract from "./pages/manageContractPages/ConsultManageContract";
import CreateManageContract from "./pages/manageContractPages/CreateManageContract";
import DetailContract from "./pages/manageContractPages/EditContract";
import PrivateRoute from "../../common/components/Guard/auth-private-guard";

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
      <Route
        path="/razon-social"
        element={
          <PrivateRoute
            element={<ConsultBusiness />}
            allowedAction="RAZON_SOCIAL_CONSULTAR"
          />
        }
      />
      <Route
        path="/razon-social/crear"
        element={
          <PrivateRoute
            element={<CreateManageCompanyName />}
            allowedAction="RAZON_SOCIAL_CREAR"
          />
        }
      />
      <Route
        path="/razon-social/editar/:id"
        element={
          <PrivateRoute
            element={<DetailBusiness />}
            allowedAction="RAZON_SOCIAL_EDITAR"
          />
        }
      />

      <Route
        path="/contrato"
        element={
          <PrivateRoute
            element={<ConsultManageContract />}
            allowedAction="CONTRATO_CONSULTAR"
          />
        }
      />
      <Route
        path="/contrato/crear"
        element={
          <PrivateRoute
            element={<CreateManageContract />}
            allowedAction="CONTRATO_CREAR"
          />
        }
      />

      <Route
        path="/contrato/editar/:id"
        element={
          <PrivateRoute
            element={<DetailContract />}
            allowedAction="CONTRATO_EDITAR"
          />
        }
      />
    </Routes>
  );
};

export default memo(MasterDataRoutes);
