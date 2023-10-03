import { memo } from "react";
import { Route, Routes } from "react-router-dom";
import DetailFixedAssets from "./pages/DetailFixedAssets";



const FixedAssetsRoutes =() =>(
<Routes>
    <Route path="/detalle/:id" element ={<DetailFixedAssets/>}/>
</Routes>
);

export default memo(FixedAssetsRoutes);