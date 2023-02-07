class Session {
  get token() {
    return localStorage.getItem("token") || null;
  }

  clear = () => {
    localStorage.clear();
  };

  setToken = (token) => {
    localStorage.setItem("token", token);
  };

  get user() {
    return localStorage.getItem("user") || [];
  }

  setUser = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
  };

  setToken = (token) => {
    localStorage.setItem("token", JSON.stringify(token));
  };
}

export default new Session();
