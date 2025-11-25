import { useEffect, useState } from "react";
import Chamado from "../../../models/Chamado";
import axios from "axios";
import "./chamado.css";
import { Link } from "react-router-dom";

function ListarChamados() {
    const [chamados, setChamados] = useState<Chamado[]>([]);

    useEffect(() => {
        buscarChamadosAPI();
    }, []);

    async function buscarChamadosAPI() {
        try {
            const resposta = await axios.get<Chamado[]>("http://localhost:5000/api/chamado/listar");
            setChamados(resposta.data);
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
        <div className="chamados-container">
            <h1>Lista de chamados</h1>
            
            <table className="chamados-table">
                <thead>
                    <tr>
                        <th>Descrição</th>
                        <th>Criado Em</th>
                        <th>Status</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {chamados.map((chamado) => (
                        <tr key={chamado.chamadoId}>
                            <td>{chamado.descricao}</td>
                            <td>{chamado.criadoEm}</td>
                            <td>{chamado.status}</td>
                            <td className="actions-cell">
                                <button 
                                    className="action-btn edit-btn"
                                    onClick={() => editarChamado(chamado.chamadoId!)}
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
                    Nenhum chamado cadastrado.
                </p>
            )}
        </div>
    );
}

export default ListarChamados;