import { apiClient } from "../services/apiClient";

export const forecastApi = function ({ lat, long }) {
  return apiClient.get(
    `/onecall?lat=${lat}&lon=${long}&units=metric&APPID=149a76b8d351c94d65d6373fab1685ab`
  );
};
