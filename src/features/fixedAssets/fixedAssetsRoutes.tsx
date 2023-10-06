import { memo } from "react";
import { Route, Routes } from "react-router-dom";
import ConsultProperty from "./pages/propertyPages/ConsultProperty";
import CreateProperty from "./pages/propertyPages/CreateProperty";

const FixedAssetsRoutes = () => {
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
      <Route path="/consultar" element={<ConsultProperty />} />
      <Route path="/crear" element={<CreateProperty />} />
    </Routes>
  );
};

export default memo(FixedAssetsRoutes);
