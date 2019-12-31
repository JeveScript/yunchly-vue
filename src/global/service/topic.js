import request from "@/global/request/axios";
import API from "@/global/request/api";

const Topic = {
  list: function(params) {
    return request.get(API.topic, params);
  },
  insert: function(params) {
    return request.post(API.topic, params);
  },
  update: function(id, params) {
    return request.put(API.topicItem(id), params);
  },
  delete: function(id) {
    return request.delete(API.topicItem(id));
  },
  single: function(id) {
    return request.get(API.topicItem(id));
  },
  show: function(id, params) {
    return request.put(API.topicShow(id), params);
  }
};

export default Topic;
