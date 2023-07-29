
export const getGeoLocation = () => {
    if(navigator.geolocation){
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition((position) => resolve(position), (error) => reject(error))
    })}
    return null;
}