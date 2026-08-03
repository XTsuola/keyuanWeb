import request from "./index";

export function getGameMap() {
  return request({
    url: "/qingshu/getMap",
    method: "get",
  });
}
