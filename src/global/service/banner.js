import request from "@/global/request/axios";
import API from "@/global/request/api";

const banner = {
  list: function() {
    return request.get(API.banner);
  },
  insert: function(params) {
    return request.post(API.banner, params);
  },
  single: function(id) {
    return request.get(API.bannerItem(id));
  },
  update: function(id, params) {
    return request.put(API.bannerItem(id), params);
  },
  delete: function(id) {
    return request.delete(API.bannerItem(id));
  }
};

export default banner;
