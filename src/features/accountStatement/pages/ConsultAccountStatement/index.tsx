import { memo } from "react";
import {
  ButtonComponent,
  FormComponent,
  InputComponent,
  SelectComponent,
} from "../../../../common/components/Form";
import { DatePickerComponent } from "../../../../common/components/Form/input-date.component";
import TableComponent from "../../../../common/components/table.component";
import { contractsData } from "../../data";
import { useConsultAccountStatement } from "../../hooks/consultAccountStatement";
import { tableColumns } from "./columns";

const ConsultAccountStatement = () => {
  const {
    urlGetAccountStatement,
    tableComponentRef,
    tableView,
    onSubmit,
    tableActions,
    register,
    control,
    errors,
    handleClean,
  } = useConsultAccountStatement();

  return (
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
              typeInput="text"
              errors={errors}
              className="input-basic medium"
              classNameLabel="text-black big bold"
            />
            <SelectComponent
              idInput="contractCode"
              control={control}
              errors={errors}
              data={contractsData}
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
              className="input-basic medium"
              classNameLabel="text-black big bold"
            />
            <DatePickerComponent
              idInput="expeditionDate"
              control={control}
              label={<>Fecha de expedición</>}
              errors={errors}
              classNameLabel="text-black big bold"
              className="dataPicker-basic  medium "
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
            className="button-save big"
            type="submit"
          />
        </div>
      </FormComponent>
      {tableView && (
        <div className="container-sections-forms ml-20px mr-20px">
          <TableComponent
            ref={tableComponentRef}
            url={urlGetAccountStatement}
            columns={tableColumns}
            actions={tableActions}
            isShowModal={true}
            emptyMessage="No se generó resultado en la búsqueda"
            titleMessageModalNoResult="Resultado de búsqueda"
          />
        </div>
      )}
    </div>
  );
};

export default memo(ConsultAccountStatement);
