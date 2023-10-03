import { memo } from "react";
import {
  ButtonComponent,
  InputComponent,
} from "../../../common/components/Form";
import { DatePickerComponent } from "../../../common/components/Form/input-date.component";
import { TextAreaComponent } from "../../../common/components/Form/input-text-area.component";
import { useGetDetailFixedAssets } from "../hooks/getDetailFixedAssets.hook";
import Svgs from "../../../public/images/icons/svgs";

const DetailFixedAssets = () => {
  const { register, control, handleClose } = useGetDetailFixedAssets();
  return (
    <>
      <div className="container-sections-forms mt-24px ml-12px mr-16px p-0">
        <div className=" container-sections-forms ml-20px mr-20px">
          <div className="grid-form-3-container gap-25">
            <span className="text-black large bold grid-span-2-columns">
              Consulta detalle bien inmueble
            </span>
            <span className="text-links viewHistoricals" >
              Ver Historico   &nbsp;<Svgs svg="view" width={16} height={17}/>
            </span>


            <InputComponent
              idInput="area"
              label={<>Area</>}
              typeInput="text"
              // register={register}
              className="input-basic medium"
              classNameLabel="text-black big bold"
              disabled
            />
            <InputComponent
              idInput="status"
              label={<>Estado</>}
              typeInput="text"
              // register={register}
              className="input-basic medium"
              classNameLabel="text-black big bold"
              disabled
            />
            <InputComponent
              idInput="ccuser"
              label={<>CC usuario</>}
              typeInput="text"
              // register={register}
              className="input-basic medium"
              classNameLabel="text-black big bold"
              disabled
            />

            <InputComponent
              idInput="status"
              label={<>Nombres y apellidos</>}
              typeInput="text"
              // register={register}
              className="input-basic medium"
              classNameLabel="text-black big bold"
              disabled
            />
            <InputComponent
              idInput="status"
              label={<>Funcionario</>}
              typeInput="text"
              // register={register}
              className="input-basic medium"
              classNameLabel="text-black big bold"
              disabled
            />
            <DatePickerComponent
              idInput="expeditionDate"
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
              idInput="status"
              label={<>Topo activo/ descripción</>}
              typeInput="text"
              // register={register}
              className="input-basic medium"
              classNameLabel="text-black big bold"
              disabled
            />
            <InputComponent
              idInput="status"
              label={<>Marca</>}
              typeInput="text"
              // register={register}
              className="input-basic medium"
              classNameLabel="text-black big bold"
              disabled
            />
            <InputComponent
              idInput="status"
              label={<>Modelo</>}
              typeInput="text"
              // register={register}
              className="input-basic medium"
              classNameLabel="text-black big bold"
              disabled
            />
            <InputComponent
              idInput="status"
              label={<>Placa activo</>}
              typeInput="text"
              // register={register}
              className="input-basic medium"
              classNameLabel="text-black big bold"
              disabled
            />
            <InputComponent
              idInput="status"
              label={<>Medida</>}
              typeInput="text"
              // register={register}
              className="input-basic medium"
              classNameLabel="text-black big bold"
              disabled
            />
            <InputComponent
              idInput="status"
              label={<>Propietario activo</>}
              typeInput="text"
              // register={register}
              className="input-basic medium"
              classNameLabel="text-black big bold"
              disabled
            />
          </div>
          <div className="mt-20px grid-span-4-columns">
            <TextAreaComponent
              idInput="concept"
              className="text-area-basic"
              classNameLabel="text-black big bold"
              label={<>Observaciones</>}
              register={register}
              disabled
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
          value="Cerrar"
          action={handleClose}
          className="button-save big"
        />
      </div>
    </>
  );
};

export default memo(DetailFixedAssets);
