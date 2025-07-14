import { Compra } from "./types"

const DisplayCompra = ({ compra }: { compra: Compra }) => {



    return (<div className="usuario" key={compra._id}>
        <div className="usuario-info">
            <span className="usuario-nome">Valor:{compra.valor}</span>
        </div>


        <div className="ultima-atividade">
            <>Status:{compra.status}</><br/>
            <div className="ultima-atividade">
                {(() => {
                    const ultimaData = new Date(compra.dataCompra);
                    const agora = new Date();
                    const isHoje =
                        ultimaData.getDate() === agora.getDate() &&
                        ultimaData.getMonth() === agora.getMonth() &&
                        ultimaData.getFullYear() === agora.getFullYear();

                    if (isHoje) {
                        return <>Data da Compra: {ultimaData.toLocaleTimeString()}</>;
                    } else {
                        const dia = ultimaData.getDate().toString().padStart(2, "0");
                        const mes = (ultimaData.getMonth() + 1).toString().padStart(2, "0");
                        const ano = ultimaData.getFullYear();
                        const mostrarAno = ano !== agora.getFullYear();
                        return (
                            <>
                                Data da Compra: {dia}/{mes}
                                {mostrarAno && <>/{ano}</>} às {ultimaData.toLocaleTimeString()}
                            </>
                        );
                    }
                })()}
            </div>
        </div>
    </div>)
}
export default DisplayCompra;