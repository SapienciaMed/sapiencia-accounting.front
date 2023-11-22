import { memo, useState } from "react";
import {
  FormComponent,
  ButtonComponent,
} from "../../../common/components/Form";
import { useManageProperty } from "../../fixedAssets/hooks/propertyHooks/createProperty";
import { TriStateCheckboxComponent } from "../../../common/components/Form/checkbox.component";
import { classNames } from "primereact/utils";

const HistoryInventoryTech = () => {
  const { control, handleSubmit, errors, handleCancel, isValid } =
    useManageProperty();

  const [fechasSeleccionadas, setFechasSeleccionadas] = useState([]);

  const handleCheckboxChange = (fecha, isChecked) => {
    if (isChecked) {
      // Agregar fecha al array de fechas seleccionadas
      setFechasSeleccionadas((prevFechas) => [...prevFechas, fecha]);
    } else {
      // Remover fecha del array de fechas seleccionadas
      setFechasSeleccionadas((prevFechas) =>
        prevFechas.filter((f) => f !== fecha)
      );
    }
  };

  const fechas = ["2023-12-01", "2023-12-15", "2023-12-31"];
  console.log(fechasSeleccionadas);
  return (
    <div className="container-sections-forms mt-24px ml-16px mr-16px p-0">
      <FormComponent
        id="HistoryInventoryTech"
        className="form-signIn"
        action={handleSubmit}
      >
        <span className="text-black extra-large bold grid-span-3-columns p-20px">
          Control inventario tecnológico
        </span>
        <div className="container-sections-forms ml-5px mr-20px">
          <div>
            {fechas.map((fecha) => (
              <div key={fecha}>
                <TriStateCheckboxComponent
                  id={fecha}
                  value={fechasSeleccionadas.includes(fecha)}
                  onChange={(isChecked) =>
                    handleCheckboxChange(fecha, isChecked)
                  }
                  titleName={fecha}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="button-save-container-display mr-24px">
          <ButtonComponent
            value="Cancelar"
            className="button-clean bold"
            type="button"
            action={handleCancel}
          />
          <ButtonComponent
            value="Guardar"
            type="submit"
            disabled={!isValid || Object.keys(errors).length > 0}
            className={`button-save ${
              !isValid || Object.keys(errors).length > 0 ? "disabled-black" : ""
            } big`}
          />
        </div>
      </FormComponent>
    </div>
  );
};

export default memo(HistoryInventoryTech);
