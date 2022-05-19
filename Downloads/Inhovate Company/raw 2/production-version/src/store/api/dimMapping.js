import axios from "axios";
import { fetch_dimMappingData } from "../dimMapping";
import { toast } from "react-toastify";

export const fetch_dim_data = async (params, dispatch) => {

  const userToken = sessionStorage.getItem("user-token")

  try {
    const res = await axios.get(
      `/api/property/data/${params.propertyCode}/master/${params.propertyMasterCode}/data?isMappingRequired=false`, {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      }
    );

    dispatch(fetch_dimMappingData({ ...res.data }));
  } catch (error) {
    toast.error(error.response);
  }
};
