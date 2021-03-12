let defaultToken = sessionStorage.getItem("token") || "";
let defaultMenu2Active = sessionStorage.getItem("menu2Active") || 0;
let defaultRealName = sessionStorage.getItem("realName") || "游客";
let defaultMenu = JSON.parse(sessionStorage.getItem("menu")) || [];

const common = {
  state: {
    token: defaultToken,
    baseUrl: "http://116.236.30.222:9700/",
    roleChange: 0,
    userChange: 0,
    menuChange: 0,
    resourceChange: 0,
    equipmentChange: 0,
    menu: defaultMenu,
    realName: defaultRealName,
    menu2Active: defaultMenu2Active
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
    },
    mutEquipmentChange(state) {
      state.equipmentChange++;
    },
    mutMenu2Active(state, num) {
      state.menu2Active = num;
      sessionStorage.setItem("menu2Active", num);
    },
    mutRealName(state, realName) {
      state.realName = realName;
      sessionStorage.setItem("realName", realName);
    },
    mutMenu(state, menu) {
      state.menu = menu;
      sessionStorage.setItem("menu", JSON.stringify(menu));
    }
  }
};

export default common;
