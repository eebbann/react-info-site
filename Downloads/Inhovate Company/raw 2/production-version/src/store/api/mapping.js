import axios from "axios";
import {
  fetch_mappingData,
  dispatch__perspectives,
  add_mapping_data,
} from "../mapping";
import { toast } from "react-toastify";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
const check = (object, string) => {
  return Object.keys(object).find((e) => e.includes(string));
};

export const fetch_map_data = async (params, dispatch) => {

  const userToken = sessionStorage.getItem("user-token")

  try {
    const res = await axios.get(
      `/api/property/data/${params.propertyCode}/master/${params.propertyMasterCode}/data?isMappingRequired=true`, {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      }
    );

    const headers = res.data?.headers.map((header) => ({
      name: header,
      title: capitalizeFirstLetter(header),
    }));
    dispatch(fetch_mappingData({ ...res.data, headers }));
    const re = await axios.get(
      `/api/property/data/perspective/master/${res.data.propertyId}/${res.data.propertyMasterId}`, {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      }
    );

    dispatch(dispatch__perspectives(re.data));

    re.data.map((element) => {
      axios
        .get(
          `/api/property/data/perspective/${element.perspectiveCode}/master/${element.perspectiveMasterCode}`, {
            headers: {
              Authorization: `Bearer ${userToken}`
            }
          }
        )
        .then((r) => {
          dispatch(add_mapping_data({ element, options: r.data.data }));
        })
        .catch((err) => console.log(err.message));
    });
  } catch (error) {
    toast.error(error.response);
  }
};

export const update_map_data = async (
  changed,
  perpertives,
  rows,
  propertyId,
  propertyMasterCode,
  dispatch,
  params
) => {
  const userToken = sessionStorage.getItem("user-token")
  try {
    const data = changed[Object.keys(changed)[0]];
    const id = Object.keys(changed)[0];
    const row = rows.find((r) => r.id === id);

    const payload = perpertives
      .map((p) => ({
        id: id,
        description: row.description,
        code: row.code,
        propertyId: propertyId,
        propertyMasterCode: propertyMasterCode,
        mappingCode: data[check(data, p.perspectiveMasterName.toLowerCase())],
        perspectiveCode: p.perspectiveCode,
        perspectiveMasterCode: p.perspectiveMasterCode,
        statusMessage: "string",
      }))
      .filter((m) => m.mappingCode !== undefined);

    const res = await axios.put(
      `/api/property/data/coa/${propertyId}/update/${row.code}/perspective/mapping/code/bulk`,
      payload, {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      }
    );

    res.data.map((d) => {
      if (d.statusMessage === "SUCCESS") toast.success(d.statusMessage);
      else toast.error(d.statusMessage);
    });

    fetch_map_data(params, dispatch);
  } catch (error) {
    toast.error(error.response);
  }
};

export const update_map_date_bulk = async (
  formInput,
  mappingData,
  selections,
  rows,
  params,
  dispatch
) => {
  const userToken = sessionStorage.getItem("user-token")
  try {
    // console.log(formInput, mappingData, selections, rows);
    const request = selections.map((selection) => {
      const row = rows.find((row) => row.id === selection);
      const payloads = mappingData.map((map, i) => {
        return {
          id: selection,
          description: row.description,
          code: row.code,
          propertyId: map.element.propertyId,
          propertyMasterCode: map.element.propertyMasterCode,
          mappingCode: formInput[i],
          perspectiveCode: map.element.perspectiveCode,
          perspectiveMasterCode: map.element.perspectiveMasterCode,
          statusMessage: "string",
        };
      });
      return axios
        .put(
          `/api/property/data/coa/${payloads[0].propertyId}/update/${row.code}/perspective/mapping/code/bulk`,
          payloads, {
            headers: {
              Authorization: `Bearer ${userToken}`
            }
          }
        )
        .then((res) => {
          res.data.map((d) => {
            if (d.statusMessage === "SUCCESS") toast.success(d.statusMessage);
            else toast.error(d.statusMessage);
          });
        });
    });
    await Promise.all(request).then(() => {
      fetch_map_data(params, dispatch);
    });
    // window.location.reload();
  } catch (error) {
    console.log(error);
  }
};
