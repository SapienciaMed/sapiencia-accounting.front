import React, { Fragment } from "react";
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
  return (
    <div className="container-label">
      <div className="title-label-history">
        <div>{date.dateInfo}</div>
        <div className="icon-container">
          <DropdownModal />
        </div>
      </div>
    </div>
  );
}

export function DropdownModal() {
  return (
    <div>
      <Fragment>
        <details key={""} className="collapse-dropdown-modal">
          <summary>
            <span>
              <img className="icon-dropdown-modal" src={icono} alt="" />
            </span>
          </summary>
        </details>
      </Fragment>
    </div>
  );
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
