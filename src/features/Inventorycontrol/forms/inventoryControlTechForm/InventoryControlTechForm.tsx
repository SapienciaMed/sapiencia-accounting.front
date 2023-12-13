import { memo } from "react";
import { Link } from "react-router-dom";
import {
  ButtonComponent,
  FormComponent,
  InputComponent,
} from "../../../../common/components/Form";
import Svgs from "../../../../public/images/icons/svgs";
import TableComponent from "../../../../common/components/table.component";
import { tableColumns } from "./columns";

const InventoryControlTechForm = ({
  searchResults,
  tableComponentRef,
  tableView,
  onSubmit,
  register,
  errors,
  isValid,
  handleChange,
  submitDisabled,
  setPaginateData,
  handleClose,
  handleSave,
  downloadCollection,
  showFooterActions,
  setShowFooterActions,
  validateActionAccess,
}) => (
  <div className="container-sections-forms mt-24px ml-16px mr-16px p-0 container-width">
    <FormComponent
      id="searchAccountStatementForm"
      className="form-signIn"
      action={onSubmit}
    >
      <div className=" container-sections-forms ml-20px mr-20px">
        <div className="pb-40px" style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap"
        }}>
          <span className="text-black huge bold grid-span-4-columns">
            Control inventario activo tecnológico
          </span>

          <div className="button-save-container-display mr-33px button-create-business">
            <Link
              to="/contabilidad/control-inventario/activos-tecnologicos/inventario-tecnologico"
              className="text-links"
            >
              Histórico inventario
            </Link>
          </div>
        </div>
        <div className="grid-form-3-container gap-25">
          <InputComponent
            idInput="plate"
            label={<>Placa activo</>}
            register={register}
            typeInput="number"
            errors={errors}
            onChange={handleChange}
            className="input-basic medium"
            classNameLabel="text-black big bold"
          />
          <div className="display-justify-flex-start pt-10px">
            <ButtonComponent
              value="Agregar"
              className={`button-save ${
                !isValid || submitDisabled ? "disabled-black" : ""
              } big`}
              type="submit"
              disabled={!isValid || submitDisabled}
            />
          </div>
        </div>
      </div>
    </FormComponent>
    {tableView && (
      <>
        <div className="container-sections-forms ml-20px mr-20px">
          <TableComponent
            setPaginateData={setPaginateData}
            ref={tableComponentRef}
            dataArray={searchResults}
            columns={tableColumns}
            useCustomRendering={true}
            isShowModal={true}
            setShowFooterActions={setShowFooterActions}
            emptyMessage="No se generó resultado en la búsqueda"
            descriptionModalNoResult="No se generó resultado en la búsqueda"
            titleMessageModalNoResult="Control inventario"
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
              action={handleClose}
            />
            <ButtonComponent
              value="Guardar"
              className="button-save big"
              action={handleSave}
            />
            {validateActionAccess("ACTIVO_FIJO_INVENTARIO") && (
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
                action={downloadCollection}
              />
            )}
          </div>
        )}
      </>
    )}
  </div>
);

export default memo(InventoryControlTechForm);
