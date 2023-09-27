import { memo, useEffect, useState } from "react";
import {
  ButtonComponent,
  FormComponent,
  SelectComponent,
} from "../../../../common/components/Form";
import { Link } from "react-router-dom";
import Svgs from "../../../../public/images/icons/svgs";
import TableComponent from "../../../../common/components/table.component";
import { tableColumns } from "./columns";

const BusinessForm = ({
  urlGetConsultBusiness,
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
}) => {
  return (
    <div className="container-sections-forms mt-24px ml-16px mr-16px p-0">
      <FormComponent
        id="BusinessForm"
        className="form-signIn"
        action={onSubmit}
      >
        <div className="container-sections-forms ml-20px mr-20px">
          <div className="grid-form-3-container gap-25">
            <div className="text-black large bold grid-span-2-columns pb-14px">
              Gestionar razón social
            </div>
            <div className="button-save-container-display mr-33px button-create-business">
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
                idInput="id"
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
          <div className="button-save-container-display mr-24px">
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
              url={urlGetConsultBusiness}
              columns={tableColumns}
              actions={tableActions}
              isShowModal={true}
              emptyMessage="No se generó resultado en la búsqueda"
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
          <div className="button-save-container-display mr-24px">
            <ButtonComponent
              value="Cerrar"
              className="button-save big"
              action={handleClean}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default memo(BusinessForm);
