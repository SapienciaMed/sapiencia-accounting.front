import { memo } from "react";
import {
  ButtonComponent,
  InputComponent,
  SelectComponent,
} from "../../../../common/components/Form";
import { DatePickerComponent } from "../../../../common/components/Form/input-date.component";
import { TextAreaComponent } from "../../../../common/components/Form/input-text-area.component";
import { useGetDetailProperty } from "../../hooks/propertyHooks/getDetailProperty.hook";
import Svgs from "../../../../public/images/icons/svgs";

const DetailProperty = () => {
  const { register, control, handleClose } = useGetDetailProperty();
  return (
    <>
      <div className="container-sections-forms mt-24px ml-12px mr-16px p-0">
        <div className=" container-sections-forms ml-20px mr-20px">
          <div className="grid-form-3-container gap-25">
            <span className="text-black large bold grid-span-2-columns">
              Consulta detalle bien inmueble
            </span>
            <span className="text-links viewHistoricals">
              Ver Historico &nbsp;
              <Svgs svg="view" width={16} height={17} />
            </span>

            <InputComponent
              idInput="area"
              label={<>Área</>}
              typeInput="text"
              register={register}
              className="input-basic medium"
              classNameLabel="text-black big bold"
              disabled
            />
            <InputComponent
              idInput="equipmentStatus"
              label={<>Estado</>}
              typeInput="text"
              register={register}
              className="input-basic medium"
              classNameLabel="text-black big bold"
              disabled
            />
            <InputComponent
              idInput="userIdentification"
              label={<>CC usuario</>}
              typeInput="text"
              register={register}
              className="input-basic medium"
              classNameLabel="text-black big bold"
              disabled
            />

            <InputComponent
              idInput="fullName"
              label={<>Nombres y apellidos</>}
              typeInput="text"
              register={register}
              className="input-basic medium"
              classNameLabel="text-black big bold"
              disabled
            />
            <InputComponent
              idInput="clerk"
              label={<>Funcionario</>}
              typeInput="text"
              register={register}
              className="input-basic medium"
              classNameLabel="text-black big bold"
              disabled
            />
            <DatePickerComponent
              idInput="acquisitionDate"
              control={control}
              label={<>Fecha de adquisición</>}
              classNameLabel="text-black big bold"
              className="dataPicker-basic  medium "
              placeholder="DD/MM/YYYY"
              dateFormat="dd/mm/yy"
              maxDate={new Date()}
              disabled
            />
            <InputComponent
              idInput="description"
              label={<>Topo activo/ descripción</>}
              typeInput="text"
              register={register}
              className="input-basic medium"
              classNameLabel="text-black big bold"
              disabled
            />
            <InputComponent
              idInput="brand"
              label={<>Marca</>}
              typeInput="text"
              register={register}
              className="input-basic medium"
              classNameLabel="text-black big bold"
              disabled
            />
            <InputComponent
              idInput="model"
              label={<>Modelo</>}
              typeInput="text"
              register={register}
              className="input-basic medium"
              classNameLabel="text-black big bold"
              disabled
            />
            <InputComponent
              idInput="plate"
              label={<>Placa activo</>}
              typeInput="text"
              register={register}
              className="input-basic medium"
              classNameLabel="text-black big bold"
              disabled
            />
            <InputComponent
              idInput="measure"
              label={<>Medidas</>}
              typeInput="text"
              register={register}
              className="input-basic medium"
              classNameLabel="text-black big bold"
              disabled
            />
            <InputComponent
              idInput="activeOwner"
              label={<>Propietario activo</>}
              typeInput="text"
              register={register}
              className="input-basic medium"
              classNameLabel="text-black big bold"
              disabled
            />
          </div>
          <div className="mt-20px grid-span-4-columns">
            <TextAreaComponent
              idInput="observation"
              className="text-area-basic"
              classNameLabel="text-black big bold"
              label={<>Observaciones</>}
              register={register}
              disabled
            />
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
          value="Cerrar"
          action={handleClose}
          className="button-save big"
        />
      </div>
    </>
  );
};

export default memo(DetailProperty);
