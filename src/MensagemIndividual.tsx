import { Mensagem, Usuario } from "./types";
import { useEffect, useState } from "react";

export default function MensagemInd({ mensagem, eu,usuarios }:{mensagem:Mensagem, eu:Usuario|null, usuarios:Usuario[]}) {
    
    const [usuario,setUsuario] = useState<Usuario | undefined>(undefined);
    useEffect(() => {
        const fetchUsuario =  () => {
            setUsuario(usuarios.find((usuario) => usuario.userId === mensagem.userId));
        };
        fetchUsuario();
    }, [mensagem]);
    return eu&&(
        <div
            key={mensagem.timestamp}
            className={"div-mensagem" + (mensagem.userId === eu.userId ? " ajustaDireita" : " ajustaEsquerda")}
        >
            <div className={'sobre-mensagem ' + (mensagem.userId === eu.userId ? " ajustaDireita" : " ajustaEsquerda")}>
                <div className="mensagem-info">
                    <span className="mensagem-usuario">{usuario?.name}</span>
                    <span className="mensagem-hora">
                        {new Date(mensagem.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                </div>
                <div className={usuario?.userId === eu.userId ? "minha-mensagem" : "mensagem-dozoto"}>
                    <div>
                        {mensagem.text}
                    </div>
                </div>
            </div>
        </div>
    )
}