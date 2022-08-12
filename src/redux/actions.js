export const HANDLE_PROPERTY_TYPE = 'HANDLE_PROPERTY_TYPE';
export const HANDLE_STATE = 'HANDLE_STATE';
export const HANDLE_CITY = 'HANDLE_CITY';



export const handlePropertyType =(id)=>{
     
    return {
        type:HANDLE_PROPERTY_TYPE,
        payload:{id}
    }
}

