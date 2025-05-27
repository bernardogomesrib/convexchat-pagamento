import { useEffect, useRef } from "react";

import { CardPayment } from "@mercadopago/sdk-react";

const CompraDialog = ({ open, setOpen }: { open: boolean, setOpen: (op: boolean) => void }) => {
    const dialogRef = useRef<HTMLDialogElement>(null);



    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;
        if (open) {
            if (!dialog.open) dialog.showModal();
        } else {
            if (dialog.open) dialog.close();
        }
    }, [open]);

    // Fecha ao clicar fora do dialog
    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;
        const handleClose = () => setOpen(false);
        dialog.addEventListener("close", handleClose);
        return () => dialog.removeEventListener("close", handleClose);
    }, [setOpen]);




    return (
        <dialog
            ref={dialogRef}
            style={{
                padding: '20px',
                backgroundColor: '#fff',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                minWidth: 320,
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                margin: 0,
                border: 'none',
                zIndex: 9999,
            }}
        >
            <h2>Compra Créditos</h2>
            <p>Você pode comprar saldo aqui.</p>
            <CardPayment
                initialization={{ amount: 100 }}
                onSubmit={async (param) => {
                    console.log("CARD_TOKEN:", param.token);
                }}
            />

        </dialog>
    );
};

export default CompraDialog;