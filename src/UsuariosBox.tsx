import { useEffect, useState } from "react";
import { Compra, Usuario } from "./types";
import DisplayUsuario from "./displayUsuario";
import CompraDialog from "./CompraDialog";
import DisplayCompra from "./displayCompra";
const UsuariosBox = ({ usuarios, isSidebarOpen, eu, compras }: { usuarios: Usuario[] | undefined, isSidebarOpen: boolean, eu: Usuario | null, compras:Compra[]|undefined }) => {
    const [usuariosAtualizados, setUsuariosAtualizados] = useState<Usuario[] | undefined>(usuarios);
    const [aba, setAba] = useState<"usuarios" | "compras">("usuarios");
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
        setOpen(true);
    }

    return (
        <div className={`usuarios ${isSidebarOpen ? 'active' : ''}`}>
            {eu && <div>Saldo de mensagens: {eu.saldo ? eu.saldo : 0}</div>}
            <button className="px-4 py-2 rounded-lg transition-colors bg-blue-500 text-white"
            onClick={() => { void handleComprarSaldo(); }}>Comprar saldo</button>
            
            <div className="usuarios-header gap-2 flex row justify-center ">
            <div onClick={() => { setAba("usuarios") }} className={"flex row items-center border border-gray-300 rounded-2xl px-2" + (aba === "usuarios" ? " bg-gray-200" : "")}>
                <svg className="usuarios-icon" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                <h2 className="usuarios-title">Usuários</h2>
            </div>
            <div onClick={() => { setAba("compras") }} className={"flex row items-center border border-gray-300 rounded-2xl px-2" + (aba === "compras" ? " bg-gray-200" : "")}>
                <svg className="usuarios-icon" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 11V7a4 4 0 0 0-8 0v4"></path><path d="M12 17v-5"></path><path d="M21 21H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h18a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2z"></path></svg>
                <h2 className="usuarios-title">Compras</h2>
            </div>
            </div>

            {aba === "usuarios" ? (
            usuariosAtualizados && usuariosAtualizados.map((usuario: Usuario) => (
                <DisplayUsuario key={usuario.userId} usuario={usuario} />
            ))
            ) : (
            compras && compras.length > 0 ? (
                compras.map((compra) => (
                <DisplayCompra key={compra._id} compra={compra} />
                ))
            ) : (
                <div className="flex justify-center">Você ainda não fez compras 😞</div>
            )
            )}
            
            <CompraDialog open={open} setOpen={setOpen}/>
        </div>
    );
};

export default UsuariosBox;