export function initArray2() {
    const rows = 10;
    const cols = 9;
    const defaultValue = 0;
    return Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => defaultValue)
    );
}

let gong1 = [73, 74, 75, 83, 84, 85, 93, 94, 95], gong2 = [3, 4, 5, 13, 14, 15, 23, 24, 25];

export function luoji(index1: number, index2: number, mapData: any) {
    let canMap = initArray2();
    let now = mapData[index1][index2];
    let len1 = mapData.length;
    let len2 = mapData[0].length;
    if (now == 1) { // 兵
        // 前
        if (index1 - 1 >= 0) {
            if (mapData[index1 - 1][index2] == 0 || mapData[index1 - 1][index2] > 10) {
                canMap[index1 - 1][index2] = 1;
            }
        }
        // 判断是否过河
        if (index1 <= 4) {
            // 左
            if (index2 - 1 >= 0 || mapData[index1][index2 - 1] > 10) {
                canMap[index1][index2 - 1] = 1;
            }
            // 右
            if (index2 + 1 < len2 || mapData[index1][index2 + 1] > 10) {
                canMap[index1][index2 + 1] = 1;
            }
        }
    }
    if (now == 2 || now == 12) { // 红炮 黑炮
        // 上
        for (let i = index1 - 1; i >= 0; i--) {
            if (mapData[i][index2] == 0) {
                canMap[i][index2] = 1;
            } else {
                // 发射
                if (now == 2) {
                    for (let j = i - 1; j >= 0; j--) {
                        if (mapData[j][index2] > 10) {
                            canMap[j][index2] = 1;
                            break
                        }
                        if (mapData[j][index2] != 0 && mapData[j][index2] < 10) break
                    }
                }
                if (now == 12) {
                    for (let j = i - 1; j >= 0; j--) {
                        if (mapData[j][index2] != 0 && mapData[j][index2] < 10) {
                            canMap[j][index2] = 1;
                            break
                        }
                    }
                }
                break
            }
        }
        // 下
        for (let i = index1 + 1; i < len1; i++) {
            if (mapData[i][index2] == 0) {
                canMap[i][index2] = 1;
            } else {
                // 发射
                if (now == 2) {
                    for (let j = i + 1; j < len1; j++) {
                        if (mapData[j][index2] > 10) {
                            canMap[j][index2] = 1;
                            break
                        }
                        if (mapData[j][index2] != 0 && mapData[j][index2] < 10) break
                    }
                }
                if (now == 12) {
                    for (let j = i + 1; j < len1; j++) {
                        if (mapData[j][index2] != 0 && mapData[j][index2] < 10) {
                            canMap[j][index2] = 1;
                            break
                        }
                    }
                }
                break
            }
        }
        // 左
        for (let i = index2 - 1; i >= 0; i--) {
            if (mapData[index1][i] == 0) {
                canMap[index1][i] = 1;
            } else {
                // 发射
                if (now == 2) {
                    for (let j = i - 1; j >= 0; j--) {
                        if (mapData[index1][j] > 10) {
                            canMap[index1][j] = 1;
                            break
                        }
                        if (mapData[index1][j] != 0 && mapData[index1][j] < 10) break
                    }
                }
                if (now == 12) {
                    for (let j = i - 1; j >= 0; j--) {
                        if (mapData[index1][j] != 0 && mapData[index1][j] < 10) {
                            canMap[index1][j] = 1;
                            break
                        }
                        if (mapData[index1][j] != 0 && mapData[index1][j] > 10) break
                    }
                }
                break
            }
        }
        // 右
        for (let i = index2 + 1; i < len2; i++) {
            if (mapData[index1][i] == 0) {
                canMap[index1][i] = 1;
            } else {
                // 发射
                if (now == 2) {
                    for (let j = i + 1; j < len2; j++) {
                        if (mapData[index1][j] > 10) {
                            canMap[index1][j] = 1;
                            break
                        }
                        if (mapData[index1][j] != 0 && mapData[index1][j] < 10) break
                    }
                }
                if (now == 12) {
                    for (let j = i + 1; j < len2; j++) {
                        if (mapData[index1][j] != 0 && mapData[index1][j] < 10) {
                            canMap[index1][j] = 1;
                            break
                        }
                        if (mapData[index1][j] != 0 && mapData[index1][j] > 10) break
                    }
                }
                break
            }
        }
    }
    if (now == 3 || now == 13) { // 红車 黑車
        // 上
        for (let i = index1 - 1; i >= 0; i--) {
            if (mapData[i][index2] == 0) {
                canMap[i][index2] = 1;
            } else {
                if (now == 3 && mapData[i][index2] > 10) canMap[i][index2] = 1;
                if (now == 13 && mapData[i][index2] < 10) canMap[i][index2] = 1;
                break
            }
        }
        // 下
        for (let i = index1 + 1; i < len1; i++) {
            if (mapData[i][index2] == 0) {
                canMap[i][index2] = 1;
            } else {
                if (now == 3 && mapData[i][index2] > 10) canMap[i][index2] = 1;
                if (now == 13 && mapData[i][index2] < 10) canMap[i][index2] = 1;
                break
            }
        }
        // 左
        for (let i = index2 - 1; i >= 0; i--) {
            if (mapData[index1][i] == 0) {
                canMap[index1][i] = 1;
            } else {
                if (now == 3 && mapData[index1][i] > 10) canMap[index1][i] = 1;
                if (now == 13 && mapData[index1][i] < 10) canMap[index1][i] = 1;
                break
            }
        }
        // 右
        for (let i = index2 + 1; i < len2; i++) {
            if (mapData[index1][i] == 0) {
                canMap[index1][i] = 1;
            } else {
                if (now == 3 && mapData[index1][i] > 10) canMap[index1][i] = 1;
                if (now == 13 && mapData[index1][i] < 10) canMap[index1][i] = 1;
                break
            }
        }
    }
    if (now == 4 || now == 14) { // 红馬 黑马
        // 右边别腿
        if (index2 + 1 < len2 && mapData[index1][index2 + 1] == 0) {
            // 右上
            if (index1 - 1 >= 0 && index2 + 2 < len2) {
                if (now == 4 && (mapData[index1 - 1][index2 + 2] == 0 || mapData[index1 - 1][index2 + 2] > 10)) {
                    canMap[index1 - 1][index2 + 2] = 1;
                }
                if (now == 14 && mapData[index1 - 1][index2 + 2] < 10) {
                    canMap[index1 - 1][index2 + 2] = 1;
                }
            }
            // 右下
            if (index1 + 1 < len1 && index2 + 2 < len2) {
                if (now == 4 && (mapData[index1 + 1][index2 + 2] == 0 || mapData[index1 + 1][index2 + 2] > 10)) {
                    canMap[index1 + 1][index2 + 2] = 1;
                }
                if (now == 14 && mapData[index1 + 1][index2 + 2] < 10) {
                    canMap[index1 + 1][index2 + 2] = 1;
                }
            }
        }
        // 上边别腿
        if (index1 - 1 >= 0 && mapData[index1 - 1][index2] == 0) {
            // 上左
            if (index1 - 2 >= 0 && index2 - 1 >= 0) {
                if (now == 4 && (mapData[index1 - 2][index2 - 1] == 0 || mapData[index1 - 2][index2 - 1] > 10)) {
                    canMap[index1 - 2][index2 - 1] = 1;
                }
                if (now == 14 && mapData[index1 - 2][index2 - 1] < 10) {
                    canMap[index1 - 2][index2 - 1] = 1;
                }
            }
            // 上右
            if (index1 - 2 >= 0 && index2 + 1 < len2) {
                if (now == 4 && (mapData[index1 - 2][index2 + 1] == 0 || mapData[index1 - 2][index2 + 1] > 10)) {
                    canMap[index1 - 2][index2 + 1] = 1;
                }
                if (now == 14 && mapData[index1 - 2][index2 + 1] < 10) {
                    canMap[index1 - 2][index2 + 1] = 1;
                }
            }
        }
        // 左边别腿
        if (index2 - 1 >= 0 && mapData[index1][index2 - 1] == 0) {
            // 左下
            if (index1 + 1 < len1 && index2 - 2 >= 0) {
                if (now == 4 && (mapData[index1 + 1][index2 - 2] == 0 || mapData[index1 + 1][index2 - 2] > 10)) {
                    canMap[index1 + 1][index2 - 2] = 1;
                }
                if (now == 14 && mapData[index1 + 1][index2 - 2] < 10) {
                    canMap[index1 + 1][index2 - 2] = 1;
                }
            }
            // 左上
            if (index1 - 1 >= 0 && index2 - 2 >= 0) {
                if (now == 4 && (mapData[index1 - 1][index2 - 2] == 0 || mapData[index1 - 1][index2 - 2] > 10)) {
                    canMap[index1 - 1][index2 - 2] = 1;
                }
                if (now == 14 && mapData[index1 - 1][index2 - 2] < 10) {
                    canMap[index1 - 1][index2 - 2] = 1;
                }
            }
        }
        // 下边别腿
        if (index1 + 1 < len1 && mapData[index1 + 1][index2] == 0) {
            // 下左
            if (index1 + 2 < len1 && index2 - 1 >= 0) {
                if (now == 4 && (mapData[index1 + 2][index2 - 1] == 0 || mapData[index1 + 2][index2 - 1] > 10)) {
                    canMap[index1 + 2][index2 - 1] = 1;
                }
                if (now == 14 && mapData[index1 + 2][index2 - 1] < 10) {
                    canMap[index1 + 2][index2 - 1] = 1;
                }
            }
            // 下右
            if (index1 + 2 < len1 && index2 + 1 < len2) {
                if (now == 4 && (mapData[index1 + 2][index2 + 1] == 0 || mapData[index1 + 2][index2 + 1] > 10)) {
                    canMap[index1 + 2][index2 + 1] = 1;
                }
                if (now == 14 && mapData[index1 + 2][index2 + 1] < 10) {
                    canMap[index1 + 2][index2 + 1] = 1;
                }
            }
        }
    }
    if (now == 5) { // 相
        // 右上
        if (index1 - 2 >= (len1 / 2 - 1) && index2 + 2 < len2) {
            if (mapData[index1 - 2][index2 + 2] == 0 || mapData[index1 - 2][index2 + 2] > 10) {
                if (mapData[index1 - 1][index2 + 1] == 0) {
                    canMap[index1 - 2][index2 + 2] = 1;
                }
            }
        }
        // 左上
        if (index1 - 2 >= (len1 / 2 - 1) && index2 - 2 >= 0) {
            if (mapData[index1 - 2][index2 - 2] == 0 || mapData[index1 - 2][index2 - 2] > 10) {
                if (mapData[index1 - 1][index2 - 1] == 0) {
                    canMap[index1 - 2][index2 - 2] = 1;
                }
            }
        }
        // 左下
        if (index1 + 2 < len1 && index2 - 2 >= 0) {
            if (mapData[index1 + 2][index2 - 2] == 0 || mapData[index1 + 2][index2 - 2] > 10) {
                if (mapData[index1 + 1][index2 - 1] == 0) {
                    canMap[index1 + 2][index2 - 2] = 1;
                }
            }
        }
        // 右下
        if (index1 + 2 < len1 && index2 + 2 < len2) {
            if (mapData[index1 + 2][index2 + 2] == 0 || mapData[index1 + 2][index2 + 2] > 10) {
                if (mapData[index1 + 1][index2 + 1] == 0) {
                    canMap[index1 + 2][index2 + 2] = 1;
                }
            }
        }
    }
    if (now == 6) { // 仕
        // 右上
        if (gong1.findIndex(e => e == index1 * 10 + index2 - 9) != -1) {
            if (mapData[index1 - 1][index2 + 1] == 0 || mapData[index1 - 1][index2 + 1] > 10) {
                canMap[index1 - 1][index2 + 1] = 1;
            }
        }
        // 左上
        if (gong1.findIndex(e => e == index1 * 10 + index2 - 11) != -1) {
            if (mapData[index1 - 1][index2 - 1] == 0 || mapData[index1 - 1][index2 - 1] > 10) {
                canMap[index1 - 1][index2 - 1] = 1;
            }

        }
        // 左下
        if (index1 + 1 < len1 && gong1.findIndex(e => e == index1 * 10 + index2 + 9) != -1) {
            if (mapData[index1 + 1][index2 - 1] == 0 || mapData[index1 + 1][index2 - 1] > 10) {
                canMap[index1 + 1][index2 - 1] = 1;
            }
        }
        // 右下
        if (index1 + 1 < len1 && gong1.findIndex(e => e == index1 * 10 + index2 + 11) != -1) {
            if (mapData[index1 + 1][index2 + 1] == 0 || mapData[index1 + 1][index2 + 1] > 10) {
                canMap[index1 + 1][index2 + 1] = 1;
            }
        }
    }
    if (now == 7) { // 帅
        // 上
        if (gong1.findIndex(e => e == index1 * 10 + index2 - 10) != -1) {
            if (mapData[index1 - 1][index2] == 0 || mapData[index1 - 1][index2] > 10) {
                canMap[index1 - 1][index2] = 1;
            }
        }
        // 下
        if (index1 + 1 < len1 && gong1.findIndex(e => e == index1 * 10 + index2 + 10) != -1) {
            if (mapData[index1 + 1][index2] == 0 || mapData[index1 + 1][index2] > 10) {
                canMap[index1 + 1][index2] = 1;
            }
        }
        // 左
        if (gong1.findIndex(e => e == index1 * 10 + index2 - 1) != -1) {
            if (mapData[index1][index2 - 1] == 0 || mapData[index1][index2 - 1] > 10) {
                canMap[index1][index2 - 1] = 1;
            }
        }
        // 右
        if (gong1.findIndex(e => e == index1 * 10 + index2 + 1) != -1) {
            if (mapData[index1][index2 + 1] == 0 || mapData[index1][index2 + 1] > 10) {
                canMap[index1][index2 + 1] = 1;
            }
        }
        // 飞帅
        for (let i = index1 - 1; i >= 0; i--) {
            if (mapData[i][index2] == 0) {
                continue
            } else if (mapData[i][index2] == 17) {
                canMap[i][index2] = 1;
            } else {
                break
            }
        }
    }
    if (now == 11) { // 卒
        // 前
        if (index1 + 1 < len1) {
            if (mapData[index1 + 1][index2] < 10) {
                canMap[index1 + 1][index2] = 1;
            }
        }
        // 判断是否过河
        if (index1 >= 5) {
            // 左
            if (index2 - 1 >= 0 || mapData[index1][index2 - 1] < 10) {
                canMap[index1][index2 - 1] = 1;
            }
            // 右
            if (index2 + 1 < len2 || mapData[index1][index2 + 1] < 10) {
                canMap[index1][index2 + 1] = 1;
            }
        }
    }
    if (now == 15) { // 象
        // 右上
        if (index1 - 2 >= 0 && index2 + 2 < len2) {
            if (mapData[index1 - 2][index2 + 2] < 10) {
                if (mapData[index1 - 1][index2 + 1] == 0) {
                    canMap[index1 - 2][index2 + 2] = 1;
                }
            }
        }
        // 左上
        if (index1 - 2 >= 0 && index2 - 2 >= 0) {
            if (mapData[index1 - 2][index2 - 2] < 10) {
                if (mapData[index1 - 1][index2 - 1] == 0) {
                    canMap[index1 - 2][index2 - 2] = 1;
                }
            }
        }
        // 左下
        if (index1 + 2 < (len1 / 2) && index2 - 2 >= 0) {
            if (mapData[index1 + 2][index2 - 2] < 10) {
                if (mapData[index1 + 1][index2 - 1] == 0) {
                    canMap[index1 + 2][index2 - 2] = 1;
                }
            }
        }
        // 右下
        if (index1 + 2 < (len1 / 2) && index2 + 2 < len2) {
            if (mapData[index1 + 2][index2 + 2] < 10) {
                if (mapData[index1 + 1][index2 + 1] == 0) {
                    canMap[index1 + 2][index2 + 2] = 1;
                }
            }
        }
    }
    if (now == 16) { // 士
        // 右上
        if (index1 - 1 >= 0 && gong2.findIndex(e => e == index1 * 10 + index2 - 9) != -1) {
            if (mapData[index1 - 1][index2 + 1] < 10) {
                canMap[index1 - 1][index2 + 1] = 1;
            }
        }
        // 左上
        if (index1 - 1 >= 0 && gong2.findIndex(e => e == index1 * 10 + index2 - 11) != -1) {
            if (mapData[index1 - 1][index2 - 1] < 10) {
                canMap[index1 - 1][index2 - 1] = 1;
            }

        }
        // 左下
        if (gong2.findIndex(e => e == index1 * 10 + index2 + 9) != -1) {
            if (mapData[index1 + 1][index2 - 1] < 10) {
                canMap[index1 + 1][index2 - 1] = 1;
            }
        }
        // 右下
        if (gong2.findIndex(e => e == index1 * 10 + index2 + 11) != -1) {
            if (mapData[index1 + 1][index2 + 1] < 10) {
                canMap[index1 + 1][index2 + 1] = 1;
            }
        }
    }
    if (now == 17) { // 将
        // 上
        if (index1 - 1 >= 0 && gong2.findIndex(e => e == index1 * 10 + index2 - 10) != -1) {
            if (mapData[index1 - 1][index2] < 10) {
                canMap[index1 - 1][index2] = 1;
            }
        }
        // 下
        if (gong2.findIndex(e => e == index1 * 10 + index2 + 10) != -1) {
            if (mapData[index1 + 1][index2] < 10) {
                canMap[index1 + 1][index2] = 1;
            }
        }
        // 左
        if (gong2.findIndex(e => e == index1 * 10 + index2 - 1) != -1) {
            if (mapData[index1][index2 - 1] < 10) {
                canMap[index1][index2 - 1] = 1;
            }
        }
        // 右
        if (gong2.findIndex(e => e == index1 * 10 + index2 + 1) != -1) {
            if (mapData[index1][index2 + 1] < 10) {
                canMap[index1][index2 + 1] = 1;
            }
        }
        // 飞帅
        for (let i = index1 + 1; i < len1; i++) {
            if (mapData[i][index2] == 0) {
                continue
            } else if (mapData[i][index2] == 7) {
                canMap[i][index2] = 1;
            } else {
                break
            }
        }
    }
    return canMap;
}