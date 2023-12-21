import { memo } from "react";
import { Link } from "react-router-dom";
import {
  ButtonComponent,
  FormComponent,
  SelectComponent,
} from "../../../../common/components/Form";
import TableComponent from "../../../../common/components/table.component";
import Svgs from "../../../../public/images/icons/svgs";
import { tableColumns } from "./columns";

const ManageContractForm = ({
  urlGetConsultContract,
  tableComponentRef,
  tableView,
  onSubmit,
  tableActions,
  control,
  errors,
  isValid,
  handleClean,
  submitDisabled,
  setPaginateData,
  business,
  contract,
  validateActionAccess,
  showFooterActions,
  setShowFooterActions,
}) => {
  return (
    <div className="container-sections-forms mt-24px ml-16px mr-16px p-0 container-width">
      <FormComponent
        id="BusinessForm"
        className="form-signIn"
        action={onSubmit}
      >
        <div className="container-sections-forms ml-20px mr-20px">
          <div className="grid-form-3-container gap-25">
            <div className="text-black large bold grid-span-2-columns pb-14px">
              Gestionar contrato
            </div>
            {validateActionAccess("CONTRATO_CREAR") && (
              <div className="button-save-container-display mr-33px button-create-business">
                <Link to="/contabilidad/contrato/crear" className="text-links">
                  Crear contrato
                  <div className="text-links ml-5px">
                    <Svgs svg="add" width={16} height={17} />
                  </div>
                </Link>
              </div>
            )}
            <span className="text-black biggest bold grid-span-3-columns">
              Consultar contrato
            </span>
          </div>
          <div className="grid-form-3-container gap-25 mt-24px">
            <div>
              <SelectComponent
                idInput="id"
                control={control}
                errors={errors}
                data={contract}
                label={<>Contrato</>}
                className="select-basic medium"
                classNameLabel="text-black big bold"
                placeholder="Seleccionar"
                filter
              />
            </div>
            <div className="grid-span-2-columns mr-24px">
              <SelectComponent
                idInput="businessCode"
                control={control}
                errors={errors}
                data={business}
                label={<>NIT - Razón social /Nombre</>}
                className="select-basic medium"
                classNameLabel="text-black big bold"
                placeholder="Seleccionar"
                filter
              />
            </div>
          </div>
          <div className="button-save-container-display mr-24px mt-20px button-save-bussiness">
            <ButtonComponent
              value="Limpiar campos"
              className="button-clean bold"
              type="button"
              action={handleClean}
            />
            <ButtonComponent
              value="Buscar"
              className={`button-save ${
                !isValid || submitDisabled ? "disabled-black" : ""
              } big`}
              type="submit"
              disabled={!isValid || submitDisabled}
            />
          </div>
        </div>
      </FormComponent>
      {tableView && (
        <>
          <div className="container-sections-forms ml-20px mr-20px">
            <TableComponent
              setPaginateData={setPaginateData}
              ref={tableComponentRef}
              url={urlGetConsultContract}
              columns={tableColumns}
              actions={tableActions}
              isShowModal={true}
              setShowFooterActions={setShowFooterActions}
              emptyMessage="No se generó resultado en la búsqueda"
              descriptionModalNoResult="No se generó resultado en la búsqueda"
              titleMessageModalNoResult="Resultado de búsqueda"
            />
          </div>
          <div
            style={{
              height: "1px",
              margin: "0 20px",
              backgroundColor: "#e0e0e0",
            }}
          ></div>
          {showFooterActions && (
            <div className="button-save-container-display mr-24px">
              <ButtonComponent
                value="Cerrar"
                className="button-save big"
                action={handleClean}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default memo(ManageContractForm);
