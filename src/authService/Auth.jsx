export const isAuthenticated = () => {
    return !!localStorage.getItem("admin-token");
  };