import request from "@/global/request/axios";
import API from "@/global/request/api";

const Answer = {
  recommendSelected: function() {
    return request.get(API.tableRecommendSelected);
  },
  recommendUnSelected: function(params) {
    return request.get(API.tableRecommendUnSelected, params);
  },
  answerSelected: function() {
    return request.get(API.tableAnswerSelected);
  },
  answerUnSelected: function(params) {
    return request.get(API.tableAnswerUnSelected, params);
  },
  insert: function(params) {
    return request.post(API.table, params);
  },
  deleted: function(params) {
    return request.put(API.table, params);
  }
};

export default Answer;
