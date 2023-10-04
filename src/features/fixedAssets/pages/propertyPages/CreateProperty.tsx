import { memo } from "react";
import {
  FormComponent,
  InputComponent,
  SelectComponent,
  ButtonComponent,
} from "../../../../common/components/Form";
import { DatePickerComponent } from "../../../../common/components/Form/input-date.component";
import { TextAreaComponent } from "../../../../common/components/Form/input-text-area.component";
import { useManageProperty } from "../../hooks/propertyHooks/createProperty";

const CreatePropertyForm = () => {
  const {
    control,
    handleSubmit,
    register,
    errors,
    handleCancel,
    isValid,
    equipmentStatus,
    area,
    officers,
    activeOwner,
    identification,
    fullName,
  } = useManageProperty();
  console.log("isValid:", isValid);
  console.log("errors:", errors);
  return (
    <div className="container-sections-forms mt-24px ml-16px mr-16px p-0">
      <FormComponent
        id="CreatePropertyForm"
        className="form-signIn"
        action={handleSubmit}
      >
        <div className="container-sections-forms ml-20px mr-20px">
          <div className="grid-form-3-container gap-25">
            <span className="text-black extra-large bold grid-span-3-columns">
              Gestionar bienes muebles
            </span>
          </div>

          <div className="grid-form-3-container gap-25 mt-25px">
            <SelectComponent
              idInput="area"
              control={control}
              errors={errors}
              label={
                <>
                  Area <span>*</span>
                </>
              }
              className="select-basic medium"
              classNameLabel="text-black big bold"
              placeholder="Seleccionar"
              data={area}
              filter
            />

            <SelectComponent
              idInput="equipmentStatus"
              control={control}
              errors={errors}
              label={
                <>
                  Estado equipo <span>*</span>
                </>
              }
              className="select-basic medium"
              classNameLabel="text-black big bold"
              placeholder="Seleccionar"
              data={equipmentStatus}
              filter
            />
            <SelectComponent
              idInput="workerId"
              control={control}
              errors={errors}
              label={
                <>
                  CC usuario <span>*</span>
                </>
              }
              className="select-basic medium"
              classNameLabel="text-black big bold"
              placeholder="Seleccionar"
              data={identification}
              filter
            />
          </div>

          <div className="grid-form-3-container gap-25 mt-25px">
            <SelectComponent
              idInput="workerId"
              control={control}
              errors={errors}
              label={
                <>
                  Nombres y apellidos <span>*</span>
                </>
              }
              className="select-basic medium"
              classNameLabel="text-black big bold"
              placeholder="Seleccionar"
              data={fullName}
              filter
            />
            <SelectComponent
              idInput="clerk"
              control={control}
              errors={errors}
              label={
                <>
                  Funcionario <span>*</span>
                </>
              }
              className="select-basic medium"
              classNameLabel="text-black big bold"
              placeholder="Seleccionar"
              data={officers}
              filter
            />
            <DatePickerComponent
              idInput="acquisitionDate"
              control={control}
              label={
                <>
                  Fecha de adquisición <span>*</span>
                </>
              }
              classNameLabel="text-black big bold"
              className="dataPicker-basic  medium "
              dateFormat="dd/mm/yy"
              maxDate={new Date()}
            />
          </div>
          <div className="grid-form-3-container gap-25 mt-25px">
            <InputComponent
              idInput="description"
              label={
                <>
                  Tipo activo/ descripción <span>*</span>
                </>
              }
              typeInput="text"
              register={register}
              errors={errors}
              className="input-basic medium"
              classNameLabel="text-black big bold"
            />
            <InputComponent
              idInput="brand"
              label={
                <>
                  Marca <span>*</span>
                </>
              }
              typeInput="text"
              register={register}
              errors={errors}
              className="input-basic medium"
              classNameLabel="text-black big bold"
            />
            <InputComponent
              idInput="model"
              label={
                <>
                  Modelo <span>*</span>
                </>
              }
              typeInput="text"
              register={register}
              errors={errors}
              className="input-basic medium"
              classNameLabel="text-black big bold"
            />
          </div>
          <div className="grid-form-3-container gap-25 mt-25px">
            <InputComponent
              idInput="plate"
              label={
                <>
                  Placa activo <span>*</span>
                </>
              }
              typeInput="text"
              register={register}
              errors={errors}
              className="input-basic medium"
              classNameLabel="text-black big bold"
            />
            <InputComponent
              idInput="measure"
              label={
                <>
                  Medidas <span>*</span>
                </>
              }
              typeInput="text"
              register={register}
              errors={errors}
              className="input-basic medium"
              classNameLabel="text-black big bold"
            />
            <SelectComponent
              idInput="activeOwner"
              control={control}
              errors={errors}
              data={activeOwner}
              label={
                <>
                  Propietario activo <span>*</span>
                </>
              }
              className="select-basic medium"
              classNameLabel="text-black big bold"
              placeholder="Seleccionar"
              filter
            />
          </div>
          <div className="grid-span-4-columns mt-28px">
            <TextAreaComponent
              idInput="observation"
              className="text-area-basic"
              classNameLabel="text-black big bold"
              label={
                <>
                  Observaciones <span>*</span>
                </>
              }
              register={register}
              errors={errors}
            />
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

export default memo(CreatePropertyForm);
