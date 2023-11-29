import { memo } from "react";
import {
  ButtonComponent,
  FormComponent,
  InputComponent,
  SelectComponent,
} from "../../../../common/components/Form";
import { DatePickerComponent } from "../../../../common/components/Form/input-date.component";
import TableComponent from "../../../../common/components/table.component";
import Svgs from "../../../../public/images/icons/svgs";
import { tableColumns } from "./columns";

const ConsultAccountStatementForm = ({
  urlGetAccountStatement,
  tableComponentRef,
  tableView,
  onSubmit,
  tableActions,
  register,
  control,
  contractData,
  errors,
  isValid,
  handleClean,
  handleChange,
  submitDisabled,
  setPaginateData,
  downloadCollection,
  validateActionAccess,
  showFooterActions,
  setShowFooterActions,
}) => (
  <div className="container-sections-forms mt-24px ml-16px mr-16px p-0">
    <FormComponent
      id="searchAccountStatementForm"
      className="form-signIn"
      action={onSubmit}
    >
      <div className=" container-sections-forms ml-20px mr-20px">
        <div className="grid-form-4-container gap-25">
          <span className="text-black large bold grid-span-4-columns">
            Consultar cuenta de cobro
          </span>
          <InputComponent
            idInput="accountNum"
            label={<>No. Cuenta de cobro</>}
            register={register}
            typeInput="number"
            errors={errors}
            onChange={handleChange}
            className="input-basic medium"
            classNameLabel="text-black big bold"
          />
          <SelectComponent
            idInput="contractCode"
            control={control}
            errors={errors}
            data={contractData}
            label={<>Contrato</>}
            className="select-basic medium"
            classNameLabel="text-black big bold"
            placeholder="Seleccione."
          />
          <InputComponent
            idInput="nit"
            label={<>NIT</>}
            typeInput="text"
            register={register}
            errors={errors}
            onChange={handleChange}
            className="input-basic medium"
            classNameLabel="text-black big bold"
          />
          <DatePickerComponent
            idInput="expeditionDate"
            control={control}
            label={<>Fecha de expedición</>}
            errors={errors}
            classNameLabel="text-black big bold"
            className="dataPicker-basic  medium"
            placeholder="DD/MM/YYYY"
            dateFormat="dd/mm/yy"
            maxDate={new Date()}
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
    </FormComponent>
    {tableView && (
      <>
        <div className="container-sections-forms ml-20px mr-20px">
          <TableComponent
            setPaginateData={setPaginateData}
            ref={tableComponentRef}
            url={urlGetAccountStatement}
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
            {validateActionAccess("CUENTA_COBRO_EXCEL") && (
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

export default memo(ConsultAccountStatementForm);
