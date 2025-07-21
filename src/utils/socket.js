import io from "socket.io-client";
import { BASE_URL } from "./constants";

export const createSocketConnection = () => {  
  return io(BASE_URL);
};

//https://socket.io/docs/v4/client-options/#path
// if issue occur in aws nginx deployment 
// ex. nginx config port 80 as api then write below code 

// import io from "socket.io-client";
// import { BASE_URL } from "./constants";

// export const createSocketConnection = () => {
//   if (location.hostname === "localhost") {
//     return io(BASE_URL);
//   } else {
//     return io("/", { path: "/api/socket.io" });
//   }
// };