import request from "@/global/request/axios";
import API from "@/global/request/api";

const User = {
  list: function(params) {
    return request.get(API.user, params);
  },
  insert: function(params) {
    return request.post(API.user, params);
  },
  single: function(id) {
    return request.get(API.userItem(id));
  },
  update: function(id, params) {
    return request.put(API.userItem(id), params);
  },
  info: function(params) {
    return request.get(API.userInfo, params);
  },
  more: function(id) {
    return request.get(API.userSingle(id));
  }
};

export default User;
