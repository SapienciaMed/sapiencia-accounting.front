import { memo } from "react";
import {
  ButtonComponent,
  FormComponent,
  InputComponent,
  SelectComponent,
} from "../../../../common/components/Form";
import { useGetMunicipality } from "../../hooks/businessHooks/getMunicipality";
import { useManageCompanyName } from "../../hooks/businessHooks/manageCompanyName";

const CreateManageContract = () => {
  const { control, handleSubmit, register, errors, handleCancel, isValid } =
    useManageCompanyName();
  const { municipality } = useGetMunicipality();
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
              idInput="contrato"
              label={
                <>
                  contrato <span>*</span>
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
                idInput="id"
                control={control}
                errors={errors}
                // data={business}
                label={<>NIT - Razón social /Nombre</>}
                className="select-basic medium"
                classNameLabel="text-black big bold"
                placeholder="Seleccionar"
                filter
              />
            </div>
          </div>
          <div className="grid-form-4-container gap-25 mt-25px">
            <SelectComponent
              idInput="municipalityCode"
              control={control}
              errors={errors}
              data={municipality}
              label={
                <>
                  Ciudad <span>*</span>
                </>
              }
              className="select-basic medium"
              classNameLabel="text-black big bold"
              placeholder="Seleccione."
              filter
              disabled
            />
            <InputComponent
              idInput="address"
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
              disabled
            />
            <InputComponent
              idInput="phone"
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
              disabled
            />
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
              disabled
            />
          </div>
          <div className="gap-25 mt-25px grid-form-3-container">
            <div className="grid-span-2-columns">
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
                disabled
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
                disabled
              />
            </div>
          </div>
          <div className="gap-25 mt-25px grid-form-2-container">
            <div>
              <InputComponent
                idInput="1"
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
                idInput="2"
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
