import { createContext, useState } from "react";


export const Ctx = createContext();


const Provider = (props) => {

    const locStored = sessionStorage.getItem("location");
    const storedLocationData = locStored ? JSON.parse(locStored) : {
        lat: null,
        long: null
    }
    const [city, setCity] = useState();
    const [location, setLocation] = useState(storedLocationData);

    return <Ctx.Provider value={{city, setCity, location, setLocation}}>{props.children}</Ctx.Provider>
}

export default Provider;