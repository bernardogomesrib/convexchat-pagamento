import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import MessageBox from './messageBox';
import UsuariosBox from './UsuariosBox';
import CaixaDigitacao from './CaixaDigitacao';
import { Usuario } from './types';
import { useEffect, useState } from "react";



function Chat({ eu, isSidebarOpen }: { eu: Usuario | null, isSidebarOpen: boolean }) {
    const usuarios = useQuery(api.usuarios.getUsuarios);
    const mensagens = useQuery(api.chat.getMessages);
    const compras = useQuery(api.comprar.getMinhasCompras);
    const [euMesmo, setEuMesmo] = useState<Usuario | null>(null);
    useEffect(() => {
        const euzinho = usuarios?.find(u => u.userId === eu?.userId);
        if (euzinho) {
            setEuMesmo(euzinho);
        } else {
            setEuMesmo(eu);
        }
    }, [usuarios,eu]);
    return eu && (
        <div className="main">
            <UsuariosBox eu={euMesmo} usuarios={usuarios} isSidebarOpen={isSidebarOpen} compras={compras} />
            <MessageBox mensagens={mensagens} eu={euMesmo} usuarios={usuarios || []} />
            <CaixaDigitacao />

        </div>
    )
}


export default Chat