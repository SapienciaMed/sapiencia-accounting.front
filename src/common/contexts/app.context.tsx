import {
  Dispatch,
  ReactElement,
  SetStateAction,
  createContext,
  useMemo,
  useState,
} from "react";
import {
  IGetAccountStatement,
  IGetBusiness,
} from "../interfaces/accountStatement.interface";
import { IAuthorization } from "../interfaces/auth.interfaces";
import { IMessage } from "../interfaces/global.interface";

interface IAppContext {
  authorization: IAuthorization;
  setAuthorization: Dispatch<SetStateAction<IAuthorization>>;
  message: IMessage;
  setMessage: Dispatch<SetStateAction<IMessage>>;
  validateActionAccess: (indicator: string) => boolean;
  currentAccountStatement: IGetAccountStatement;
  setCurrentAccountStatement: Dispatch<SetStateAction<IGetAccountStatement>>;
  currentBusiness: IGetBusiness;
  setCurrentBusiness: Dispatch<SetStateAction<IGetBusiness>>;
}
interface IProps {
  children: ReactElement | ReactElement[];
}

export const AppContext = createContext<IAppContext>({
  authorization: {} as IAuthorization,
  setAuthorization: () => {},
  message: {} as IMessage,
  setMessage: () => {},
  validateActionAccess: () => true,
  currentAccountStatement: {} as IGetAccountStatement,
  setCurrentAccountStatement: () => {},
  currentBusiness: {} as IGetBusiness,
  setCurrentBusiness: () => {},
});

export function AppContextProvider({ children }: IProps) {
  // States
  const [message, setMessage] = useState<IMessage>({} as IMessage);
  const [authorization, setAuthorization] = useState<IAuthorization>(
    {} as IAuthorization
  );
  const [currentAccountStatement, setCurrentAccountStatement] =
    useState<IGetAccountStatement>(null);

  const [currentBusiness, setCurrentBusiness] = useState<IGetBusiness>(null);

  // Metodo que verifica si el usuario posee permisos sobre un accion
  function validateActionAccess(indicator: string): boolean {
    return authorization.allowedActions?.findIndex((i) => i === indicator) >= 0;
  }

  const values = useMemo<IAppContext>(() => {
    return {
      authorization,
      setAuthorization,
      message,
      setMessage,
      validateActionAccess,
      currentAccountStatement,
      setCurrentAccountStatement,
      currentBusiness,
      setCurrentBusiness,
    };
  }, [message, authorization, currentAccountStatement, currentBusiness]);

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
}
