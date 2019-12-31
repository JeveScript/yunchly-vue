const AccountLogin = () =>
  import(/* webpackChunkName: "AccountLogin" */ "@/views/login"); //登录页
const Dashboard = () =>
  import(/* webpackChunkName: "index" */ "@/views/Dashboard"); // 概览
const index = () => import(/* webpackChunkName: "index" */ "@/views/index");
const banner = () => import(/* webpackChunkName: "index" */ "@/views/banner");
const bannerCreate = () =>
  import(/* webpackChunkName: "index" */ "@/views/bannerCreate");
const bannerSingle = () =>
  import(/* webpackChunkName: "index" */ "@/views/bannerSingle");
const manager = () =>
  import(/* webpackChunkName: "Manager" */ "@/views/manager"); //管理员
const managerCreate = () =>
  import(/* webpackChunkName: "Manager" */ "@/views/managerCreate"); //管理员添加
const managerEdit = () =>
  import(/* webpackChunkName: "Manager" */ "@/views/managerEdit"); //管理员编辑
const user = () => import(/* webpackChunkName: "User" */ "@/views/user"); // 用户
const userSingle = () =>
  import(/* webpackChunkName: "User" */ "@/views/userSingle"); // 用户详情
const category = () =>
  import(/* webpackChunkName: "Category" */ "@/views/category"); // 分类管理
const topic = () => import(/* webpackChunkName: "Topic" */ "@/views/topic"); // 话题管理
const topicCreate = () =>
  import(/* webpackChunkName: "Topic" */ "@/views/topicCreate"); //话题添加
const topicEdit = () =>
  import(/* webpackChunkName: "Topic" */ "@/views/topicEdit"); //话题编辑
const answer = () => import(/* webpackChunkName: "Answer" */ "@/views/answer"); // 回答管理
const answerSingle = () =>
  import(/* webpackChunkName: "Answer" */ "@/views/answerSingle");
const column = () => import(/* webpackChunkName: "column" */ "@/views/column"); // 合辑管理
const columnCreate = () =>
  import(/* webpackChunkName: "column" */ "@/views/columnCreate"); // 合辑添加
const columnSingle = () =>
  import(/* webpackChunkName: "column" */ "@/views/columnSingle");
const article = () =>
  import(/* webpackChunkName: "article" */ "@/views/article"); // 文章管理
const articleCreate = () =>
  import(/* webpackChunkName: "article" */ "@/views/articleCreate");
const articleSingle = () =>
  import(/* webpackChunkName: "article" */ "@/views/articleSingle");

import BasicLayout from "@/components/BasicLayout";

