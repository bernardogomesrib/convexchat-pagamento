import { useEffect, useState } from "react";
import { Usuario } from "./types";
import DisplayUsuario from "./displayUsuario";
import CompraDialog from "./CompraDialog";
/* import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api"; */
const UsuariosBox = ({ usuarios, isSidebarOpen, eu }: { usuarios: Usuario[] | undefined, isSidebarOpen: boolean, eu: Usuario | null }) => {
    const [usuariosAtualizados, setUsuariosAtualizados] = useState<Usuario[] | undefined>(usuarios);
    /* const registrarCompra = useMutation(api.comprar.registrarCompra); */
    const [open, setOpen] = useState(false);
    useEffect(() => {
        const interval = setInterval(() => {
            if (usuarios) {
                setUsuariosAtualizados([...usuarios]);
            }
        }, 300);

        return () => clearInterval(interval);
    }, [usuarios]);

    const handleComprarSaldo = async () => {
        console.log("Comprar saldo clicked");
        /* const conta = await registrarCompra({ valor: 100, tipo: 'PIX', card: undefined, secret: undefined }) */
       /*  console.log("Compra registrada:", conta); */
       setOpen(true);
    }

    return (
        <div className={`usuarios ${isSidebarOpen ? 'active' : ''}`}>
            {eu && <div>Saldo de mensagens: {eu.saldo?eu.saldo:0}</div>}
            <button className="px-4 py-2 rounded-lg transition-colors bg-blue-500 text-white"
                onClick={() => { void handleComprarSaldo(); }}>Comprar saldo</button>
            <div className="usuarios-header">
                <svg className="usuarios-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                <h2 className="usuarios-title">Usuários:</h2>
            </div>

            {usuariosAtualizados && usuariosAtualizados.map((usuario: Usuario) => (
                <DisplayUsuario key={usuario.userId} usuario={usuario} />
            ))}
            <CompraDialog open={open} setOpen={setOpen}/>
        </div>
    );
};

export default UsuariosBox;