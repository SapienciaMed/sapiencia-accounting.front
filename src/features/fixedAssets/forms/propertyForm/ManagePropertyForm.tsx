import { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FormComponent,
  SelectComponent,
  ButtonComponent,
  InputComponent,
} from "../../../../common/components/Form";
import TableComponent from "../../../../common/components/table.component";
import Svgs from "../../../../public/images/icons/svgs";
import { tableColumns } from "../propertyForm/columns";
import { DatePickerComponent } from "../../../../common/components/Form/input-date.component";

const ManagePropertyForm = ({
  urlGetConsultFurniture,
  tableComponentRef,
  tableView,
  onSubmit,
  tableActions,
  control,
  errors,
  isValid,
  handleClean,
  submitDisabled,
  register,
  setPaginateData,
  equipmentStatus,
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
              Gestionar bienes muebles
            </div>
            <div className="button-save-container-display mr-33px button-create-business">
              <Link
                to="/contabilidad/activos-fijos/crear"
                className="text-links"
              >
                Crear bien mueble
                <div className="text-links ml-5px">
                  <Svgs svg="add" width={16} height={17} />
                </div>
              </Link>
            </div>
            <span className="text-black biggest bold grid-span-3-columns">
              Consultar bienes muebles
            </span>
          </div>
          <div className="grid-form-2-container gap-25 mt-24px">
            <div>
              <InputComponent
                idInput="plate"
                label={<>Placa activo</>}
                typeInput="text"
                register={register}
                errors={errors}
                className="input-basic medium"
                classNameLabel="text-black big bold"
              />
            </div>
            <div className="grid-span-2-columns mr-24px">
              <InputComponent
                idInput="description"
                label={<>Tipo activo/descripción</>}
                typeInput="text"
                register={register}
                errors={errors}
                className="input-basic medium"
                classNameLabel="text-black big bold"
              />
            </div>
          </div>
          <div className="grid-form-2-container gap-25 mt-24px">
            <div>
              <DatePickerComponent
                idInput="acquisitionDate"
                errors={errors}
                control={control}
                label={<>Fecha de adquisición</>}
                classNameLabel="text-black big bold"
                className="dataPicker-basic  medium "
                dateFormat="dd/mm/yy"
                maxDate={new Date()}
              />
            </div>
            <div className="grid-span-2-columns mr-24px">
              <SelectComponent
                idInput="equipmentStatus"
                control={control}
                errors={errors}
                data={equipmentStatus}
                label={<> Estado equipo</>}
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
              url={urlGetConsultFurniture}
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

export default memo(ManagePropertyForm);
