import { memo } from "react";

import { useCreateTechActive } from "../hooks/createTechActive";
import {
  FormComponent,
  SelectComponent,
  InputComponent,
  ButtonComponent,
} from "../../../common/components/Form";
import { DatePickerComponent } from "../../../common/components/Form/input-date.component";
import { TextAreaComponent } from "../../../common/components/Form/input-text-area.component";
const CreateTechActive = () => {
  const {
    control,
    handleSubmit,
    register,
    errors,
    handleCancel,
    isValid,
    // identification,
    // fullName,
    area,
    sede,
    equipmentStatus,
    officers,
    activeOwner,
    typeDispositive,
  } = useCreateTechActive();
  return (
    <div className="container-sections-forms mt-24px ml-16px mr-16px p-0">
      <FormComponent
        id="CreateTechActive"
        className="form-signIn"
        action={handleSubmit}
      >
        <div className="container-sections-forms ml-20px mr-20px">
          <div className="grid-form-3-container gap-25">
            <span className="text-black extra-large bold grid-span-3-columns">
              Crear bienes mueble
            </span>
          </div>
          <div className="grid-form-3-container gap-25 mt-28px">
            <SelectComponent
              idInput="typeDispositive"
              control={control}
              errors={errors}
              label={<>Tipo dispositivo</>}
              className="select-basic medium"
              classNameLabel="text-black big bold"
              placeholder="Seleccionar"
              data={[
                { name: "Perifericos u otros dispositivos", value: 0 },
                { name: "Equipo de computo", value: 1 },
              ]}
              filter
            />
          </div>

          <div>
            {typeDispositive === 0 && (
              <>
                <div className="grid-form-3-container gap-25 mt-28px">
                  <SelectComponent
                    idInput="campus"
                    control={control}
                    errors={errors}
                    label={
                      <>
                        Sede <span>*</span>
                      </>
                    }
                    className="select-basic medium"
                    classNameLabel="text-black big bold"
                    placeholder="Seleccionar"
                    data={sede}
                    filter
                  />

                  <SelectComponent
                    idInput="area"
                    control={control}
                    errors={errors}
                    label={
                      <>
                        Área <span>*</span>
                      </>
                    }
                    className="select-basic medium"
                    classNameLabel="text-black big bold"
                    placeholder="Seleccionar"
                    data={area}
                    filter
                  />
                  <SelectComponent
                    idInput="status"
                    control={control}
                    errors={errors}
                    label={
                      <>
                        Estado <span>*</span>
                      </>
                    }
                    className="select-basic medium"
                    classNameLabel="text-black big bold"
                    placeholder="Seleccionar"
                    data={equipmentStatus}
                    filter
                  />
                </div>
                <div className="grid-form-3-container gap-25 mt-28px">
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
                    // data={identification}
                    filter
                  />

                  <SelectComponent
                    idInput="ownerId"
                    control={control}
                    errors={errors}
                    label={
                      <>
                        Nombre y apellidos <span>*</span>
                      </>
                    }
                    className="select-basic medium"
                    classNameLabel="text-black big bold"
                    placeholder="Seleccionar"
                    // data={fullName}
                    filter
                  />
                  <SelectComponent
                    idInput="official"
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
                </div>
                <div className="grid-form-3-container gap-25 mt-28px">
                  <DatePickerComponent
                    idInput="ownerDate"
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

                  <InputComponent
                    idInput="equipmentType"
                    label={
                      <>
                        Tipo equipo <span>*</span>
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
                </div>
                <div className="grid-form-3-container gap-25 mt-28px">
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

                  <InputComponent
                    idInput="plate"
                    label={
                      <>
                        Placa activo <span>*</span>
                      </>
                    }
                    typeInput="number"
                    register={register}
                    errors={errors}
                    className="input-basic medium"
                    classNameLabel="text-black big bold"
                  />
                  <InputComponent
                    idInput="serial"
                    label={
                      <>
                        Serial <span>*</span>
                      </>
                    }
                    typeInput="text"
                    register={register}
                    errors={errors}
                    className="input-basic medium"
                    classNameLabel="text-black big bold"
                  />
                </div>
                <div className="grid-span-4-columns mt-28px">
                  <TextAreaComponent
                    idInput="observations"
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
              </>
            )}
            {typeDispositive === 1 && (
              <>
                <div className="grid-form-3-container gap-25 mt-28px">
                  <SelectComponent
                    idInput="sede"
                    control={control}
                    errors={errors}
                    label={
                      <>
                        Sede <span>*</span>
                      </>
                    }
                    className="select-basic medium"
                    classNameLabel="text-black big bold"
                    placeholder="Seleccionar"
                    data={sede}
                    filter
                  />

                  <SelectComponent
                    idInput="area"
                    control={control}
                    errors={errors}
                    label={
                      <>
                        Área <span>*</span>
                      </>
                    }
                    className="select-basic medium"
                    classNameLabel="text-black big bold"
                    placeholder="Seleccionar"
                    data={area}
                    filter
                  />
                  <SelectComponent
                    idInput="status"
                    control={control}
                    errors={errors}
                    label={
                      <>
                        Estado <span>*</span>
                      </>
                    }
                    className="select-basic medium"
                    classNameLabel="text-black big bold"
                    placeholder="Seleccionar"
                    data={equipmentStatus}
                    filter
                  />
                </div>
                <div className="grid-form-3-container gap-25 mt-28px">
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
                    // data={identification}
                    filter
                  />

                  <SelectComponent
                    idInput="workerId"
                    control={control}
                    errors={errors}
                    label={
                      <>
                        Nombre y apellidos <span>*</span>
                      </>
                    }
                    className="select-basic medium"
                    classNameLabel="text-black big bold"
                    placeholder="Seleccionar"
                    // data={fullName}
                    filter
                  />
                  <SelectComponent
                    idInput="official"
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
                </div>
                <div className="grid-form-3-container gap-25 mt-28px">
                  <DatePickerComponent
                    idInput="ownerDate"
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

                  <InputComponent
                    idInput="equipmentType"
                    label={
                      <>
                        Tipo equipo <span>*</span>
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
                </div>
                <div className="grid-form-3-container gap-25 mt-28px">
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

                  <InputComponent
                    idInput="plate"
                    label={
                      <>
                        Placa activo <span>*</span>
                      </>
                    }
                    typeInput="number"
                    register={register}
                    errors={errors}
                    className="input-basic medium"
                    classNameLabel="text-black big bold"
                  />
                  <InputComponent
                    idInput="serial"
                    label={
                      <>
                        Serial <span>*</span>
                      </>
                    }
                    typeInput="text"
                    register={register}
                    errors={errors}
                    className="input-basic medium"
                    classNameLabel="text-black big bold"
                  />
                </div>
                <div className="grid-form-3-container gap-25 mt-28px">
                  <InputComponent
                    idInput="cpu"
                    label={
                      <>
                        Procesador <span>*</span>
                      </>
                    }
                    typeInput="text"
                    register={register}
                    errors={errors}
                    className="input-basic medium"
                    classNameLabel="text-black big bold"
                  />

                  <InputComponent
                    idInput="ram"
                    label={
                      <>
                        Memoria Ram <span>*</span>
                      </>
                    }
                    typeInput="number"
                    register={register}
                    errors={errors}
                    className="input-basic medium"
                    classNameLabel="text-black big bold"
                  />
                  <InputComponent
                    idInput="storage"
                    label={
                      <>
                        Disco duro <span>*</span>
                      </>
                    }
                    typeInput="text"
                    register={register}
                    errors={errors}
                    className="input-basic medium"
                    classNameLabel="text-black big bold"
                  />
                </div>
                <div className="grid-form-3-container gap-25 mt-28px">
                  <InputComponent
                    idInput="os"
                    label={
                      <>
                        Sistema operativo <span>*</span>
                      </>
                    }
                    typeInput="text"
                    register={register}
                    errors={errors}
                    className="input-basic medium"
                    classNameLabel="text-black big bold"
                  />
                </div>

                <div className="grid-span-4-columns mt-28px">
                  <TextAreaComponent
                    idInput="observations"
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
              </>
            )}
          </div>
        </div>
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
export default memo(CreateTechActive);
