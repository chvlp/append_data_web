import {Card, CardHeader} from "@/components/ui/card.tsx";
import {Label} from "@/components/ui/label.tsx";

export default function ProfileScreen() {
    return (
        <div className={"p-1 w-full max-w-md mx-auto"}>
           <Card>
               <CardHeader>
                   <Label>Profile</Label>
               </CardHeader>
           </Card>
        </div>
    )
}
