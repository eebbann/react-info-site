import axios from "axios";
import { useParams } from "react-router-dom";

export const useRequestHook = () => {
  const params = useParams();
  const getDimensionData = () =>
    new Promise((resolve, reject) => {
      axios
        .get(
          `/api/property/data/${params.propertyCode}/master/${params.propertyMasterCode}/data?isMappingRequired=false`
        )
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });

  return {
    getDimensionData,
  };
};
