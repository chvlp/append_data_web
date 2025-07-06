import {Loader2} from "lucide-react";

export default function LoadingComponent() {
    return (
        <div className="flex justify-center items-center h-screen">
            <Loader2 className="h-20 w-20 animate-spin text-muted-foreground"/>
        </div>
    );
}
