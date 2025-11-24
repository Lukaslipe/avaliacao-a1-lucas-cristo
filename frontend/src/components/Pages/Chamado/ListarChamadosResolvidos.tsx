import { useEffect, useState } from "react";
import Chamado from "../../../models/Chamado";
import axios from "axios";
import { Link } from "react-router-dom";

function ListarChamadosResolvidos() {
    const [chamados, setProdutos] = useState<Chamado[]>([]);

    useEffect(() => {
        buscarChamadosAPI();
    }, []);

    async function buscarChamadosAPI() {
        try {
            const resposta = await axios.get<Chamado[]>("http://localhost:5000/api/chamado/resolvidos");
            console.log(resposta)
            setProdutos(resposta.data);
        } catch (error) {
            console.log("Erro ao buscar chamados:", error);
            alert("Erro ao carregar chamados!");
        }
    }

    async function deletarChamado(id: string) {
        if (window.confirm("Tem certeza que deseja excluir este chamado?")) {
            try {
                await axios.delete(`http://localhost:5000/api/chamado/deletar/${id}`);
                buscarChamadosAPI();
                alert("Chamado excluído com sucesso!");
            } catch (error) {
                console.log("Erro ao excluir chamado:", error);
                alert("Erro ao excluir chamado!");
            }
        }
    }

    return (
        <div>
            <h1>Lista de chamados resolvidos</h1>
            
            <table border={1} style={{ 
                width: '100%', 
                borderCollapse: 'collapse',
                marginTop: '20px'
            }}>
                <thead>
                    <tr style={{ backgroundColor: '#f0f0f0' }}>
                        <th style={{ padding: '10px' }}>Descrição</th>
                        <th style={{ padding: '10px' }}>Criado Em</th>
                        <th style={{ padding: '10px' }}>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {chamados.map((chamado) => (
                        <tr key={chamado.chamadoId}>
                            <td style={{ padding: '10px' }}>{chamado.descricao}</td>
                            <td style={{ padding: '10px' }}>{chamado.criadoEm}</td>
                            <td style={{ padding: '10px' }}>{chamado.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {chamados.length === 0 && (
                <p style={{ marginTop: '20px', color: '#666' }}>
                    Nenhum chamado resolvido encontrado.
                </p>
            )}
        </div>
    );
}

export default ListarChamadosResolvidos;