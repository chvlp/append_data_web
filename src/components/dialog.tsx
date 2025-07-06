import {
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Dialog } from "@radix-ui/react-dialog";
import * as React from "react";
import {Loader2Icon} from "lucide-react";

interface DialogComponentProps {
    title: string;
    des:string;
    onClick: () => void;
    isOpen: boolean;
    onClose: () => void;
    isLoading: boolean;
    children: React.ReactNode;
}

export const DialogComponent: React.FC<DialogComponentProps> = ({
                                                                    title,
                                                                    des,
                                                                    onClick,
                                                                    isOpen,
                                                                    onClose,
                                                                    isLoading,
                                                                    children
                                                                }) => {
    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader className={"mb-6"}>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>
                        {des}
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-5">
                    {children}
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline"
                                className={"cursor-pointer"}
                                onClick={onClose}>Cancel</Button>
                    </DialogClose>
                    {isLoading?(
                        <Button size="sm" disabled>
                            <Loader2Icon className="animate-spin" />
                            Please wait
                        </Button>
                    ):(
                        <Button type="button"
                                className={"cursor-pointer"}
                                onClick={onClick}>Save</Button>
                    )}

                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
