
export const timeCheck = (startTime, endTime) => {

    if(new Date() >= new Date(startTime) && new Date() <= new Date(endTime)){

        return true

    }
    else{
            
            return false
    }

}