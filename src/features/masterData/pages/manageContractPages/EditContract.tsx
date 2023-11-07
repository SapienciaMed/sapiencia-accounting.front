import { memo } from "react";
import {
  ButtonComponent,
  FormComponent,
  InputComponent,
  SelectComponent,
} from "../../../../common/components/Form";
import { useEditContract } from "../../hooks/manageContractHooks/EditContract";

const DetailContract = () => {
  const {
    control,
    register,
    errors,
    onSubmit,
    handleCancel,
    nitData,
    isValid,
  } = useEditContract();
  return (
    <div className="container-sections-forms mt-24px ml-16px mr-16px p-0">
      <FormComponent
        id="EditManageCompanyNameForm"
        className="form-signIn"
        action={onSubmit}
      >
        <div className="container-sections-forms ml-20px mr-20px">
          <div className="grid-form-3-container gap-25">
            <span className="text-black large bold grid-span-3-columns">
              Editar contrato
            </span>
          </div>
          <div className="gap-25 mt-25px grid-form-2-container">
            <div>
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
            </div>
            <div>
              <SelectComponent
                idInput="businessCode"
                control={control}
                errors={errors}
                data={nitData}
                label={
                  <>
                    NIT <span>*</span>
                  </>
                }
                className="select-basic medium"
                classNameLabel="text-black big bold"
                placeholder="Seleccione."
                filter
              />
            </div>
          </div>
          <div className="grid-span-3-columns mt-20px">
            <InputComponent
              idInput="business.name"
              label={<>Razón social / Nombre</>}
              typeInput="text"
              register={register}
              errors={errors}
              className="input-basic medium"
              classNameLabel="text-black big bold"
              disabled
            />
          </div>
          <div className="grid-form-4-container gap-25 mt-25px">
            <InputComponent
              idInput="business.municipality"
              label={<>Ciudad</>}
              typeInput="text"
              register={register}
              errors={errors}
              className="input-basic medium"
              classNameLabel="text-black big bold"
              disabled
            />
            <InputComponent
              idInput="business.address"
              label={<>Dirección</>}
              typeInput="text"
              register={register}
              errors={errors}
              className="input-basic medium"
              classNameLabel="text-black big bold"
              disabled
            />
            <InputComponent
              idInput="business.phone"
              label={<>Teléfono</>}
              typeInput="text"
              register={register}
              errors={errors}
              className="input-basic medium"
              classNameLabel="text-black big bold"
              disabled
            />
            <InputComponent
              idInput="email"
              label={<>Correo electrónico</>}
              typeInput="text"
              register={register}
              errors={errors}
              className="input-basic medium"
              classNameLabel="text-black big bold"
            />
          </div>
          <div className="gap-25 mt-25px grid-form-3-container">
            <div className="grid-span-2-columns">
              <InputComponent
                idInput="sender"
                label={<>Persona a la que se remite la cuenta</>}
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
                label={<>Cargo</>}
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

export default memo(DetailContract);
