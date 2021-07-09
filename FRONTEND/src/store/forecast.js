import { createStore, createHook } from "react-sweet-state";
import { forecastApi } from "../api";

const Store = createStore({
  // value of the store on initialisation
  initialState: {
    isLoading: false,
    limit: 10,
    skip: 0,
    search: "",
    data: [],
    total: 0,
    error: null,
  },
  // actions that trigger store mutation
  actions: {
    updateStore:
      (newState) =>
      async ({ setState, getState }) => {
        setState(newState);
      },

    loadData:
      () =>
      async ({ setState, getState }) => {
        setState({ isLoading: true, error: null, data: [] });

        try {
          const resp = await listApi(getState());

          if (resp.data && resp.data.code === 200) {
            setState({ data: resp.data.data, total: resp.data.total });
          }
        } catch (err) {
          setState({
            error: err && err.response ? err.response.message : "Unknown error",
          });
        }

        setState({ isLoading: false });
      },
  },
  // optional, mostly used for easy debugging
  name: "listForecast",
});

export const useListStore = createHook(Store);
