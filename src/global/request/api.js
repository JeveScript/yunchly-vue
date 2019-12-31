const PREFIX = "https://api.yunchly.zakesi.com/api";
// const PREFIX = "/api";

const API = {
  authLogin: `${PREFIX}/auth/login`, //登录接口
  manager: `${PREFIX}/manager`,
  managerItem: id => `${PREFIX}/manager/${id}`,
  user: `${PREFIX}/user`,
  userItem: id => `${PREFIX}/user/${id}`,
  userInfo: `${PREFIX}/userInfo`,
  userSingle: id => `${PREFIX}/userSingle/${id}`,
  category: `${PREFIX}/category`,
  categoryItem: id => `${PREFIX}/category/${id}`,
  topic: `${PREFIX}/topic`,
  topicItem: id => `${PREFIX}/topic/${id}`,
  topicShow: id => `${PREFIX}/topicShow/${id}`,
  answer: `${PREFIX}/answer`,
  answerItem: id => `${PREFIX}/answer/${id}`,
  answerToday: `${PREFIX}/answerToday`,
  answerSingle: id => `${PREFIX}/answerSingle/${id}`,
  qiniuToken: `${PREFIX}/qiniu`,
  qiniu_API: "https://upload-z2.qiniup.com",
  column: `${PREFIX}/column`,
  columnItem: id => `${PREFIX}/column/${id}`,
  columnSelect: `${PREFIX}/columnSelected`,
  columnSelected: id => `${PREFIX}/columnSelected/${id}`,
  columnUnSelected: id => `${PREFIX}/columnUnSelected/${id}`,
  table: `${PREFIX}/table`,
  tableRecommendSelected: `${PREFIX}/table/1/selected`,
  tableRecommendUnSelected: `${PREFIX}/table/1/unSelected`,
  tableAnswerSelected: `${PREFIX}/table/2/selected`,
  tableAnswerUnSelected: `${PREFIX}/table/2/unSelected`,
  banner: `${PREFIX}/banner`,
  bannerItem: id => `${PREFIX}/banner/${id}`,
  article: `${PREFIX}/article`,
  articleItem: id => `${PREFIX}/article/${id}`
};

export default API;
