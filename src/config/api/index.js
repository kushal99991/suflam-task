const API = {
  auth: {
    login: "/api/users/admin/login",
    adminData: "/api/users/admin/user-details",
    forgotPass: "/api/users/admin/reset-password",
    changePassword: "/api/users/admin/change-password",
    userResetPass: "/api/users/reset-password",
    ProfileChange: "users/update-profile",
    logout: "api/users/logout",
  },
  user: {
    create: "/api/users/register",
    userList: "/api/users/user-list?page=1&limit=100",
  },
  season: {
    seasonGet: "/api/admin/seasons",
    seasonCreate: "/api/admin/seasons",
    seasonUpdate: "/api/admin/seasons/",
    seasonDelete: "/api/admin/seasons/",
    seasonById: "/api/admin/seasons",
  },
  product:{
    get:""},
  poem: {
    poemCreate: "",
    poemUpdate: "",
    poemDelete: "",
  },
};

export { API };
