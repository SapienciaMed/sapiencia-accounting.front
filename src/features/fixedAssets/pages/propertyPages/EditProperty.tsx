import { memo } from "react";
import {
  ButtonComponent,
  FormComponent,
  InputComponent,
  SelectComponent,
} from "../../../../common/components/Form";
import { DatePickerComponent } from "../../../../common/components/Form/input-date.component";
import { TextAreaComponent } from "../../../../common/components/Form/input-text-area.component";
import { useEditProperty } from "../../hooks/propertyHooks/ediProperty";

const EditProperty = () => {
  const {
    control,
    register,
    errors,
    isValid,
    handleCancel,
    onSubmit,
    submitDisabled,
    area,
    equipmentStatus,
    identification,
    fullName,
    officers,
    handleChange,
    activeOwner,
  } = useEditProperty();

  return (
    <>
      <FormComponent id="editFixedAssets" action={onSubmit}>
        <div className="container-sections-forms mt-24px ml-12px mr-16px p-0">
          <div className=" container-sections-forms ml-20px mr-20px">
            <div className="grid-form-3-container gap-25">
              <span className="text-black large bold grid-span-3-columns">
                Editar bien mueble
              </span>

              <SelectComponent
                idInput="area"
                control={control}
                errors={errors}
                label={<>Área</>}
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
                label={<>Estado </>}
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
                label={<>CC usuario</>}
                className="select-basic medium"
                classNameLabel="text-black big bold"
                placeholder="Seleccionar"
                data={identification}
                filter
              />

              <SelectComponent
                idInput="workerId"
                control={control}
                errors={errors}
                label={<>Nombres y apellidos</>}
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
                label={<>Funcionario</>}
                className="select-basic medium"
                classNameLabel="text-black big bold"
                placeholder="Seleccionar"
                data={officers}
                filter
              />
              <DatePickerComponent
                idInput="acquisitionDate"
                control={control}
                label={<>Fecha de adquisición</>}
                errors={errors}
                classNameLabel="text-black big bold"
                className="dataPicker-basic  medium "
                placeholder="DD/MM/YYYY"
                dateFormat="dd/mm/yy"
                maxDate={new Date()}
              />
              <InputComponent
                idInput="description"
                label={<>Topo activo/ descripción</>}
                typeInput="text"
                register={register}
                errors={errors}
                onChange={handleChange}
                className="input-basic medium"
                classNameLabel="text-black big bold"
              />
              <InputComponent
                idInput="brand"
                label={<>Marca</>}
                typeInput="text"
                register={register}
                onChange={handleChange}
                errors={errors}
                className="input-basic medium"
                classNameLabel="text-black big bold"
              />
              <InputComponent
                idInput="model"
                label={<>Modelo</>}
                typeInput="text"
                register={register}
                errors={errors}
                onChange={handleChange}
                className="input-basic medium"
                classNameLabel="text-black big bold"
              />
              <InputComponent
                idInput="plate"
                label={<>Placa activo</>}
                typeInput="text"
                register={register}
                errors={errors}
                onChange={handleChange}
                className="input-basic medium"
                classNameLabel="text-black big bold"
                disabled
              />
              <InputComponent
                idInput="measure"
                label={<>Medidas</>}
                typeInput="text"
                register={register}
                errors={errors}
                onChange={handleChange}
                className="input-basic medium"
                classNameLabel="text-black big bold"
              />
              <SelectComponent
                idInput="activeOwner"
                control={control}
                errors={errors}
                label={<>Propietario activo</>}
                className="select-basic medium"
                classNameLabel="text-black big bold"
                placeholder="Seleccionar"
                data={activeOwner}
                filter
              />
            </div>
            <div className="mt-20px grid-span-4-columns">
              <TextAreaComponent
                idInput="observation"
                className="text-area-basic"
                errors={errors}
                onChange={handleChange}
                classNameLabel="text-black big bold"
                label={<>Observaciones</>}
                register={register}
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
            disabled={!isValid || submitDisabled}
            className={`button-save ${
              !isValid || submitDisabled ? "disabled-black" : ""
            } big`}
            type="submit"
          />
        </div>
      </FormComponent>
    </>
  );
};

export default memo(EditProperty);