export default [
  {
    path: "/",
    component: AccountLogin,
    name: "login"
  },
  {
    path: "/admin",
    component: BasicLayout,
    name: "admin",
    children: [
      {
        path: "/admin",
        name: "DashboardRoot",
        component: { render: h => h("router-view") },
        redirect: { name: "Dashboard" },
        meta: {
          nav: {
            icon: "el-icon-pie-chart",
            title: "概况"
          },
          breadcrumb: {
            title: "概况"
          }
        },
        children: [
          {
            path: "/admin",
            name: "Dashboard",
            component: Dashboard
          },
          {
            path: "/admin/answerSingle",
            name: "answerSingle",
            component: answerSingle,
            meta: {
              breadcrumb: {
                title: "详情"
              }
            }
          }
        ]
      },
      {
        path: "/admin/index",
        name: "indenRoot",
        component: { render: h => h("router-view") },
        redirect: { name: "index" },
        meta: {
          nav: {
            icon: "el-icon-monitor",
            title: "首页管理"
          },
          breadcrumb: {
            title: "首页管理"
          }
        },
        children: [
          {
            path: "/admin/index",
            name: "index",
            component: index,
            meta: {
              nav: {
                icon: "el-icon-chat-line-square",
                title: "推荐及答题"
              },
              breadcrumb: {
                title: "推荐及答题"
              }
            }
          },
          {
            path: "/admin/index/banner",
            name: "banner",
            component: banner,
            meta: {
              nav: {
                icon: "el-icon-c-scale-to-original",
                title: "滑动轮播"
              },
              breadcrumb: {
                title: "滑动轮播"
              }
            }
          },
          {
            path: "/admin/index/bannerCreate",
            name: "bannerCreate",
            component: bannerCreate,
            meta: {
              breadcrumb: {
                title: "新增"
              }
            }
          },
          {
            path: "/admin/index/bannerSingle",
            name: "bannerSingle",
            component: bannerSingle,
            meta: {
              breadcrumb: {
                title: "详情"
              }
            }
          },
          {
            path: "/admin/index/article",
            name: "article",
            component: article,
            meta: {
              nav: {
                icon: "el-icon-tickets",
                title: "文章管理"
              },
              breadcrumb: {
                title: "文章管理"
              }
            }
          },
          {
            path: "/admin/index/articleCreate",
            name: "articleCreate",
            component: articleCreate,
            meta: {
              breadcrumb: {
                title: "增加"
              }
            }
          },
          {
            path: "/admin/index/articleSingle",
            name: "articleSingle",
            component: articleSingle,
            meta: {
              breadcrumb: {
                title: "详情"
              }
            }
          }
        ]
      },
      {
        path: "/admin/topic",
        name: "topicrRoot",
        component: { render: h => h("router-view") },
        redirect: { name: "topic" },
        meta: {
          nav: {
            icon: "el-icon-chat-line-round",
            title: "话题管理"
          },
          breadcrumb: {
            title: "话题管理"
          }
        },
        children: [
          {
            path: "/admin/topic",
            name: "topic",
            component: topic,
            meta: {
              breadcrumb: {
                title: "菜单"
              }
            }
          },
          {
            path: "/admin/topic/create",
            name: "topicCreate",
            component: topicCreate,
            meta: {
              breadcrumb: {
                title: "创建"
              }
            }
          },
          {
            path: "/admim/topic/edit",
            name: "topicEdit",
            component: topicEdit,
            meta: {
              breadcrumb: {
                title: "修改"
              }
            }
          },
          {
            path: "/admin/topic/answer",
            name: "answer",
            component: answer,
            meta: {
              breadcrumb: {
                title: "详情"
              }
            }
          },
          {
            path: "/admin/answerSingle",
            name: "answerSingle",
            component: answerSingle,
            meta: {
              breadcrumb: {
                title: "回答详情"
              }
            }
          }
        ]
      },
      {
        path: "/admin/column",
        name: "columnRoot",
        component: { render: h => h("router-view") },
        redirect: { name: "column" },
        meta: {
          nav: {
            icon: "el-icon-star-off",
            title: "合辑管理"
          },
          breadcrumb: {
            title: "合辑管理"
          }
        },
        children: [
          {
            path: "/admin/column",
            name: "column",
            component: column
          },
          {
            path: "/admin/column/create",
            name: "columnCreate",
            component: columnCreate,
            meta: {
              breadcrumb: {
                title: "添加"
              }
            }
          },
          {
            path: "/admin/column/single",
            name: "columnSingle",
            component: columnSingle
          }
        ]
      },
      {
        path: "/admin/category",
        name: "category",
        component: category,
        meta: {
          nav: {
            icon: "el-icon-sort",
            title: "分类管理"
          },
          breadcrumb: {
            title: "分类管理"
          }
        }
      },
      {
        path: "/admin/user",
        name: "user",
        component: { render: h => h("router-view") },
        redirect: { name: "user" },
        meta: {
          nav: {
            icon: "el-icon-s-data",
            title: "用户管理"
          },
          breadcrumb: {
            title: "用户管理"
          }
        },
        children: [
          {
            path: "/admin/user",
            name: "user",
            component: user
          },
          {
            path: "/admin/user/single",
            name: "userSingle",
            component: userSingle,
            meta: {
              breadcrumb: {
                title: "详情"
              }
            }
          }
        ]
      },
      {
        path: "/admin/manager",
        name: "managerRoot",
        component: { render: h => h("router-view") },
        redirect: { name: "manager" },
        meta: {
          nav: {
            icon: "el-icon-s-custom",
            title: "管理员"
          },
          breadcrumb: {
            title: "管理员"
          }
        },
        children: [
          {
            path: "/admin/manager",
            name: "manager",
            component: manager
          },
          {
            path: "/admin/manager/create",
            name: "managerCreate",
            component: managerCreate,
            meta: {
              breadcrumb: {
                title: "创建"
              }
            }
          },
          {
            path: "/admim/manager/edit",
            name: "managerEdit",
            component: managerEdit,
            meta: {
              breadcrumb: {
                title: "修改"
              }
            }
          }
        ]
      }
    ]
  }
];
