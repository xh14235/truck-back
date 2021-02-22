let defaultToken = sessionStorage.getItem("token") || "";
let defaultUserName = localStorage.username || "";

const common = {
  state: {
    token: defaultToken,
    username: defaultUserName,
    baseUrl: "http://116.236.30.222:9700",
    roleChange: 0,
    userChange: 0,
    menuChange: 0,
    resourceChange: 0,
    menu: [
      {
        title: "用户管理",
        url: "/user",
        icon: "menu-user",
        children: [
          {
            title: "用户列表",
            url: "/user/userlist"
          },
          {
            title: "角色列表",
            url: "/user/rolelist"
          },
          {
            title: "菜单列表",
            url: "/user/menulist"
          },
          {
            title: "资源列表",
            url: "/user/resourcelist"
          }
        ]
      },
      {
        title: "台账管理",
        url: "/account",
        icon: "menu-account",
        children: [
          {
            title: "动力设备管理",
            url: "/account/equipment"
          },
          {
            title: "仪表管理",
            url: "/account/meter"
          }
        ]
      }
    ]
  },
  mutations: {
    mutLogin(state, token) {
      state.token = token;
    },
    mutRoleChange(state) {
      state.roleChange++;
    },
    mutUserChange(state) {
      state.userChange++;
    },
    mutMenuChange(state) {
      state.menuChange++;
    },
    mutResourceChange(state) {
      state.resourceChange++;
    }
  }
};

export default common;
