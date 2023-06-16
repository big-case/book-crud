import http from "../http-common";

// axios operations to be called
const getAll = () => {
  return http.get("/books");
};

const get = id => {
  return http.get(`/books/${id}`);
};

const create = data => {
  return http.post("/books", data);
};

const update = (id, data) => {
  return http.put(`/books/${id}`, data);
};

const remove = id => {
  return http.delete(`/books/${id}`);
};

// const removeAll = () => {
//   return http.delete("/books");
// };

const findByTitle = title => {
  return http.get(`/books?title=${title}`);
};

const BookDataService = {
  getAll,
  get,
  create,
  update,
  remove,
  findByTitle
};

export default BookDataService;
