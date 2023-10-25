import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import HistoryDescription from "../../../../common/components/Form/table-detail.component";
import { AppContext } from "../../../../common/contexts/app.context";
import { usePropertyById } from "./getPropertyById";

export const useGetDetailProperty = () => {
  const navigate = useNavigate();
  const { property } = usePropertyById();
  const { control, register, reset } = useForm();
  const [mostrarComponente, setMostrarComponente] = useState(false);
  const { setMessage } = useContext(AppContext);

  const handleClose = () => navigate("/contabilidad/activos-fijos/consultar");

  useEffect(() => {
    reset(property);
    showHistoryProperty();
  }, [property]);

  const showHistoryProperty = async () => {
    setMostrarComponente(true);
    // const id = property.id;
    const data = [
      {
        date: "2020-10-10",
      },
      {
        date: "2020-10-10",
      },
      {
        date: "2020-10-10",
      },
    ];
    setMessage({
      title: "Históricos",
      show: true,
      okTitle: "Aceptar",
      description: <HistoryDescription data={data} />,
      size: "medium",
      background: true,
    });
  };

  return { control, register, handleClose, showHistoryProperty };
};
