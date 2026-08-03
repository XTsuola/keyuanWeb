import request from "./index";

export function getChessMap() {
  return request({
    url: "/chess/getMap",
    method: "get",
  });
}

export function resetChessMap() {
  return request({
    url: "/chess/reset",
    method: "get",
  });
}

export function updateChessMap(data: unknown) {
  return request({
    url: "/chess/update",
    method: "post",
    data,
  });
}
