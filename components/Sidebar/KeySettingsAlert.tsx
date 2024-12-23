import {KeyConfiguration} from "@/types";
import {FC, useState} from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface Props {
    onCancellation: () => void;
    onContinue: () => void;
}

export const KeySettingsAlertDialog: FC<Props> = ({
    onCancellation,
    onContinue,
}) => {
    return (
        <>
            <AlertDialog open={true}>
                <AlertDialogContent >
                    <AlertDialogHeader>
                        <AlertDialogTitle>You need to configure the OpenAI key for use.</AlertDialogTitle>
                        <AlertDialogDescription>
                            For this project to work we need your own key. We will not store your key, or you can set up the ChatWithFiles service by yourself. Note: your ky will be stored in the browser local storage and not on our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={onCancellation}>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={onContinue}>Setup</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}