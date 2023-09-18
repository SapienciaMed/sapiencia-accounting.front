import { memo } from "react";
import {
  ButtonComponent,
  FormComponent,
  InputComponent,
  SelectComponent,
} from "../../../common/components/Form";
import { contractsData, paymentTypeData } from "../data";
import { Link } from "react-router-dom";
import Svgs from "../../../public/images/icons/svgs";
import { useManageCompanyName } from "../hooks/manageCompanyName";
// import { useAccountStatement } from "../hooks/accountStatement.hook";

const ManageCompanyNameMain = () => {
  const { control, handleSubmit, register, errors, isValid } =
    useManageCompanyName();
  return (
    <div className="container-sections-forms mt-24px ml-16px mr-16px p-0">
      <FormComponent
        id="ManageCompanyNameMainForm"
        className="form-signIn"
        action={handleSubmit}
      >
        <div className="container-sections-forms ml-20px mr-20px">
          <div className="grid-form-3-container gap-25">
            <div className="text-black large bold grid-span-2-columns pb-14px">
              Gestionar razón social
            </div>
            <div className="button-save-container-display mr-33px">
              <Link
                to="/contabilidad/razon-social/crear"
                className="text-links"
              >
                Crear razón social
                <div className="text-links ml-5px">
                  <Svgs svg="add" width={16} height={17} />
                </div>
              </Link>
            </div>
            <span className="text-black biggest bold grid-span-3-columns">
              Consultar razón social
            </span>
            <div className="grid-span-2-columns">
              <SelectComponent
                idInput="contractCode"
                control={control}
                errors={errors}
                data={contractsData}
                label={<>NIT - Razón social /Nombre</>}
                className="select-basic medium"
                classNameLabel="text-black big bold"
                placeholder="Seleccionar"
                filter
              />
            </div>
          </div>

          <div className="button-save-container-display mr-24px">
            <ButtonComponent
              value="Limpiar campos"
              className="button-clean bold"
              type="button"
              // action={handleClean}
            />
            <ButtonComponent
              value="Buscar"
              type="submit"
              disabled={!isValid}
              className={`button-save ${!isValid ? "disabled-black" : ""} big`}
            />
          </div>
        </div>
      </FormComponent>
    </div>
  );
};

export default memo(ManageCompanyNameMain);
