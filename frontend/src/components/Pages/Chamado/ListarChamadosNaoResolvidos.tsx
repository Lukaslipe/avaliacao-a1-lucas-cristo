import { useEffect, useState } from "react";
import Chamado from "../../../models/Chamado";
import axios from "axios";
import { Link } from "react-router-dom";

function ListarChamadosNaoResolvidos() {
    const [chamados, setProdutos] = useState<Chamado[]>([]);

    useEffect(() => {
        buscarChamadosAPI();
    }, []);

    async function buscarChamadosAPI() {
        try {
            const resposta = await axios.get<Chamado[]>("http://localhost:5000/api/chamado/naoresolvidos");
            console.log(resposta)
            setProdutos(resposta.data);
        } catch (error) {
            console.log("Erro ao buscar chamados:", error);
            alert("Erro ao carregar chamados!");
        }
    }

    async function editarChamado(id: string) {
        try {
            await axios.put(`http://localhost:5000/api/chamado/alterar/${id}`);
            buscarChamadosAPI();
            alert("Status do chamado alterado com sucesso!");
        } catch (error) {
            console.log("Erro ao alterar status do chamado chamado:", error);
            alert("Erro ao alterar status do chamado!");
        }
    }

    return (
        <div>
            <h1>Lista de chamados não resolvidos</h1>
            
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
                        <th style={{ padding: '10px' }}>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {chamados.map((chamado) => (
                        <tr key={chamado.chamadoId}>
                            <td style={{ padding: '10px' }}>{chamado.descricao}</td>
                            <td style={{ padding: '10px' }}>{chamado.criadoEm}</td>
                            <td style={{ padding: '10px' }}>{chamado.status}</td>
                            <td style={{ padding: '10px' }}>
                                <button 
                                    onClick={() => editarChamado(chamado.chamadoId!)}
                                    style={{ 
                                        padding: '10px 20px', 
                                        marginLeft: '10px',
                                        backgroundColor: '#35982cff',
                                        color: 'white',
                                        border: 'none',
                                        cursor: 'pointer',
                                        borderRadius: '6px'
                                    }}
                                >
                                    Alterar Status
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {chamados.length === 0 && (
                <p style={{ marginTop: '20px', color: '#666' }}>
                    Nenhum chamado pendente encontrado.
                </p>
            )}
        </div>
    );
}

export default ListarChamadosNaoResolvidos;