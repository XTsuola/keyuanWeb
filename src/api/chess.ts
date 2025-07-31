import request from "../utils/request";

// 获取当前棋盘
export function getChessMap() {
  return request({
    url: "/chess/getMap",
    method: "get",
  });
}

// 重置棋盘
export function resetChessMap() {
  return request({
    url: "/chess/reset",
    method: "get",
  });
}

// 更新棋盘
export function updateChessMap(data: any) {
  return request({
    url: "/chess/update",
    method: "post",
    data: data,
  });
}