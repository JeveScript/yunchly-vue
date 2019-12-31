import request from "@/global/request/axios";
import API from "@/global/request/api";

const category = {
  list: function(params) {
    return request.get(API.category, params);
  },
  insert: function(params) {
    return request.post(API.category, params);
  },
  single: function(id) {
    return request.get(API.categoryItem(id));
  },
  update: function(id, params) {
    return request.put(API.categoryItem(id), params);
  },
  delete: function(id) {
    return request.delete(API.categoryItem(id));
  }
};

export default category;
