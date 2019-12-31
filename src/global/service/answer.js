import request from "@/global/request/axios";
import API from "@/global/request/api";

const Answer = {
  delete: function(id) {
    return request.delete(API.answerItem(id));
  },
  insert: function(params) {
    return request.post(API.answer, params);
  },
  update: function(id, params) {
    return request.put(API.answerItem(id), params);
  },
  single: function(id) {
    return request.get(API.answerItem(id));
  },
  today: function() {
    return request.get(API.answerToday);
  },
  answerSingle: function(id) {
    return request.get(API.answerSingle(id));
  }
};

export default Answer;
