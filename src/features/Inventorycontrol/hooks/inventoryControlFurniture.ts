import { DateTime } from "luxon";
import { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { EResponseCodes } from "../../../common/constants/api.enum";
import { AppContext } from "../../../common/contexts/app.context";
import useCrudService from "../../../common/hooks/crud-service.hook";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import { IFilterPlate } from "../../../common/interfaces/fixedAssets.interface";
import { inventoryControlSchema } from "../../../common/schemas/techActives.schemas";
import { urlApiAccounting } from "../../../common/utils/base-url";

type IPlate = {
  plate: string;
};

export const useInventoryControlFurniture = () => {
  const { setMessage } = useContext(AppContext);
  const [searchResults, setSearchResults] = useState<IFilterPlate[]>([]);
  const navigate = useNavigate();
  const tableComponentRef = useRef(null);
  const { validateActionAccess, authorization } = useContext(AppContext);
  const [showFooterActions, setShowFooterActions] = useState(false);
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
    const endpoint = `/api/v1/furniture/${plate}/get-by-plate`;
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
          title: "Control inventario",
          show: true,
          description: resp.operation.message,
          okTitle: "Aceptar",
          background: true,
          onOk: () => {
            setFormWatch({ plate: "" });
            reset();

            if (searchResults.length === 0) {
              setTableView(false);
            }
            setMessage({ show: false });
          },
        });
      } else {
        // Add result to array
        setSearchResults((prevResults) => [...prevResults, resp.data]);
        reset();
        setFormWatch({ plate: "" });
      }
    } catch (err) {
      console.log(err);
    }
  });

  const handleSave = async () => {
    try {
      const requestDataid = searchResults.map((result) => result.id);
      const endpoint = "/api/v1/furniture-inventory/create";
      const requestData = {
        furnitureIds: requestDataid,
      };
      const resp = await post(endpoint, requestData);
      setMessage({
        title: "Control de inventario",
        show: true,
        description: `Se creó control de inventario ${DateTime.now().toSQLDate()}`,
        okTitle: "Cerrar",
        background: true,
        onOk: () => {
          handleClean();
          setMessage({ show: false });
        },
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
      const url = new URL(
        `${urlApiAccounting}/api/v1/furniture-inventory/generate-xlsx`
      );
      const params = new URLSearchParams();
      const token = localStorage.getItem("token");
      params.append("authorization", token);
      params.append("permissions", authorization.encryptedAccess);

      params.append("furnitureIds", JSON.stringify(requestDataid));
      url.search = params.toString();
      window.open(url.toString(), "_blank");
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
    setMessage({
      title: "Control inventario",
      description:
        "¿Está segur@ de cerrar los cambios? \n Si cierras podrías perder los inventarios guardados ",
      show: true,
      okTitle: "Aceptar",
      cancelTitle: "Cancelar",
      background: true,
      onOk: () => {
        setMessage({ show: false });
        navigate(`/contabilidad`);
        handleClean();
      },
      onCancel: () => {
        setMessage({ show: false });
      },
      onClose: () => setMessage({ show: false }),
    });
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
    showFooterActions,
    setShowFooterActions,
    validateActionAccess,
  };
};
