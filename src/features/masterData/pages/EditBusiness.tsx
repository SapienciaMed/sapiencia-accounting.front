import { memo, useState } from "react";
import {
  ButtonComponent,
  FormComponent,
  InputComponent,
  SelectComponent,
} from "../../../common/components/Form";
import { useGetMunicipality } from "../hooks/getMunicipality";
import { useEditBusiness } from "../hooks/editBusiness";
import { IGetBusiness } from "../../../common/interfaces/accountStatement.interface";

const DetailBusiness = () => {
  const { control, register, errors, onSubmit, handleCancel, watch } =
    useEditBusiness();
  useState<IGetBusiness>(null);
  const { municipality } = useGetMunicipality();
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
              Crear razón social
            </span>
            <InputComponent
              idInput="nit"
              label={
                <>
                  NIT <span>*</span>
                </>
              }
              typeInput="text"
              register={register}
              errors={errors}
              className="input-basic medium"
              classNameLabel="text-black big bold"
            />
            <div className="grid-span-2-columns">
              <InputComponent
                idInput="name"
                label={
                  <>
                    Razón social / Nombre <span>*</span>
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
            />
            <InputComponent
              idInput="phone"
              label={
                <>
                  Teléfono <span>*</span>
                </>
              }
              typeInput="text"
              register={register}
              errors={errors}
              className="input-basic medium"
              classNameLabel="text-black big bold"
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
            className="button-save big"
            type="submit"
          />
        </div>
      </FormComponent>
    </div>
  );
};

export default memo(DetailBusiness);
