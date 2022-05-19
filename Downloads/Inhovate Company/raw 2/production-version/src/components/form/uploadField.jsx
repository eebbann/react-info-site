import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import "./form.css";
const Input = styled("input")({
  display: "none",
});

//@INFO: component to upload file
//@PROPS: handle {(e:event)=> void}
//@PROPPS: accept:string(file accept type) eg '.docx', '.pdf'

function UploadField({ accept, handleChange }) {
  return (
    <div>
      <label htmlFor="contained-button-file">
        <Input
          required
          type="file"
          accept={accept}
          id="contained-button-file"
          onChange={handleChange}
        />
        <Button variant="contained" component="span" className="upload_btn">
          <CloudUploadIcon className="cloud" /> Upload
        </Button>
      </label>
    </div>
  );
}

export default UploadField;
