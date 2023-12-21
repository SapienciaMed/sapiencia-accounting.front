import { memo } from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "../../common/components/Guard/auth-private-guard";
import InventoryControlTech from "./pages/InventoryControlTech";
import InventoryControlFurniture from "./pages/InventoryControlFurniture";
import HistoryInventoryTech from "./pages/HistoryInventoryTech";
import HistoryInventoryFurniture from "./pages/HistoryInventoryFurniture";

const InventoryControlRoutes = () => {
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
        path="/activos-tecnologicos"
        element={
          <PrivateRoute
            element={<InventoryControlTech />}
            allowedAction="ACTIVO_FIJO_INVENTARIO"
          />
        }
      />
      <Route
        path="/activos-tecnologicos/inventario-tecnologico"
        element={
          <PrivateRoute
            element={<HistoryInventoryTech />}
            allowedAction="ACTIVO_FIJO_INVENTARIO"
          />
        }
      />
      <Route
        path="/bienes-muebles"
        element={
          <PrivateRoute
            element={<InventoryControlFurniture />}
            allowedAction="BIEN_MUEBLE_INVENTARIO"
          />
        }
      />
      <Route
        path="/activos-bien-mueble/inventario-bien-mueble"
        element={
          <PrivateRoute
            element={<HistoryInventoryFurniture />}
            allowedAction="BIEN_MUEBLE_INVENTARIO"
          />
        }
      />
    </Routes>
  );
};

export default memo(InventoryControlRoutes);
