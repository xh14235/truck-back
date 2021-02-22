const popup = {
  state: {
    user: {
      userStatePopup: false,
      userAddPopup: false,
      userRolePopup: false,
      userRevisePopup: false,
      userDeletePopup: false
    },
    role: {
      roleAddPopup: false,
      roleStatePopup: false,
      roleRevisePopup: false,
      roleDeletePopup: false,
      roleMenuPopup: false,
      roleRightPopup: false
    },
    menu: {
      menuAddPopup: false,
      menuStatePopup: false,
      menuRevisePopup: false,
      menuFailedPopup: false,
      menuDeletePopup: false
    },
    resource: {
      resourceAddPopup: false,
      resourceRevisePopup: false,
      resourceDeletePopup: false
    }
  },
  mutations: {
    // 用户
    showUserStatePopup(state) {
      state.user.userStatePopup = true;
    },
    showUserAddPopup(state) {
      state.user.userAddPopup = true;
    },
    showUserRolePopup(state) {
      state.user.userRolePopup = true;
    },
    showUserRevisePopup(state) {
      state.user.userRevisePopup = true;
    },
    showUserDeletePopup(state) {
      state.user.userDeletePopup = true;
    },
    // 角色
    showRoleAddPopup(state) {
      state.role.roleAddPopup = true;
    },
    showRoleStatePopup(state) {
      state.role.roleStatePopup = true;
    },
    showRoleRevisePopup(state) {
      state.role.roleRevisePopup = true;
    },
    showRoleDeletePopup(state) {
      state.role.roleDeletePopup = true;
    },
    showRoleMenuPopup(state) {
      state.role.roleMenuPopup = true;
    },
    showRoleRightPopup(state) {
      state.role.roleRightPopup = true;
    },
    // 菜单
    showMenuStatePopup(state) {
      state.menu.menuStatePopup = true;
    },
    showMenuAddPopup(state) {
      state.menu.menuAddPopup = true;
    },
    showMenuFailedPopup(state) {
      state.menu.menuFailedPopup = true;
    },
    showMenuRevisePopup(state) {
      state.menu.menuRevisePopup = true;
    },
    showMenuDeletePopup(state) {
      state.menu.menuDeletePopup = true;
    },
    // 资源
    showResourceAddPopup(state) {
      state.resource.resourceAddPopup = true;
    },
    showResourceRevisePopup(state) {
      state.resource.resourceRevisePopup = true;
    },
    showResourceDeletePopup(state) {
      state.resource.resourceDeletePopup = true;
    },
    hidePopup(state) {
      // 用户
      state.user.userStatePopup = false;
      state.user.userAddPopup = false;
      state.user.userRolePopup = false;
      state.user.userRevisePopup = false;
      state.user.userDeletePopup = false;
      // 角色
      state.role.roleAddPopup = false;
      state.role.roleStatePopup = false;
      state.role.roleRevisePopup = false;
      state.role.roleDeletePopup = false;
      state.role.roleMenuPopup = false;
      state.role.roleRightPopup = false;
      // 菜单
      state.menu.menuStatePopup = false;
      state.menu.menuAddPopup = false;
      state.menu.menuFailedPopup = false;
      state.menu.menuRevisePopup = false;
      state.menu.menuDeletePopup = false;
      // 资源
      state.resource.resourceAddPopup = false;
      state.resource.resourceRevisePopup = false;
      state.resource.resourceDeletePopup = false;
    }
  }
};

export default popup;
