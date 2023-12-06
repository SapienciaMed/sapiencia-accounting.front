import { memo } from "react";
import {
  SelectComponent,
  InputComponent,
  ButtonComponent,
} from "../../../common/components/Form";
import { DatePickerComponent } from "../../../common/components/Form/input-date.component";
import { TextAreaComponent } from "../../../common/components/Form/input-text-area.component";
import { useGetDetailTechActive } from "../hooks/getDetailTechActive.hook";
import { Link } from "react-router-dom";
import Svgs from "../../../public/images/icons/svgs";

const DetailsTechActive = () => {
  const {
    register,
    control,
    handleClose,
    showHistoryTechActive,
    type,
    typeActive,
    validateActionAccess,
  } = useGetDetailTechActive();

  return (
    <div className="container-sections-forms mt-24px ml-16px mr-16px p-0">
      <div className="container-sections-forms ml-20px mr-20px">
        {type === "Otros" && (
          <div className="grid-form-3-container gap-25">
            <span className="text-black extra-large bold grid-span-3-columns">
              Consulta detalle activo tecnológico
            </span>
          </div>
        )}
        {type === "Computo" && (
          <div className="grid-form-3-container gap-25">
            <span className="text-black extra-large bold grid-span-3-columns">
              Consulta detalle equipo de computo
            </span>
          </div>
        )}
        {(type === undefined || type === null) && (
          <div className="grid-form-3-container gap-25">
            <span className="text-black extra-large bold grid-span-3-columns">
              Tipo dispositivo no seleccionado
            </span>
          </div>
        )}
        {validateActionAccess("ACTIVO_FIJO_HISTORICO") && (
          <div className="button-save-container-display mr-33px button-create-business">
            <Link to="#" className="text-links" onClick={showHistoryTechActive}>
              Ver Historico
              <div className="text-links ml-5px">
                <Svgs svg="view" width={16} height={17} />
              </div>
            </Link>
          </div>
        )}
        <div className="grid-form-3-container gap-25 mt-28px">
          <SelectComponent
            idInput="type"
            control={control}
            label={<>Tipo dispositivo</>}
            className="select-basic medium"
            classNameLabel="text-black big bold"
            placeholder="Seleccionar"
            data={typeActive}
            disabled
          />
        </div>

        <div>
          {type === "Otros" && (
            <>
              <div className="grid-form-3-container gap-25 mt-28px">
                <InputComponent
                  idInput="campus"
                  disabled
                  label={<>Sede</>}
                  typeInput="text"
                  register={register}
                  className="input-basic medium"
                  classNameLabel="text-black big bold"
                />
                <InputComponent
                  idInput="area"
                  disabled
                  label={<>Área</>}
                  typeInput="text"
                  register={register}
                  className="input-basic medium"
                  classNameLabel="text-black big bold"
                />
                <InputComponent
                  idInput="status"
                  disabled
                  label={<>Estado</>}
                  typeInput="text"
                  register={register}
                  className="input-basic medium"
                  classNameLabel="text-black big bold"
                />
              </div>
              <div className="grid-form-2-container gap-25 mt-28px">
                <InputComponent
                  idInput="ownerId"
                  disabled
                  label={<>CC usuario - Nombres y apellidos</>}
                  typeInput="text"
                  register={register}
                  className="input-basic medium"
                  classNameLabel="text-black big bold"
                />
                <InputComponent
                  idInput="clerk"
                  disabled
                  label={<>Funcionario</>}
                  typeInput="text"
                  register={register}
                  className="input-basic medium"
                  classNameLabel="text-black big bold"
                />
              </div>
              <div className="grid-form-3-container gap-25 mt-28px">
                <DatePickerComponent
                  idInput="ownerDate"
                  disabled
                  control={control}
                  label={<>Fecha de adquisición</>}
                  classNameLabel="text-black big bold"
                  className="dataPicker-basic  medium "
                  dateFormat="dd/mm/yy"
                  maxDate={new Date()}
                />

                <InputComponent
                  idInput="equipmentType"
                  disabled
                  label={<>Tipo equipo</>}
                  typeInput="text"
                  register={register}
                  className="input-basic medium"
                  classNameLabel="text-black big bold"
                />
                <InputComponent
                  idInput="brand"
                  disabled
                  label={<>Marca</>}
                  typeInput="text"
                  register={register}
                  className="input-basic medium"
                  classNameLabel="text-black big bold"
                />
              </div>
              <div className="grid-form-3-container gap-25 mt-28px">
                <InputComponent
                  idInput="model"
                  disabled
                  label={<>Modelo</>}
                  typeInput="text"
                  register={register}
                  className="input-basic medium"
                  classNameLabel="text-black big bold"
                />

                <InputComponent
                  idInput="plate"
                  disabled
                  label={<>Placa activo</>}
                  typeInput="text"
                  register={register}
                  className="input-basic medium"
                  classNameLabel="text-black big bold"
                />
                <InputComponent
                  idInput="serial"
                  disabled
                  label={<>Serial</>}
                  typeInput="text"
                  register={register}
                  className="input-basic medium"
                  classNameLabel="text-black big bold"
                />
              </div>
              <div className="grid-span-4-columns mt-28px">
                <TextAreaComponent
                  idInput="observations"
                  disabled
                  className="text-area-basic"
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
            </>
          )}
          {type === "Computo" && (
            <>
              <div className="grid-form-3-container gap-25 mt-28px">
                <InputComponent
                  idInput="campus"
                  disabled
                  label={<>Sede</>}
                  typeInput="text"
                  register={register}
                  className="input-basic medium"
                  classNameLabel="text-black big bold"
                />

                <InputComponent
                  idInput="area"
                  disabled
                  label={<>Área</>}
                  typeInput="text"
                  register={register}
                  className="input-basic medium"
                  classNameLabel="text-black big bold"
                />

                <InputComponent
                  idInput="status"
                  disabled
                  label={<>Estado</>}
                  typeInput="text"
                  register={register}
                  className="input-basic medium"
                  classNameLabel="text-black big bold"
                />
              </div>
              <div className="grid-form-2-container gap-25 mt-28px">
                <InputComponent
                  idInput="ownerId"
                  disabled
                  label={<>CC usuario - Nombres y apellidos</>}
                  typeInput="text"
                  register={register}
                  className="input-basic medium"
                  classNameLabel="text-black big bold"
                />
                <InputComponent
                  idInput="clerk"
                  disabled
                  label={<>Funcionario</>}
                  typeInput="text"
                  register={register}
                  className="input-basic medium"
                  classNameLabel="text-black big bold"
                />
              </div>
              <div className="grid-form-3-container gap-25 mt-28px">
                <DatePickerComponent
                  idInput="ownerDate"
                  disabled
                  control={control}
                  label={<>Fecha de adquisición</>}
                  classNameLabel="text-black big bold"
                  className="dataPicker-basic  medium "
                  dateFormat="dd/mm/yy"
                  maxDate={new Date()}
                />

                <InputComponent
                  idInput="equipmentType"
                  disabled
                  label={<>Tipo equipo</>}
                  typeInput="text"
                  register={register}
                  className="input-basic medium"
                  classNameLabel="text-black big bold"
                />
                <InputComponent
                  idInput="brand"
                  disabled
                  label={<>Marca</>}
                  typeInput="text"
                  register={register}
                  className="input-basic medium"
                  classNameLabel="text-black big bold"
                />
              </div>
              <div className="grid-form-3-container gap-25 mt-28px">
                <InputComponent
                  idInput="model"
                  disabled
                  label={<>Modelo</>}
                  typeInput="text"
                  register={register}
                  className="input-basic medium"
                  classNameLabel="text-black big bold"
                />

                <InputComponent
                  idInput="plate"
                  disabled
                  label={<>Placa activo</>}
                  typeInput="text"
                  register={register}
                  className="input-basic medium"
                  classNameLabel="text-black big bold"
                />
                <InputComponent
                  idInput="serial"
                  disabled
                  label={<>Serial</>}
                  typeInput="text"
                  register={register}
                  className="input-basic medium"
                  classNameLabel="text-black big bold"
                />
              </div>
              <div className="grid-form-3-container gap-25 mt-28px">
                <InputComponent
                  idInput="cpu"
                  disabled
                  label={<>Procesador</>}
                  typeInput="text"
                  register={register}
                  className="input-basic medium"
                  classNameLabel="text-black big bold"
                />

                <InputComponent
                  idInput="ram"
                  disabled
                  label={<>Memoria Ram</>}
                  typeInput="text"
                  register={register}
                  className="input-basic medium"
                  classNameLabel="text-black big bold"
                />
                <InputComponent
                  idInput="storage"
                  disabled
                  label={<>Disco duro</>}
                  typeInput="text"
                  register={register}
                  className="input-basic medium"
                  classNameLabel="text-black big bold"
                />
              </div>
              <div className="grid-form-3-container gap-25 mt-28px">
                <InputComponent
                  idInput="os"
                  disabled
                  label={<>Sistema operativo</>}
                  typeInput="text"
                  register={register}
                  className="input-basic medium"
                  classNameLabel="text-black big bold"
                />
              </div>

              <div className="grid-span-4-columns mt-28px">
                <TextAreaComponent
                  idInput="observations"
                  disabled
                  className="text-area-basic"
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
            </>
          )}
        </div>
      </div>
      <div className="button-save-container-display mr-24px">
        <ButtonComponent
          value="Cerrar"
          action={handleClose}
          className="button-save big"
        />
      </div>
    </div>
  );
};

export default memo(DetailsTechActive);
