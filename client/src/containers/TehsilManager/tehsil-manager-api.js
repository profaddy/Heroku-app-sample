import api from "../../utils/api";

export const fetchTehsils = () => api.get("/tehsils");
export const addTehsil = (data) => api.post("/tehsils",data);


