import http from "../http-common";

// axios operations to be called

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

const BookDataService = {
  get,
  create,
  update,
  remove,
};

export default BookDataService;
