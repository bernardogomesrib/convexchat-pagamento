import { useEffect, useState } from "react";
import { Usuario } from "./types"

const DisplayUsuario = ({usuario}:{usuario:Usuario}) => {
    const [isOnline,setIsOnline] = useState<boolean>(false);
    function defineStatus() {
        const agora = Date.now();
        const ultimaAtividade = new Date(usuario.ultimaAtividade).getTime();
        const status = ultimaAtividade > agora - 60 * 1000;
        //console.log(`usuario digitando: ${usuario.digitando} está online? ${isOnline}`);
        setIsOnline(status);
    }
    useEffect(() => {
        defineStatus();
        const interval = setInterval(defineStatus, 1000);
        return () => clearInterval(interval);
    }, [usuario]);

    return(<div className="usuario" key={usuario.userId}>
        <div className="usuario-info">
            {usuario.imagem && <img className="usuario-imagem" src={usuario.imagem} alt="imagem do usuario" />}
            <span className="usuario-nome">{usuario.name}</span>
            <span className={`status-ativo ${isOnline ? 'online' : 'offline'}`}></span>
        </div>

        {isOnline && usuario.digitando ? (
            <div className="digitando">
                <span>Digitando</span>
                <div className="digitando-animacao">
                    <span className="digitando-ponto"></span>
                    <span className="digitando-ponto"></span>
                    <span className="digitando-ponto"></span>
                </div>
            </div>
        ) : !isOnline ? (
            <div className="ultima-atividade">
                {(() => {
                    const ultimaData = new Date(usuario.ultimaAtividade);
                    const agora = new Date();
                    const isHoje =
                        ultimaData.getDate() === agora.getDate() &&
                        ultimaData.getMonth() === agora.getMonth() &&
                        ultimaData.getFullYear() === agora.getFullYear();

                    if (isHoje) {
                        return <>Visto por último: {ultimaData.toLocaleTimeString()}</>;
                    } else {
                        const dia = ultimaData.getDate().toString().padStart(2, "0");
                        const mes = (ultimaData.getMonth() + 1).toString().padStart(2, "0");
                        const ano = ultimaData.getFullYear();
                        const mostrarAno = ano !== agora.getFullYear();
                        return (
                            <>
                                Visto por último: {dia}/{mes}
                                {mostrarAno && <>/{ano}</>} às {ultimaData.toLocaleTimeString()}
                            </>
                        );
                    }
                })()}
            </div>
        ) : (
            <div className="p-3">{" "}</div>
        )}
    </div>)
}
export default DisplayUsuario;