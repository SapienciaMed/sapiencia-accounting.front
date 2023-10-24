import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { usePropertyById } from "./getPropertyById";
import HistoryDescription from "../../../../common/components/Form/table-detail.component";
import { AppContext } from "../../../../common/contexts/app.context";

export const useGetDetailProperty = () => {
  const navigate = useNavigate();
  const { property } = usePropertyById();
  const { control, register, reset } = useForm();
  const [mostrarComponente, setMostrarComponente] = useState(false);
  const { setMessage } = useContext(AppContext);

  const handleClose = () => navigate("/contabilidad/activos-fijos/consultar");

  useEffect(() => {
    reset(property);
  }, [property]);

  const showHistoryProperty = async () => {
    setMostrarComponente(true);
    // const id = property.id;
    const deployment = [
      {
        dateInfo: "Otra fecha1: 2020-10-10",
      },
      {
        dateInfo: "Otra fecha2: 2020-10-10",
      },
      {
        dateInfo: "Otra fecha3: 2020-10-10",
      },
      // {
      //   dateInfo: "Otra fecha4: 2020-10-10",
      // },
      // {
      //   dateInfo: "Otra fecha5: 2023-10-21",
      // },
    ];

    setMessage({
      title: "Históricos",
      show: true,
      okTitle: "Aceptar",
      description: <HistoryDescription deployment={deployment} />,
      size: "medium",
      background: true,
    });
  };

  return { control, register, handleClose, showHistoryProperty };
};
