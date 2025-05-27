import { useEffect, useRef } from "react";
import { Mensagem, Usuario } from "./types"

import MensagemInd from "./MensagemIndividual";
const MessageBox = ({ mensagens, eu,usuarios }:{mensagens:Mensagem[]|undefined, eu:Usuario|null,usuarios:Usuario[]}) => {
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [mensagens]);
    
    return (
        <div className='mensagens' id='mensagens'>
            <div className="mensagens-container">
                {mensagens && mensagens.map((mensagem: Mensagem) => (
                    <MensagemInd
                        key={mensagem.timestamp}
                        mensagem={mensagem}
                        eu={eu}
                        usuarios={usuarios}
                        />
                ))}
                <div ref={messagesEndRef}></div>
            </div>
            <div className="caixaVaziaPraNaoFicarAMensagemLaEmBaixo">{" "}</div>
        </div>
    )
}

export default MessageBox