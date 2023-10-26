import { memo } from "react";
import {
  ButtonComponent,
  FormComponent,
  InputComponent,
  SelectComponent,
} from "../../../common/components/Form";
import { DatePickerComponent } from "../../../common/components/Form/input-date.component";
import { InputNumberComponent } from "../../../common/components/Form/input-number.component";
import { STATE_TYPE } from "../../../common/interfaces/accountStatement.interface";
import { useEditAccountStatementTracking } from "../hooks/editTracingAcountStatement";

const DetailAccountStatement = () => {
  const {
    control,
    errors,
    isValid,
    register,
    onSubmit,
    statusId,
    handleCancel,
    paymentTypeData,
    statementStatusData,
    currentAccountStatement,
  } = useEditAccountStatementTracking();
  return (
    <div className="container-sections-forms mt-24px ml-16px mr-16px p-0">
      <FormComponent
        id="editAccountStatementTracking"
        className="form-signIn"
        action={onSubmit}
      >
        <div className=" container-sections-forms ml-20px mr-20px">
          <div className="grid-form-3-container gap-25">
            <span className="text-black large bold grid-span-3-columns">
              Seguimiento cuenta de cobro
            </span>
            <InputComponent
              idInput="accountNum"
              label={<>No. Cuenta de cobro</>}
              typeInput="text"
              register={register}
              className="input-basic medium"
              classNameLabel="text-black big bold"
              disabled
            />
            <InputComponent
              idInput="contract.contractId"
              label={<>Contrato</>}
              register={register}
              typeInput="text"
              className="input-basic medium"
              classNameLabel="text-black big bold"
              disabled
            />
            <InputComponent
              idInput="contract.business.nit"
              label={<>NIT</>}
              typeInput="text"
              register={register}
              className="input-basic medium"
              classNameLabel="text-black big bold"
              disabled
            />
            <div className="grid-span-3-columns">
              <InputComponent
                idInput="contract.business.name"
                label={<>Razón social / Nombre</>}
                typeInput="text"
                register={register}
                className="input-basic medium"
                classNameLabel="text-black big bold"
                disabled
              />
            </div>
          </div>
          <div className="grid-form-4-container gap-25 mt-25px">
            <SelectComponent
              idInput="tracking.statusId"
              control={control}
              errors={errors}
              data={statementStatusData}
              label={
                <>
                  Estado <span>*</span>
                </>
              }
              className="select-basic medium"
              classNameLabel="text-black big bold"
              placeholder="Seleccione."
            />
            <div>
              {statusId === STATE_TYPE.PAGADA && (
                <DatePickerComponent
                  idInput={`${
                    currentAccountStatement.tracking?.statusId === statusId
                      ? "tracking.trackingDate"
                      : "trackingDate"
                  }`}
                  control={control}
                  errors={errors}
                  label={
                    <>
                      Fecha de pago <span>*</span>
                    </>
                  }
                  classNameLabel="text-black big bold"
                  className="dataPicker-basic medium"
                  placeholder="DD/MM/YYYY"
                  dateFormat="dd/mm/yy"
                  maxDate={new Date()}
                />
              )}
              {statusId === STATE_TYPE.ANULADA && (
                <DatePickerComponent
                  idInput={`${
                    currentAccountStatement.tracking?.statusId === statusId
                      ? "tracking.trackingDate"
                      : "trackingDate"
                  }`}
                  control={control}
                  errors={errors}
                  label={
                    <>
                      Fecha de anulacion <span>*</span>
                    </>
                  }
                  classNameLabel="text-black big bold"
                  className="dataPicker-basic medium"
                  placeholder="DD/MM/YYYY"
                  dateFormat="dd/mm/yy"
                  maxDate={new Date()}
                />
              )}
            </div>
          </div>

          <div className="grid-span-3-columns gap-25 mt-25px">
            <InputComponent
              idInput="tracking.observation"
              label={
                <>
                  Observaciones <span>*</span>
                </>
              }
              typeInput="text"
              errors={errors}
              register={register}
              className="input-basic medium"
              classNameLabel="text-black big bold"
            />
          </div>
          <div className="grid-form-4-container gap-25 mt-25px">
            <DatePickerComponent
              idInput="expeditionDate"
              control={control}
              label={<>Fecha de expedición</>}
              classNameLabel="text-black big bold"
              className="dataPicker-basic  medium "
              dateFormat="dd/mm/yy"
              maxDate={new Date()}
              disabled
            />
            <DatePickerComponent
              idInput="expirationDate"
              control={control}
              label={<>Fecha de vencimiento</>}
              classNameLabel="text-black big bold"
              className="dataPicker-basic  medium "
              dateFormat="dd/mm/yy"
              maxDate={new Date()}
              disabled
            />
            <SelectComponent
              idInput="paymentType"
              control={control}
              data={paymentTypeData}
              label={<>Forma de pago</>}
              className="select-basic medium"
              classNameLabel="text-black big bold"
              disabled
            />
            <InputNumberComponent
              idInput="valuePay"
              control={control}
              label={<>Valor</>}
              classNameLabel="text-black big bold"
              className="inputNumber-basic medium"
              mode="currency"
              currency="COP"
              locale="es-CO"
              minFractionDigits={0}
              maxFractionDigits={2}
              disabled
            />
          </div>
        </div>
        <div
          style={{
            height: "1px",
            margin: "32px 20px 0",
            backgroundColor: "#e0e0e0",
          }}
        ></div>
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
            disabled={!isValid}
            className={`button-save ${!isValid ? "disabled-black" : ""} big`}
          />
        </div>
      </FormComponent>
    </div>
  );
};

export default memo(DetailAccountStatement);
