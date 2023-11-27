import { memo } from "react";
import {
  ButtonComponent,
  FormComponent,
  InputComponent,
  SelectComponent,
} from "../../../../common/components/Form";
import { useManageContract } from "../../hooks/manageContractHooks/CreateManageContract";

const CreateManageContract = () => {
  const {
    control,
    handleSubmit,
    register,
    errors,
    handleCancel,
    isValid,
    businessData,
  } = useManageContract();

  return (
    <div className="container-sections-forms mt-24px ml-16px mr-16px p-0">
      <FormComponent
        id="CreateManageContractForm"
        className="form-signIn"
        action={handleSubmit}
      >
        <div className="container-sections-forms ml-20px mr-20px">
          <div className="grid-form-3-container gap-25">
            <span className="text-black large bold grid-span-3-columns">
              Crear contrato
            </span>
            <InputComponent
              idInput="contractId"
              label={
                <>
                  Contrato <span>*</span>
                </>
              }
              typeInput="text"
              register={register}
              errors={errors}
              className="input-basic medium"
              classNameLabel="text-black big bold"
            />
            <div className="grid-span-2-columns">
              <SelectComponent
                idInput="value"
                control={control}
                errors={errors}
                label={<>NIT - Razón social /Nombre</>}
                className="select-basic medium"
                classNameLabel="text-black big bold"
                placeholder="Seleccionar"
                data={businessData}
                filter
              />
            </div>
          </div>
          <div className="grid-form-3-container gap-25 mt-25px">
            <InputComponent
              disabled
              idInput="data.municipality"
              label={
                <>
                  Ciudad <span>*</span>
                </>
              }
              typeInput="text"
              register={register}
              errors={errors}
              className="input-basic medium"
              classNameLabel="text-black big bold"
            />
            <InputComponent
              disabled
              idInput="data.address"
              label={
                <>
                  Dirección <span>*</span>
                </>
              }
              typeInput="text"
              register={register}
              errors={errors}
              className="input-basic medium"
              classNameLabel="text-black big bold"
            />
            <InputComponent
              disabled
              idInput="data.phone"
              label={
                <>
                  Teléfono <span>*</span>
                </>
              }
              typeInput="number"
              register={register}
              errors={errors}
              className="input-basic medium"
              classNameLabel="text-black big bold"
            />
          </div>
          <div className="gap-25 mt-25px grid-form-3-container">
            <div>
              <InputComponent
                idInput="sender"
                label={
                  <>
                    Persona a la que se remite la cuenta <span>*</span>
                  </>
                }
                typeInput="text"
                register={register}
                errors={errors}
                className="input-basic medium"
                classNameLabel="text-black big bold"
              />
            </div>
            <div>
              <InputComponent
                idInput="chargeSender"
                label={
                  <>
                    Cargo <span>*</span>
                  </>
                }
                typeInput="text"
                register={register}
                errors={errors}
                className="input-basic medium"
                classNameLabel="text-black big bold"
              />
            </div>
            <div>
              <InputComponent
                idInput="email"
                label={
                  <>
                    Correo electrónico <span>*</span>
                  </>
                }
                typeInput="text"
                register={register}
                errors={errors}
                className="input-basic medium"
                classNameLabel="text-black big bold"
              />
            </div>
          </div>
          <div className="gap-25 mt-25px grid-form-2-container">
            <div>
              <InputComponent
                idInput="debitAccount"
                label={
                  <>
                    Cuenta contable débito <span>*</span>
                  </>
                }
                typeInput="text"
                register={register}
                errors={errors}
                className="input-basic medium"
                classNameLabel="text-black big bold"
              />
            </div>
            <div>
              <InputComponent
                idInput="creditAccount"
                label={
                  <>
                    Cuenta contable crédito <span>*</span>
                  </>
                }
                typeInput="text"
                register={register}
                errors={errors}
                className="input-basic medium"
                classNameLabel="text-black big bold"
              />
            </div>
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
            disabled={!isValid || Object.keys(errors).length > 0}
            className={`button-save ${
              !isValid || Object.keys(errors).length > 0 ? "disabled-black" : ""
            } big`}
          />
        </div>
      </FormComponent>
    </div>
  );
};

export default memo(CreateManageContract);
