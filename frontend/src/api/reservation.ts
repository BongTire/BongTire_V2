import client from ".";

const getCalendar = (ptcd:string, pccd:string) =>{
    return client.get('/reservation/calendar',{
        params:{
            ptcd: ptcd,
            pccd: pccd
        }
    })
}

export{ getCalendar}