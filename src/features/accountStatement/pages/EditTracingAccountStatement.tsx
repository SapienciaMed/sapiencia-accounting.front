import { memo, useState } from "react";
import {
  ButtonComponent,
  FormComponent,
  InputComponent,
  SelectComponent,
} from "../../../common/components/Form";
import { DatePickerComponent } from "../../../common/components/Form/input-date.component";
import { InputNumberComponent } from "../../../common/components/Form/input-number.component";
import {
  IGetAccountStatement,
  STATE_TYPE,
} from "../../../common/interfaces/accountStatement.interface";
import { paymentTypeData } from "../data";
import { useEditAccountStatementTracking } from "../hooks/editTracingAcountStatement";
import { useGetAccountStatementByAccountNum } from "../hooks/getAccountStatementByAccountNum";
import { useGetStatementStatus } from "../hooks/getStatementStatus.hook";

const DetailAccountStatement = () => {
  const { control, register, errors, onSubmit, handleCancel, watch } =
    useEditAccountStatementTracking();
  const { accountStatement } = useGetAccountStatementByAccountNum();
  useState<IGetAccountStatement>(null);
  const statusId = watch("statusId");
  const { statementstatus } = useGetStatementStatus();
  console.log(typeof statusId, statusId);
  console.log(statusId === STATE_TYPE.Pagada);
  return (
    <div className="container-sections-forms mt-24px ml-16px mr-16px p-0">
      <FormComponent
        id="editAccountStatementTracking"
        className="form-signIn"
        action={onSubmit}
      >
        {accountStatement && (
          <div className=" container-sections-forms ml-20px mr-20px">
            <div className="grid-form-3-container gap-25">
              <span className="text-black large bold grid-span-3-columns">
                Seguimiento cuenta de cobro
              </span>
              <InputComponent
                idInput="accountNum"
                label={<>No. Cuenta de cobro</>}
                value={`${accountStatement?.accountNum}`}
                typeInput="text"
                register={register}
                className="input-basic medium"
                classNameLabel="text-black big bold"
                disabled
              />
              <InputComponent
                idInput="contract.contractId"
                label={<>Contrato</>}
                value={`${accountStatement?.contract?.contractId}`}
                register={register}
                typeInput="text"
                className="input-basic medium"
                classNameLabel="text-black big bold"
                disabled
              />
              <InputComponent
                idInput="contract.business.nit"
                label={<>NIT</>}
                value={`${accountStatement?.contract?.business?.nit}`}
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
                  value={`${accountStatement?.contract?.business?.name}`}
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
                idInput="statusId"
                control={control}
                errors={errors}
                data={statementstatus}
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
                {statusId === STATE_TYPE.Pagada && (
                  <DatePickerComponent
                    idInput="PaymentDate"
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
                {statusId === STATE_TYPE.Anulada && (
                  <DatePickerComponent
                    idInput="annulmentDate"
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
                idInput="observation"
                label={<>Observaciones</>}
                typeInput="text"
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
                placeholder={`${accountStatement?.expeditionDate}`}
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
                placeholder={`${accountStatement?.expirationDate}`}
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
                placeholder={accountStatement?.paymentType}
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
                placeholder={`${accountStatement?.valuePay}`}
                disabled
              />
            </div>
          </div>
        )}
        <div
          style={{
            height: "1px",
            margin: "32px 20px 0",
            backgroundColor: "#e0e0e0",
          }}
        ></div>
        <div className="button-save-container-display mr-24px">
          <ButtonComponent
            value="Cerrar"
            className="button-clean bold"
            type="button"
            action={handleCancel}
          />
          <ButtonComponent
            value="Guardar"
            className="button-save big"
            type="submit"
          />
        </div>
      </FormComponent>
    </div>
  );
};

export default memo(DetailAccountStatement);
