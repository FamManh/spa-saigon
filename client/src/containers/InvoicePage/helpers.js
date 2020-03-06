export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export let gererateQrCodeText = (
    date,
    time,
    price,
    fn = "9289000100616591",
    i = "56409",
    fp = "3342018027"
) => {
    let text = `t=${date.split(".").join("")}t${time
        .split(":")
        .join("")}&s=${price.replace(",", ".")}&fn=${fn}&i=${i}&fp=${fp}&n=1`;
    return text.replace(" ", "");
};
