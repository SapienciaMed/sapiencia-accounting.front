import "animate.css";
import React, { memo, useState } from "react";
import {
  FURNITURE_NAMES,
  IFurnitureHistoryData,
} from "../../../features/fixedAssets/hooks/propertyHooks/getDetailProperty.hook";
import icono from "../../../public/images/icono.png";

type ListDateInfo = {
  date: string;
  handleClick: () => void;
  showHistoryTable: boolean;
};

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

const HistoryTable = ({
  showHistoryTable,
  historyInfo,
}: {
  showHistoryTable: boolean;
  historyInfo: IFurnitureHistoryData;
}) => {
  return (
    <div
      className={`HistoryTable animate__animated ${
        showHistoryTable ? "animate__fadeIn" : "animate__fadeOut"
      }`}
    >
      {Object.entries(historyInfo?.changes?.oldChanges).map(([key], index) => {
        const isFirst = index === 0;
        return (
          <div key={key} className="HistoryTable__row">
            <strong style={{ marginLeft: isFirst ? 10 : 0 }}>
              <span>{FURNITURE_NAMES[key]}</span>
            </strong>
            <div>
              {isFirst && <div className="HistoryTable__redPoint"></div>}
              <span>{historyInfo.changes.oldChanges[key]}</span>
            </div>
            <div>
              {isFirst && <div className="HistoryTable__greenPoint"></div>}
              <span>{historyInfo.changes.newChanges[key]}</span>
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
  historyInfo: IFurnitureHistoryData;
  dataLength: number;
  index: number;
}) => {
  const [showHistoryTable, setShowHistoryTable] = useState(false);
  const handleClick = () => setShowHistoryTable(!showHistoryTable);
  return (
    <div className="HistoryDescription__container">
      <div className="HistoryDescription__labelContainer">
        <ContainerLabel
          date={historyInfo.createdAt}
          handleClick={handleClick}
          showHistoryTable={showHistoryTable}
        />
      </div>
      {showHistoryTable && (
        <HistoryTable
          historyInfo={historyInfo}
          showHistoryTable={showHistoryTable}
        />
      )}
      {dataLength > 1 && index !== dataLength - 1 && (
        <div
          className="HistoryDescription__vector"
          style={{
            height: showHistoryTable ? 160 : 55,
          }}
        ></div>
      )}
    </div>
  );
};

export const HistoryDescription = ({
  historyData,
}: {
  historyData: IFurnitureHistoryData[];
}) => {
  return (
    <div className="custom-history-description-container">
      <div className="custom-history-description">
        {historyData?.map((historyInfo, index) => (
          <div key={index} className="HistoryDescription__item">
            <div className="HistoryDescription__item__header">
              <div className="HistoryDescription__point"></div>
              <HistoryRow
                index={index}
                dataLength={historyData.length}
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
