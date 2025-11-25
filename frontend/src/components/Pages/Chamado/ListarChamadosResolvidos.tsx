import { useEffect, useState } from "react";
import Chamado from "../../../models/Chamado";
import axios from "axios";
import { Link } from "react-router-dom";

function ListarChamadosResolvidos() {
    const [chamados, setChamados] = useState<Chamado[]>([]);

    useEffect(() => {
        buscarChamadosAPI();
    }, []);

    async function buscarChamadosAPI() {
        try {
            const resposta = await axios.get<Chamado[]>("http://localhost:5000/api/chamado/resolvidos");
            setChamados(resposta.data);
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
        <div className="chamados-container">
            <h1>Lista de chamados resolvidos</h1>
            
            <table className="chamados-table">
                <thead>
                    <tr>
                        <th>Descrição</th>
                        <th>Criado Em</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {chamados.map((chamado) => (
                        <tr key={chamado.chamadoId}>
                            <td>{chamado.descricao}</td>
                            <td>{chamado.criadoEm}</td>
                            <td>{chamado.status}</td>
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