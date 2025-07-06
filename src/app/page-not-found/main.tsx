import {Label} from "@/components/ui/label.tsx";

export default function PageNotFoundScreen() {
    return (
        <div className="h-11/12 flex flex-col justify-center items-center text-start ">
            <div className="flex flex-col items-start justify-start gap-2">
                <Label className="text-md text-gray-800 text-3xl">
                    404
                </Label>
                <Label className="text-md text-gray-800">
                    Page Not Found
                </Label>
            </div>
        </div>
    )
}