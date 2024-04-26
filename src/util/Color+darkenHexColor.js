function darkenHexColor(hex, amount) {
    // 입력된 16진수 색상을 파싱하여 RGB 값으로 변환
    let r = parseInt(hex.substring(1, 3), 16);
    let g = parseInt(hex.substring(3, 5), 16);
    let b = parseInt(hex.substring(5, 7), 16);

    // 어둡게 만들고자 하는 양 계산
    amount = Math.floor((255 * amount) / 100);

    // 각각의 RGB 값을 조절하여 어둡게 만듦
    r = Math.max(0, r - amount);
    g = Math.max(0, g - amount);
    b = Math.max(0, b - amount);

    // 새로운 RGB 값을 16진수로 변환하여 반환
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

export {darkenHexColor};