import { PayPalButtons } from "@paypal/react-paypal-js";
import { useEffect, useRef, useState } from "react";
import { api } from "../convex/_generated/api";
import { useMutation } from "convex/react";



const CompraDialog = ({ open, setOpen }: { open: boolean, setOpen: (op: boolean) => void }) => {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const criarCompra = useMutation(api.comprar.registrarCompra)
    const [valor, setValor] = useState(10);

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
            <label>Valor em reais:</label>
            <input value={valor} style={{width:"100%", padding:"8px"}}type="number" onChange={(e)=>setValor(Number(e.target.value    ))} />
            <PayPalButtons
            createOrder={async (_data, actions) => {
                // Cria a ordem no PayPal para R$10,00
                console.log("Criando ordem de compra");
                return actions.order.create({
                                intent: "CAPTURE",
                                purchase_units: [
                                    {
                                    amount: {
                                        value: valor.toFixed(2).toString(),
                                        currency_code: "BRL",
                                    },
                                    description: "Compra de créditos",
                                    },
                                ],
                                });
            }}
            onApprove={async (data, actions) => {
                // Captura o pagamento no PayPal
                console.log("Aprovando compra", data);
                if (actions.order) {
                await actions.order.capture();
                }
                // Registra a compra no backend
                const orderId = data.orderID;
                if (orderId) {
                await criarCompra({ valor: valor*100, orderId });
                setOpen(false);
                alert("Compra realizada com sucesso!, só esperando confirmação do PayPal.");
                }
            }}
            />
        </dialog>
    );
};

export default CompraDialog;