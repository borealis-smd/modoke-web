import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import React from "react";

interface Props {
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  onClick: () => void;
}

function CloseAlertComponent({ open, onOpenChange, onClick }: Props) {
  return (
    <>
      <AlertDialog open={open} onOpenChange={onOpenChange}>
        <AlertDialogContent className="max-w-2xl h-[620px] flex flex-col items-center justify-center">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-black text-center">
              EII, FIQUE AQUI!
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center text-lg">
              Se você sair agora, perderá todo o progresso feito até aqui. Tem
              certeza que deseja sair?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="w-full sm:space-x-0 max-w-[480px]">
            <AlertDialogCancel>Continuar</AlertDialogCancel>
            <AlertDialogAction onClick={onClick}>Sair</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default CloseAlertComponent;
