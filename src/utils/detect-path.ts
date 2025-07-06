import {useLocation} from "react-router-dom";

export const useLocationPath = () => {
    const location = useLocation();
    return location.pathname;
};