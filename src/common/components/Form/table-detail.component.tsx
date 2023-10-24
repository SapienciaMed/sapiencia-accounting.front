import React, { Fragment, useState } from "react";
import Svgs from "../../../public/images/icons/svgs";
import { Dropdown } from "primereact/dropdown";
import icono from "../../../public/images/icono.png";

export interface DataItem {
  title: string | React.JSX.Element;
  value: string | React.JSX.Element[];
}

interface Props {
  data: DataItem[];
}
export interface Date {
  dateInfo: string | React.JSX.Element;
}

export interface ListDateInfo {
  date: Date;
}

export function ContainerLabel({ date }: ListDateInfo): React.JSX.Element {
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  const toggleInfo = () => {
    setIsInfoOpen(!isInfoOpen);
  };

  return (
    <div>
      <div className="container-label">
        <div className="title-label-history">
          <div>{date.dateInfo}</div>
          <div className="icon-container">
            <details
              key={""}
              className={`collapse-dropdown-modal ${isInfoOpen ? "open" : ""}`}
            >
              <summary onClick={toggleInfo}>
                <span>
                  <img
                    className={`icon-dropdown-modal ${
                      isInfoOpen ? "collapse-dropdown-modal" : ""
                    }`}
                    src={icono}
                    alt=""
                  />
                </span>
              </summary>
            </details>
          </div>
        </div>
      </div>
      {isInfoOpen && (
        <div className="">
          <div className="additional-info">
            {/* Aquí puedes colocar tu tabla o contenido adicional */}
            {/* Ejemplo de tabla */}
            <table>
              <thead>
                <tr>
                  <th>Encabezado 1</th>
                  <th>Encabezado 2</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Dato 1</td>
                  <td>Dato 2</td>
                </tr>
                {/* Agrega más filas según tu necesidad */}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export function DropdownModal({ toggleInfo }) {
  return <div></div>;
}

export function HistoryDescription({ deployment }) {
  return (
    <div className="custom-history-description-container">
      <div className="custom-history-description">
        {deployment.map((date, index) => (
          <div key={index} className="label-container">
            <div className="container-label">
              <div className="icon-modal">
                <Svgs svg="point" width={18} height={21} />
              </div>
              <ContainerLabel date={date} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HistoryDescription;
