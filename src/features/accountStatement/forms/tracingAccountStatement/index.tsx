import { memo } from "react";
import {
  ButtonComponent,
  FormComponent,
  InputComponent,
} from "../../../../common/components/Form";

const TracingAccountStatementForm = ({
  onSubmit,
  register,
  errors,
  isValid,
  handleClean,
  handleChange,
  submitDisabled,
}) => (
  <div className="container-sections-forms mt-24px ml-16px mr-16px p-0">
    <div className="display-justify config-font">
      <span className="text-black large bold ">
        Seguimiento cuenta de cobro
      </span>
    </div>
    <FormComponent
      id="searchAccountStatementForm"
      className="form-signIn"
      action={onSubmit}
    >
      <div className=" container-sections-forms ml-20px mr-20px">
        <div className="grid-form-4-container gap-25">
          <span className="text-black large bold grid-span-4-columns">
            Consultar
          </span>
          <InputComponent
            idInput="accountNum"
            label={<>No. Cuenta de cobro</>}
            register={register}
            typeInput="number"
            errors={errors}
            onChange={handleChange}
            className="input-basic medium"
            classNameLabel="text-black big bold"
          />
        </div>
      </div>
      <div className="button-save-container-display mr-24px">
        <ButtonComponent
          value="Limpiar campo"
          className="button-clean bold"
          type="button"
          action={handleClean}
        />
        <ButtonComponent
          value="Buscar"
          className={`button-save ${
            !isValid || submitDisabled ? "disabled-black" : ""
          } big`}
          type="submit"
          disabled={!isValid || submitDisabled}
        />
      </div>
    </FormComponent>
  </div>
);

export default memo(TracingAccountStatementForm);
