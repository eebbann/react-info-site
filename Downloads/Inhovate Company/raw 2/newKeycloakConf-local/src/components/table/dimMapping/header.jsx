import React, { useState } from "react";
import JoinInnerIcon from "@mui/icons-material/JoinInner";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import "../Header.css";
import { fetch_dim_data } from "../../../store/api/dimMapping";
import AlertDialog from "../../shared/modal";

function Header({ button, Bulk }) {
  const [open, setopen] = useState(false);
  const { generateCodeIsEmty, propertyMasterCode, propertyName, propertyId } =
    useSelector((state) => state.dimMappingReducer);

  const params = useParams();
  const dispatch = useDispatch();
  const handleGenerate = () => {
    if (generateCodeIsEmty) {
      generateCode();
    } else {
      setopen(true);
    }
  };
  const handleAgree = () => {
    generateCode();
    setopen(false);
  };

  const generateCode = async () => {
    await axios
      .post("/api/property/data/coa/" + propertyId + "/populate/analytics")
      .then((res) => {
        fetch_dim_data(params, dispatch);

        toast.success("code generated succesfully");
      })
      .catch((err) => {
        toast.error("an error occured while generating the code");
      });
  };
  return (
    <div className="headPill">
      <p className="header">
        {propertyName} - {propertyMasterCode}
      </p>
      <AlertDialog
        open={open}
        handleClickOpen={handleAgree}
        handleClose={() => setopen(false)}
        title="Re-Generate inHovate Codes "
        description={
          "The inHovate codes are already generated, it will override the value. Are you sure you want to continue?"
        }
      />

      <button className="generate_btn" onClick={handleGenerate}>
        <JoinInnerIcon />{" "}
        {generateCodeIsEmty
          ? "Generate inHovate Codes "
          : "Regenerate inHovate Codes"}
      </button>

      <div className="buttons">
        <button
          className="upload"
          onClick={() => {
            window.location.href = "/";
          }}
        >
          Re-Upload
        </button>
        {button}
      </div>
    </div>
  );
}

export default Header;
