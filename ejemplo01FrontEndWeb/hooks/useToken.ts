function useToken() {
    function getToken() {
      const tokenString = localStorage.getItem("token");
      const userToken = tokenString ? JSON.parse(tokenString) : null;
      return userToken;
    }
  
    function setToken(userToken: { token: string; role: string }) {
      localStorage.setItem("token", JSON.stringify(userToken));
    }
  
    return {
      getToken,
      setToken,
    };
  }
  
  export default useToken;
  