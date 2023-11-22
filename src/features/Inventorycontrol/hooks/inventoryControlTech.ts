import { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { EResponseCodes } from "../../../common/constants/api.enum";
import { AppContext } from "../../../common/contexts/app.context";
import useCrudService from "../../../common/hooks/crud-service.hook";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import { urlApiAccounting } from "../../../common/utils/base-url";
import { inventoryControlSchema } from "../../../common/schemas/techActives.schemas";
import { IFilterPlate } from "../../../common/interfaces/fixedAssets.interface";
import { useNavigate } from "react-router-dom";

type IPlate = {
  plate: string;
};

export const useInventoryControlTech = () => {
  const { setMessage } = useContext(AppContext);
  const [searchResults, setSearchResults] = useState<IFilterPlate[]>([]);
  //   const { validateActionAccess } = useContext(AppContext);
  const navigate = useNavigate();
  const tableComponentRef = useRef(null);
  const [paginateData, setPaginateData] = useState({ page: "", perPage: "" });
  const [tableView, setTableView] = useState<boolean>(false);
  const { get } = useCrudService(urlApiAccounting);
  const { post } = useCrudService(urlApiAccounting);
  const [formWatch, setFormWatch] = useState<IPlate>({
    plate: "",
  });
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const resolver = useYupValidationResolver(inventoryControlSchema);
  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors, isValid },
  } = useForm({ resolver, mode: "onBlur" });

  const getActiveAssetByPlate = async (plate: string) => {
    const endpoint = `/api/v1/asset/${plate}/get-by-plate`;
    return await get<IFilterPlate>(endpoint);
  };

  const onSubmit = handleSubmit(async (filters: IFilterPlate) => {
    setTableView(true);
    tableComponentRef.current?.loadData({
      ...filters,
      // createdAt: jsDateToISODate(createdAt),
    });

    try {
      const { plate } = filters;
      const resp = await getActiveAssetByPlate(plate);

      if (resp.operation.code === EResponseCodes.FAIL) {
        setMessage({
          title: "Resultado de Búsqueda",
          show: true,
          description: resp.operation.message,
          okTitle: "Aceptar",
          background: true,
          onOk: () => setMessage({ show: false }),
        });
      } else {
        // Add result to array
        setSearchResults((prevResults) => [...prevResults, resp.data]);
      }
    } catch (err) {
      console.log(err);
    }
  });

  const handleSave = async () => {
    try {
      const requestDataid = searchResults.map((result) => result.id);
      const endpoint = "/api/v1/asset-inventory/create";
      const requestData = {
        assetIds: requestDataid,
      };
      const resp = await post(endpoint, requestData);
      setMessage({
        title: "Control de inventario",
        show: true,
        description: "Se creo control de inventario",
        okTitle: "Aceptar",
        background: true,
        onOk: () => setMessage({ show: false }),
      });

      if (resp.operation.code === EResponseCodes.FAIL) {
        setMessage({
          title: "Control de inventario",
          show: true,
          description: resp.operation.message,
          okTitle: "Aceptar",
          background: true,
          onOk: () => setMessage({ show: false }),
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const downloadCollection = async () => {
    try {
      const requestDataid = searchResults.map((result) => result.id);
      const endpoint = "/api/v1/asset-inventory/generate-xlsx";
      const requestData = {
        assetIds: requestDataid,
      };
      await post(endpoint, requestData);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClean = () => {
    reset();
    setFormWatch({ plate: "" });
    setSubmitDisabled(true);
    tableComponentRef.current?.emptyData();
    setTableView(false);
  };

  const handleClose = () => {
    handleClean();
    navigate(`/contabilidad/control-inventario/bienes-muebles`);
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormWatch({
      ...formWatch,
      [name]: value,
    });
  };

  useEffect(() => {
    const { plate } = formWatch;
    if (plate) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  }, [formWatch]);

  return {
    errors,
    control,
    isValid,
    register,
    onSubmit,
    tableView,
    handleClean,
    handleChange,
    submitDisabled,
    setPaginateData,
    tableComponentRef,
    handleClose,
    handleSave,
    searchResults,
    downloadCollection,
  };
};
