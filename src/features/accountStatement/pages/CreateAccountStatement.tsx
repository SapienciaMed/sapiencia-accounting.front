import { memo } from "react";
import {
  ButtonComponent,
  FormComponent,
  InputComponent,
  SelectComponent,
} from "../../../common/components/Form";
import { DatePickerComponent } from "../../../common/components/Form/input-date.component";
import { InputNumberComponent } from "../../../common/components/Form/input-number.component";
import { TextAreaComponent } from "../../../common/components/Form/input-text-area.component";
import { contractsData, paymentTypeData } from "../data";
import { useAccountStatement } from "../hooks/accountStatement.hook";

const CreateAccountStatement = () => {
  const { control, handleSubmit, register, errors, handleCancel, isValid } =
    useAccountStatement();
  return (
    <div className="container-sections-forms mt-24px ml-16px mr-16px p-0">
      <FormComponent
        id="createAccountStatementForm"
        className="form-signIn"
        action={handleSubmit}
      >
        <div className=" container-sections-forms ml-20px mr-20px">
          <div className="grid-form-3-container gap-25">
            <span className="text-black large bold grid-span-3-columns">
              Crear cuenta de cobro
            </span>
            <InputComponent
              idInput="id"
              label={<>No. Cuenta de cobro</>}
              typeInput="text"
              register={register}
              errors={errors}
              className="input-basic medium"
              classNameLabel="text-black big bold"
              disabled
            />
            <SelectComponent
              idInput="contractCode"
              control={control}
              errors={errors}
              data={contractsData}
              label={
                <>
                  Contrato <span>*</span>
                </>
              }
              className="select-basic medium"
              classNameLabel="text-black big bold"
              placeholder="Seleccione."
              filter
            />
            <InputComponent
              idInput="nit"
              label={<>NIT</>}
              typeInput="text"
              register={register}
              className="input-basic medium"
              classNameLabel="text-black big bold"
              disabled
            />

            <div className="grid-span-3-columns">
              <InputComponent
                idInput="business"
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
              disabled
            />

            <DatePickerComponent
              idInput="expirationDate"
              control={control}
              label={<>Fecha de vencimiento</>}
              errors={errors}
              classNameLabel="text-black big bold"
              className="dataPicker-basic  medium "
              placeholder="DD/MM/YYYY"
              dateFormat="dd/mm/yy"
              maxDate={new Date()}
              disabled
            />
            <SelectComponent
              idInput="paymentType"
              control={control}
              errors={errors}
              data={paymentTypeData}
              label={
                <>
                  Forma de pago <span>*</span>
                </>
              }
              className="select-basic medium"
              classNameLabel="text-black big bold"
              placeholder="Seleccione."
            />
            <InputNumberComponent
              idInput="valuePay"
              control={control}
              label={
                <>
                  Valor <span>*</span>
                </>
              }
              errors={errors}
              classNameLabel="text-black big bold"
              className="inputNumber-basic medium"
              mode="currency"
              currency="COP"
              locale="es-CO"
              minFractionDigits={0}
              maxFractionDigits={2}
            />
            <div className="grid-span-4-columns">
              <InputComponent
                idInput="valueLabel"
                label={<>Valor en letras</>}
                typeInput="text"
                register={register}
                errors={errors}
                className="input-basic medium"
                classNameLabel="text-black big bold"
                disabled
              />
            </div>
            <div className="grid-span-4-columns">
              <TextAreaComponent
                idInput="concept"
                className="text-area-basic"
                classNameLabel="text-black big bold"
                label={
                  <>
                    Concepto de cobro <span>*</span>
                  </>
                }
                register={register}
                errors={errors}
              />
            </div>
          </div>
          <div
            style={{
              marginTop: "8px",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            Máx 500 caracteres.
          </div>
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

export default memo(CreateAccountStatement);
