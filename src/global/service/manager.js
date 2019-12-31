import request from "@/global/request/axios";
import API from "@/global/request/api";

const Manager = {
  login: function(params) {
    return request.post(API.authLogin, params);
  },
  list: function() {
    return request.get(API.manager);
  },
  delete: function(id) {
    return request.delete(API.managerItem(id));
  },
  insert: function(params) {
    return request.post(API.manager, params);
  },
  update: function(id, params) {
    return request.put(API.managerItem(id), params);
  },
  single: function(id) {
    return request.get(API.managerItem(id));
  }
};

export default Manager;
