import bufferToDataUrl from "buffer-to-data-url";

export const timeCheck = (startTime, endTime) => {

    if(new Date() >= new Date(startTime) && new Date() <= new Date(endTime)){

        return true

    }
    else{
            
            return false
    }

}



export const showFile = file => {

    let newWindow = window.open();

    newWindow.document.write(`

        <object width='100%' height='100%'  data='${bufferToDataUrl(file.contentType, file.data)}'></object>
        
        `);
}
