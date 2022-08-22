import axios from "axios";

const http = axios.create();
const url = "http://localhost:8000/products";

export const getAll = async () => {
  const data = await http.get(url).then((res) => res.data);
  return data;
};

export const findProductByHttp = async (id) => {
  const data = await http.get(`${url}/${id}`).then((res) => res.data);
  console.log(data);
  return data;
};

export const GetProductInCategory = async (id) => {
  const data = await http
    .get(`${url}?categories_id=${id}`)
    .then((res) => res.data);
  console.log(data);
  return data;
};
