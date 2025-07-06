import {Card,  CardContent, CardHeader} from "@/components/ui/card.tsx";
import { Label } from "@/components/ui/label.tsx";
import {NavLink} from "react-router-dom";

export default function ServerErrorScreen() {
    return (
        <div className="flex items-center justify-center h-screen">
            <Card className="text-center border-none shadow-none rounded-none">
                <CardHeader className="text-center text-red-500">
                    <Label className="font-bold text-3xl">500</Label>
                </CardHeader>
                <CardContent>
                    <Label className="text-lg">Server Error</Label>
                </CardContent>
                <CardContent>
                    <NavLink to={"/dashboard"}>
                        <Label className={'underline cursor-pointer'}>Go back</Label>
                    </NavLink>
                </CardContent>
            </Card>
        </div>
    );
}
