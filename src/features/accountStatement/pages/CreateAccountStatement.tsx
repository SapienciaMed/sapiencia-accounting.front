import { DateTime } from "luxon";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import {
  ButtonComponent,
  InputComponent,
  SelectComponent,
} from "../../../common/components/Form";
import { DatePickerComponent } from "../../../common/components/Form/input-date.component";
import { InputNumberComponent } from "../../../common/components/Form/input-number.component";
import { TextAreaComponent } from "../../../common/components/Form/input-text-area.component";
import { AppContext } from "../../../common/contexts/app.context";
import useCrudService from "../../../common/hooks/crud-service.hook";
import useYupValidationResolver from "../../../common/hooks/form-validator.hook";
import { IAccountStatement } from "../../../common/interfaces/accountStatement.interface";
import { ApiResponse } from "../../../common/utils/api-response";

const contracts = [
  {
    value: 1,
    name: "PAC ENERO 2023",
  },
  {
    value: 2,
    name: "338",
  },
  {
    value: 3,
    name: "328",
  },
];

const business = [
  {
    id: 1,
    name: "Institución Universitaria Colegio Mayor de Antioquia",
    value: "890980134",
  },
  {
    id: 2,
    name: "Instituto Tecnológico Metropolitano",
    value: "800214750",
  },
  {
    id: 3,
    name: "DATOLABS S.A.S",
    value: "901131054",
  },
];

const paymentType = [
  {
    value: -1,
    name: "Contado",
  },
  {
    value: 30,
    name: "A 30 días",
  },
  {
    value: 60,
    name: "A 60 días",
  },
  {
    value: 90,
    name: "A 90 días",
  },
];

