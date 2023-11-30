import { memo } from "react";
import {
  FormComponent,
  ButtonComponent,
} from "../../../common/components/Form";
import { TriStateCheckboxComponent } from "../../../common/components/Form/checkbox.component";
import Svgs from "../../../public/images/icons/svgs";
import { useHistoryInventoryFurniture } from "../hooks/historyInventoryFurniture";

const HistoryInventoryFurniture = () => {
  const {
    downloadCollection,
    dates,
    dateSelect,
    handleCheckboxChange,
    handleClose,
  } = useHistoryInventoryFurniture();
  const titleInventory = <span className="bold">Fecha inventario : </span>;
  return (
    <div className="container-sections-forms mt-24px ml-16px mr-16px p-0">
      <FormComponent
        id="HistoryInventoryFurniture"
        className="form-signIn"
        action={downloadCollection}
      >
        <span className="text-black extra-large bold grid-span-3-columns p-20px">
          Histórico inventario bien mueble
        </span>
        <div className="container-sections-forms ml-5px mr-20px">
          <div>
            {dates.map((datesInventory) => (
              <div key={datesInventory}>
                <TriStateCheckboxComponent
                  id={dates}
                  value={dateSelect.includes(datesInventory)}
                  onChange={(isChecked) =>
                    handleCheckboxChange(datesInventory, isChecked)
                  }
                  titleName={
                    <>
                      {titleInventory}
                      {datesInventory}
                    </>
                  }
                />
              </div>
            ))}
          </div>
        </div>

        <div className="button-save-container-display mr-24px">
          {/* {validateActionAccess("CUENTA_COBRO_EXCEL") && ( */}
          <ButtonComponent
            value={
              <>
                <div className="container-buttonText">
                  <span>Descargar</span>
                  <Svgs svg="excel" width={23.593} height={28.505} />
                </div>
              </>
            }
            className="button-download large "
            type="submit"
          />
          {/* )} */}
          <ButtonComponent
            value="Cerrar"
            className="button-save big"
            action={handleClose}
          />
        </div>
      </FormComponent>
    </div>
  );
};

export default memo(HistoryInventoryFurniture);
