import { signout } from "./api.auth";

// Auth mechanism
const authenticate = (jwt, cb) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(jwt));
  }
  cb();
};

const isAuthenticated = () => {
  if (typeof window === "undefined") return false;
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};

const clearJWT = (cb) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
    signout().then((data) => {
      document.cookie = "t=; expires=Jan 1970 00:00:00 UTC;path=/;";
    });
    cb();
  }
};

export { authenticate, isAuthenticated, clearJWT };
