/* eslint-disable @typescript-eslint/no-misused-promises */
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { useEffect, useState } from "react";

const CaixaDigitacao = () => {
    const sendMessage = useMutation(api.chat.sendMessages);
    const [digitandoRef, setDigitandoRef] = useState(false);
    const [newMessageText, setNewMessageText] = useState("");
    const atualizaUsuario = useMutation(api.usuarios.atualizarStatus);
    
    useEffect(() => {
        void atualizaUsuario({ digitando: digitandoRef });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    return (
        <form className='form' onSubmit={async (e) => {
            e.preventDefault();
            if (newMessageText.trim() === "") return;
            
                const error = await sendMessage({ text: newMessageText });
                if(error){
                    alert("Erro ao enviar mensagem: " + error.error);
                }
            
            setNewMessageText("");
            setDigitandoRef(false);
            void atualizaUsuario({ digitando: false });
        }}>
            <div className="textbox">
                <input 
                    type="text" 
                    value={newMessageText} 
                    onChange={(text) => {
                        const isTyping = text.target.value.length > 0;
                        setNewMessageText(text.target.value);
                        if (digitandoRef !== isTyping) {
                            void atualizaUsuario({  digitando: isTyping });
                            setDigitandoRef(isTyping);
                        }
                    }} 
                    placeholder="Digite sua mensagem..."
                    name="text" 
                />
            </div>
            <button 
                type="submit"
                disabled={!newMessageText.trim()}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            </button>
        </form>
    )
}

export default CaixaDigitacao