export const CreateAccountStatement = () => {
  const { setMessage } = useContext(AppContext);

  const accountStatementSchema = yup.object({
    contractCode: yup.number().required("Completar información"),
    business: yup.number().required("Completar información"),
    paymentType: yup.number().required("Completar información"),
    concept: yup.string().min(1).required("Completar información"),
    valuePay: yup.string().required("Completar información"),
  });

  const resolver = useYupValidationResolver(accountStatementSchema);

  const {
    control,
    handleSubmit,
    register,
    watch,
    setValue,
    reset,
    formState: { errors, isValid, dirtyFields },
  } = useForm({ resolver, mode: "all" });
  const [lastId, setLastId] = useState<string>(null);
  const [reloadId, setReloadId] = useState(null);

  const createAccountStatement = async (data) => {
    try {
      const resp: ApiResponse<IAccountStatement> = await post(
        "account-statement",
        data
      );
      console.log(resp);
      setReloadId(new Date());
      reset();
      setMessage({
        title: "Cuenta de cobro",
        description: "¡Creada exitosamente!",
        show: true,
        OkTitle: "Cerrar",
        onOk: () => {
          setMessage((prev) => {
            return { ...prev, show: false };
          });
        },
        background: true,
      });
    } catch (err) {
      console.log(err);
    }
  };

  function formaterNumberToCurrency(number) {
    const formatter = new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 2,
    });

    return formatter.format(number);
  }

  const onSubmit = (data) => {
    const { expeditionDate, expirationDate, paymentType } = data;
    const body = {
      ...data,
      expeditionDate: DateTime.fromJSDate(expeditionDate).toSQL(),
      expirationDate: DateTime.fromJSDate(expirationDate).toSQL(),
      accountNum: lastId,
      userCreate: "7672687234",
      paymentType: String(paymentType),
    };
    console.log(body);
    setMessage({
      title: "Crear cuenta de cobro",
      description: "Estás segur@ de crear la cuenta de cobro?",
      show: true,
      OkTitle: "Aceptar",
      cancelTitle: "Cancelar",
      onOk: () => {
        setMessage((prev) => {
          return { ...prev, show: false };
        });
        createAccountStatement(body);
      },
      onClose: () => {
        setMessage((prev) => {
          return { ...prev, show: false };
        });
      },
      background: true,
    });
  };
  const contractValue = watch("contractCode");
  const paymentTypeValue = watch("paymentType");

  useEffect(() => {
    if (!contractValue) return;
    const itemFound = business.find((el) => el.id === contractValue);
    setValue("nit", itemFound.value);
  }, [contractValue]);

  useEffect(() => {
    setValue("expeditionDate", new Date());
  }, []);

  useEffect(() => {
    if (!paymentTypeValue) return;
    if (paymentTypeValue === -1) {
      return setValue(
        "expirationDate",
        DateTime.now().plus({ days: 0 }).toJSDate()
      );
    }
    setValue(
      "expirationDate",
      DateTime.now().plus({ days: paymentTypeValue }).toJSDate()
    );
  }, [paymentTypeValue]);

  const baseURL: string = process.env.urlApiAccounting;

  const { get, post } = useCrudService(null, baseURL);

  const getLastAccountStatement = async () => {
    try {
      const resp: ApiResponse<IAccountStatement> = await get(
        "account-statement/get-last"
      );
      const newId = resp.data.accountNum + 1;
      setLastId(newId.toString());
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getLastAccountStatement();
  }, [reloadId]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="container-sections-forms mt-24px ml-16px mr-16px p-0">
          <div className=" container-sections-forms ml-20px mr-20px">
            <div className="grid-form-3-container gap-25">
              <span className="text-black large bold grid-span-3-columns">
                Crear cuenta de cobro
              </span>
              <InputComponent
                idInput="id"
                label={<>No. Cuenta de cobro</>}
                typeInput="text"
                value={lastId}
                // register={register}
                errors={errors}
                className="input-basic medium"
                classNameLabel="text-black big bold"
                disabled
              />
              <SelectComponent
                idInput="contractCode"
                control={control}
                errors={errors}
                data={contracts}
                label={
                  <>
                    Contrato <span>*</span>
                  </>
                }
                className="select-basic medium"
                classNameLabel="text-black big bold"
                placeholder="Seleccione."
                //   disabled={disabledFields}
              />
              <InputComponent
                idInput="nit"
                label={<>NIT</>}
                typeInput="text"
                register={register}
                errors={errors}
                className="input-basic medium"
                classNameLabel="text-black big bold"
                disabled
              />

              <div className="grid-span-3-columns">
                <SelectComponent
                  idInput="business"
                  control={control}
                  errors={errors}
                  data={business}
                  label={
                    <>
                      Razón social / Nombre <span>*</span>
                    </>
                  }
                  className="select-basic medium"
                  classNameLabel="text-black big bold"
                  placeholder="Seleccione."
                  //   disabled={disabledFields}
                />
              </div>
            </div>

            <div className="grid-form-4-container gap-25 mt-25px">
              <DatePickerComponent
                idInput="expeditionDate"
                control={control}
                label={<>Fecha de expedición</>}
                errors={errors}
                classNameLabel="text-black big bold"
                className="dataPicker-basic  medium "
                //   disabled={disabledFields}
                placeholder="DD/MM/YYYY"
                dateFormat="dd/mm/yy"
                maxDate={new Date()}
                disabled
              />

              <DatePickerComponent
                idInput="expirationDate"
                control={control}
                label={<>Fecha de vencimiento</>}
                errors={errors}
                classNameLabel="text-black big bold"
                className="dataPicker-basic  medium "
                //   disabled={disabledFields}
                placeholder="DD/MM/YYYY"
                dateFormat="dd/mm/yy"
                maxDate={new Date()}
                disabled
              />
              <SelectComponent
                idInput="paymentType"
                control={control}
                errors={errors}
                data={paymentType}
                label={
                  <>
                    Forma de pago <span>*</span>
                  </>
                }
                className="select-basic medium"
                classNameLabel="text-black big bold"
                placeholder="Seleccione."
                //   disabled={disabledFields}
              />
              <InputNumberComponent
                idInput="valuePay"
                control={control}
                label={<>Valor</>}
                errors={errors}
                classNameLabel="text-black big bold"
                className="inputNumber-basic medium"
                // disabled={disabledFields}
                mode="currency"
                currency="COP"
                locale="es-CO"
                minFractionDigits={2}
                maxFractionDigits={2}
              />
              {/* <InputComponent
                idInput="valuePay"
                label={
                  <>
                    Valor <span>*</span>
                  </>
                }
                typeInput="number"
                register={register}
                onChange={({ target }) => {
                  let result: string = writtenNumber(target.value, {
                    lang: "es",
                  });
                  setValue("valueLabel", result.concat(" m/l."));
                }}
                errors={errors}
                className="input-basic medium"
                classNameLabel="text-black big bold"
                //   disabled={disabledFields}
              /> */}
              <div className="grid-span-4-columns">
                <InputComponent
                  idInput="valueLabel"
                  label={<>Valor en letras</>}
                  typeInput="text"
                  register={register}
                  errors={errors}
                  className="input-basic medium"
                  classNameLabel="text-black big bold"
                  disabled
                />
              </div>
              <div className="grid-span-4-columns">
                <TextAreaComponent
                  idInput="concept"
                  className="text-area-basic"
                  classNameLabel="text-black big bold"
                  label="Observaciones"
                  register={register}
                  disabled={false}
                  errors={errors}
                  rows={5}
                />
                <InputComponent
                  idInput="concept"
                  label={
                    <>
                      Concepto de cobro <span>*</span>
                    </>
                  }
                  typeInput={"text"}
                  register={register}
                  errors={errors}
                  className="input-basic medium"
                  classNameLabel="text-black big bold"
                  //   disabled={disabledFields}
                />
              </div>
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
            // width: "100%",
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
            action={() => {
              setMessage({
                show: false,
              });
            }}
          />
          <ButtonComponent
            value="Guardar"
            className="button-save big"
            type="submit"
          />
        </div>
      </form>
    </>
  );
};
