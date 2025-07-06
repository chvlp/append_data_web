import {Loader2} from "lucide-react";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

export default function LoadingScreen() {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/dashboard");
        }, 3000); // 5 minutes = 300,000 ms

        return () => clearTimeout(timer); // cleanup in case component unmounts
    }, [navigate]);
    return (
        <div className="flex justify-center items-center h-screen">
            <Loader2 className="h-20 w-20 animate-spin text-muted-foreground"/>
        </div>
    );
}
