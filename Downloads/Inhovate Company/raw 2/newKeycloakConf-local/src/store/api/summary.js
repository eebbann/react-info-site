import axios from "axios";
import { fetch_summaryData } from "../summary";
import { toast } from "react-toastify";

export const fetch_summary_data = async (dispatch) => {
  try {
    const res = await axios.get(`/api/property/data/summary`);
    dispatch(fetch_summaryData(res.data));
  } catch (error) {
    toast.error(error.response);
  }
};
