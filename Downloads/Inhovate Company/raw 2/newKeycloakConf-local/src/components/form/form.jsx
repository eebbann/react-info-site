import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "@emotion/styled";
import { Button, Stack } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./form.css";
import SelectField from "./selectField";
import UploadField from "./uploadField";
import { useDispatch } from "react-redux";
import { fetch_summary_data } from "../../store/api/summary";

const FormWrap = styled.form`
  background: #ffffff;
  padding: 100px 30px;
`;

function Form() {
  const [propertiesData, setPropertiesData] = useState([]);
  const [mastersData, setMastersData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formInput, setFormInput] = useState({
    fileTypeCode: "",
    fileUploaderCode: "",
    file: "",
  });
  const dispatch = useDispatch();

  const [summary, setSummary] = useState([]);

  useEffect(() => {
    //@API CALL for location select data
    axios.get("/api/property/data/configuration").then((res) => {
      const properties = res.data?.properties.map((re) => {
        return { value: re.code, title: re.name };
      });
      setPropertiesData(properties);
      const masters = res.data?.masters.map((re) => {
        return { value: re.code, title: re.name };
      });
      setMastersData(masters);
    });

    axios.get("/api/property/data/summary").then((response) => {
      setSummary(response.data);
    });
  }, []);

  const handleChange = (e) => {
    setFormInput({
      ...formInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeFile = (e) => {
    if (e.target?.files) {
      setFormInput({
        ...formInput,
        file: e.target.files[0],
      });
    }
  };

  //submit form func
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    let formData = new FormData();
    formData.append("file", formInput.file);
    formData.append("fileTypeCode", formInput.fileTypeCode);
    formData.append("fileUploaderCode", formInput.fileUploaderCode);
    var doTheUpload = false;
    if (summary.length > 0) {
      summary.map((line) => {
        if (
          formInput.fileUploaderCode === line.propertyCode &&
          formInput.fileTypeCode === line.masterCode
        ) {
          if (
            window.confirm(
              "A file of this type already exists for this property. Are you sure you want to upload a new one and loose the existing file ? "
            ) === true
          ) {
            if (
              window.confirm(
                "All the mapping associated to the rows will be removed. Do you want to proceed ?"
              ) === true
            ) {
              doTheUpload = true;
            } else {
              setLoading(false);
            }
          } else {
            setLoading(false);
          }
        }
      });
    } else {
      doTheUpload = true;
    }

    if (doTheUpload) {
      axios
        .post("/api/property/data/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.data.message === "SUCCESS") {
            toast.success("File uploaded successfully", res.data.message);
            fetch_summary_data(dispatch);
          } else {
            toast.error(res.data.message);
          }
          setLoading(false);
        })
        .catch((err) => {
          toast.error(err.response);
          setLoading(false);
        });
    }
    // toast.success("File Uploaded Successfully");
  };

  return (
    <FormWrap onSubmit={handleSubmit} className="form_wrap">
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        justifyContent="space-between"
      >
        <UploadField
          handleChange={handleChangeFile}
          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        />
        {/* toast upload success*/}
        <ToastContainer />

        <div>
          {formInput.file === "" ? (
            <p className="file_status">No file Uploaded </p>
          ) : (
            <p className="file_status">File Name : {formInput.file?.name}</p>
          )}
        </div>

        <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
          <SelectField
            handleChange={handleChange}
            name="fileUploaderCode"
            value={formInput.fileUploaderCode}
            placeholder="Property"
            items={propertiesData}
          />

          <SelectField
            handleChange={handleChange}
            name="fileTypeCode"
            value={formInput.fileTypeCode}
            placeholder="Dimension"
            items={mastersData}
          />
        </Stack>
      </Stack>
      <Button variant="contained" type="submit" className="submit">
        {loading ? "Loading" : "Submit"}
      </Button>
      {/*if */}
      {formInput.filename === "" ? (
        <div className="accept">
          <i>No file Uploaded</i>
        </div>
      ) : (
        <div className="accept">{formInput.filename}</div>
      )}
    </FormWrap>
  );
}

export default Form;
