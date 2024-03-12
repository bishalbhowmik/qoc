
export const timeCheck = (startTime, endTime) => {

    if (new Date() >= new Date(startTime) && new Date() <= new Date(endTime)) {

        return true

    }
    else {

        return false
    }

}



function base64ToBlob(base64, type = "application/octet-stream") {
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


























// <object width='100%' height='100%' data='${bufferToDataUrl(file.contentType, file.data)}'></object>