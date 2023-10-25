import "animate.css";
import React, { memo, useState } from "react";
import icono from "../../../public/images/icono.png";

export interface DataItem {
  title: string | React.JSX.Element;
  value: string | React.JSX.Element[];
}

interface Props {
  data: DataItem[];
}

export interface ListDateInfo {
  date: string;
  handleClick: () => void;
  showHistoryTable: boolean;
}

export interface IHistoryDescription {
  date: string;
}

export function ContainerLabel({
  date,
  handleClick,
  showHistoryTable,
}: ListDateInfo): React.JSX.Element {
  return (
    <div className="title-label-history" onClick={handleClick}>
      <div className="ContainerLabel__title">
        <strong>
          <span>Fecha: </span>
        </strong>
        <span>{date}</span>
      </div>
      <details className="ContainerLabel__icon">
        <summary>
          <img
            src={icono}
            className={
              showHistoryTable
                ? "ContainerLabel__rotateDown"
                : "ContainerLabel__rotateUp"
            }
          />
        </summary>
      </details>
    </div>
  );
}

const HistoryTable = ({ showHistoryTable }: { showHistoryTable: boolean }) => {
  return (
    <div
      className={`HistoryTable animate__animated ${
        showHistoryTable ? "animate__fadeIn" : "animate__fadeOut"
      }`}
    >
      {new Array(20).fill(0).map((data, index) => {
        const isFirst = index === 0;
        return (
          <div key={index} className="HistoryTable__row">
            <strong style={{ marginLeft: isFirst ? 10 : 0 }}>
              <span>Sede</span>
            </strong>
            <div>
              {isFirst && <div className="HistoryTable__redPoint"></div>}
              <span> Principal</span>
            </div>
            <div>
              {isFirst && <div className="HistoryTable__greenPoint"></div>}
              <span>Principal</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const HistoryRow = ({
  historyInfo,
  dataLength,
  index,
}: {
  historyInfo: IHistoryDescription;
  dataLength: number;
  index: number;
}) => {
  const [showHistoryTable, setShowHistoryTable] = useState(false);
  const handleClick = () => setShowHistoryTable(!showHistoryTable);
  return (
    <div className="HistoryDescription__container">
      <div className="HistoryDescription__labelContainer">
        <ContainerLabel
          date={historyInfo.date}
          handleClick={handleClick}
          showHistoryTable={showHistoryTable}
        />
      </div>
      {showHistoryTable && <HistoryTable showHistoryTable={showHistoryTable} />}
      {dataLength > 1 && index !== dataLength - 1 && (
        <div
          className="HistoryDescription__vector"
          style={{
            height: showHistoryTable ? 170 : 55,
          }}
        ></div>
      )}
    </div>
  );
};

export const HistoryDescription = ({
  data,
}: {
  data: IHistoryDescription[];
}) => {
  return (
    <div className="custom-history-description-container">
      <div className="custom-history-description">
        {data.map((historyInfo, index) => (
          <div key={index} className="HistoryDescription__item">
            <div className="HistoryDescription__item__header">
              <div className="HistoryDescription__point"></div>
              <HistoryRow
                index={index}
                dataLength={data.length}
                historyInfo={historyInfo}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(HistoryDescription);
