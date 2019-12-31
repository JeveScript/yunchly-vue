import request from "@/global/request/axios";
import API from "@/global/request/api";

const article = {
  list: function() {
    return request.get(API.article);
  },
  insert: function(params) {
    return request.post(API.article, params);
  },
  single: function(id) {
    return request.get(API.articleItem(id));
  },
  update: function(id, params) {
    return request.put(API.articleItem(id), params);
  },
  delete: function(id) {
    return request.delete(API.articleItem(id));
  }
};

export default article;
