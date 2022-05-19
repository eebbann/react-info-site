import React from "react";
import { useSelector } from "react-redux";
import "../Header.css";
function MapUtiHeader({ Bulk }) {
  const { propertyMasterCode, propertyName } = useSelector(
    (state) => state.mappingReducer
  );
  return (
    <div className="headPill">
      <p className="header">
        {propertyName} - {propertyMasterCode}
      </p>

      <div className="buttons">{Bulk}</div>
    </div>
  );
}

export default MapUtiHeader;
