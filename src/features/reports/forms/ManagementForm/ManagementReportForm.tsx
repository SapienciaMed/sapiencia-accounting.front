import { memo } from "react";
import {
  ButtonComponent,
  FormComponent,
} from "../../../../common/components/Form";
import { DatePickerComponent } from "../../../../common/components/Form/input-date.component";
import TableComponent from "../../../../common/components/table.component";
import Svgs from "../../../../public/images/icons/svgs";
import { tableColumns } from "./columns";
import { Title } from "../MainForm/MainReportForm";

const ManagementReport = ({
  urlGet,
  tableComponentRef,
  tableView,
  handleSubmit,
  control,
  errors,
  isValid,
  handleClean,
  submitDisabled,
  setPaginateData,
  showFooterActions,
  setShowFooterActions,
  downloadCollection,
  validateActionAccess,
}) => {
  return (
    <div className=" mt-24px ml-16px mr-16px p-0">
      <FormComponent
        id="BusinessForm"
        className="form-signIn"
        action={handleSubmit}
      >
        <div className="ml--12px">
          <Title title="Filtro de busqueda" />
        </div>

        <div className="container-sections-forms ml-20px mr-20px">
          <div className="grid-form-4-container gap-25 mt-24px">
            <DatePickerComponent
              idInput="expeditionDateFrom"
              control={control}
              label={<>Fecha de expedición desde</>}
              errors={errors}
              classNameLabel="text-black big bold"
              className="dataPicker-basic  medium"
              placeholder="DD/MM/YYYY"
              dateFormat="dd/mm/yy"
              maxDate={new Date()}
            />
            <DatePickerComponent
              idInput="expeditionDateUntil"
              control={control}
              label={<>Fecha de expedición hasta</>}
              errors={errors}
              classNameLabel="text-black big bold"
              className="dataPicker-basic  medium"
              placeholder="DD/MM/YYYY"
              dateFormat="dd/mm/yy"
              maxDate={new Date()}
            />
          </div>

          <div className="button-save-container-display mr-24px mt-20px button-save-bussiness">
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
          <div className="ml-20px mr-20px">
            <TableComponent
              setPaginateData={setPaginateData}
              ref={tableComponentRef}
              url={urlGet}
              columns={tableColumns}
              isShowModal={true}
              setShowFooterActions={setShowFooterActions}
              emptyMessage="Resultado en la búsqueda"
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

export default memo(ManagementReport);
