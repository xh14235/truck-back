import { get, post } from "./http";
import qs from "qs";

// 错误信息处理
export const getErrorMsg = params => {
  return params.message || params.errorMsg;
};

// 登录 获取token
export const login = params => post("admin/admin/login", params);

// 获取登录信息

export const getInfo = params => get("admin/admin/info", params);

// 获取用户列表
export const getUserList = params => get("admin/admin/list", params);

// 增加新用户
export const addUser = params => post("admin/admin/add", params);

// 修改用户状态
export const changeUserStatus = params =>
  post("/admin/admin/updateStatus", params);

// 删除用户
export const deleteUser = params => post("/admin/admin/delete", params);

// 修改用户信息
export const updateUser = params => post("/admin/admin/update", params);

// 根据角色名称分页获取角色列表
export const getRoleList = params => get("admin/role/list", params);

// 添加角色
export const addRole = params => post("admin/role/create", params);

// 批量删除角色
export const deleteRole = params =>
  post("admin/role/delete", qs.stringify(params));

// 获取菜单列表
export const getMenuList = params => get("admin/menu/treeList", params);

// 创建菜单
export const createMenu = params => post("admin/menu/create", params);

// 给角色分配菜单
export const menuToRole = params => post("admin/role/allocMenu", params);

// 给角色分配资源
export const ResourceToRole = params =>
  post("admin/role/allocResource", params);

// 获取资源分类
export const getResourceType = params =>
  get("admin/resourceCategory/listAll", params);

// 获取所有资源
export const getAllResource = params => get("admin/resource/listAll", params);

// 根据关键词模糊查询资源
export const getResourceByKeywords = params =>
  get("admin/resource/list", params);

// 添加后台资源
export const createResource = params => post("admin/resource/create", params);

// 获取仪表仪器列表
export const getEquipmentList = params => get("admin/admin/meter/list", params);

// 添加新的仪器仪表
export const addEquipment = params => post("admin/admin/meter/create", params);

// 导出
export const exportData = params =>
  get("admin/admin/meter/export/excel", params);
