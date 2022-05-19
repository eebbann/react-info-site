import axios from "axios";
import { fetch_dimMappingData } from "../dimMapping";
import { toast } from "react-toastify";

export const fetch_dim_data = async (params, dispatch) => {
  try {
    const res = await axios.get(
      `/api/property/data/${params.propertyCode}/master/${params.propertyMasterCode}/data?isMappingRequired=false`
    );

    dispatch(fetch_dimMappingData({ ...res.data }));
  } catch (error) {
    toast.error(error.response);
  }
};
