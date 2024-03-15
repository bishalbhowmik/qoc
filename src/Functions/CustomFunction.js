
export const timeCheck = (startTime, endTime) => {

    if (new Date() >= new Date(startTime) && new Date() <= new Date(endTime)) {

        return true

    }
    else {

        return false
    }

}



export function base64ToBlob(base64, type = "application/octet-stream") {
    const binStr = atob(base64);
    const len = binStr.length;
    const arr = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        arr[i] = binStr.charCodeAt(i);
    }
    return new Blob([arr], { type: type });
}



export const showFile = async (file) => {

    // Need base64ToBlob function

    let base64 = file.data;
    let blob = base64ToBlob(base64, file.contentType);
    let url = URL.createObjectURL(blob);
    window.open(url);
};



export const getFileUrl = (file) => {
    let base64 = file.data;
    let blob = base64ToBlob(base64, file.contentType);
    let url = URL.createObjectURL(blob);
    return url
}


export const remainingTime = (endTime) => {

    let now = new Date();
    let end = new Date(endTime);

    // Convert to local time in "Asia/Dhaka" timezone
    now.toLocaleString("en-US", { timeZone: "Asia/Dhaka" });
    end.toLocaleString("en-US", { timeZone: "Asia/Dhaka" });

    let timeDifference = end - now;

    let seconds = Math.floor((timeDifference / 1000) % 60);
    let minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
    let hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);

    return `${hours} hours, ${minutes} minutes, ${seconds} seconds`

}























// <object width='100%' height='100%' data='${bufferToDataUrl(file.contentType, file.data)}'></object>