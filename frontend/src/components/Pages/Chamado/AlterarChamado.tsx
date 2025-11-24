import { useEffect, useState } from "react";
import Chamado from "../../../models/Chamado";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function AlterarChamado() {
    const { id } = useParams();
    const [Status, setStatus] = useState("");
    
    const navigate = useNavigate();

    // Buscar produto quando componente carregar
    useEffect(() => {
        if (id) {
            buscarChamado();
        }
    }, [id]);

    async function buscarChamado() {
        try {
            const resposta = await axios.get<Chamado>(
                `http://localhost:5000/api/chamado/buscar/${id}`
            );
            const chamado = resposta.data;
            setStatus(chamado.status);
        } catch (error) {
            console.log("Erro ao buscar chamado:", error);
            alert("Chamado não encontrado!");
            navigate("/");
        }
    }

    async function atualizarProdutoAPI(e: React.FormEvent) {
        e.preventDefault();
        
        try {
            await axios.put(
                `http://localhost:5000/api/produto/atualizar/${id}`
            );
            
            alert("Produto atualizado com sucesso!");
            navigate("/");
        } catch (error) {
            console.log("Erro ao atualizar produto:", error);
            alert("Erro ao atualizar produto!");
        }
    }

    return (
        <div>
            <h1>Alterar status do chamado</h1>
            
            <form onSubmit={atualizarProdutoAPI} style={{ maxWidth: '500px' }}>
                
                <button 
                    type="submit" 
                    style={{ 
                        padding: '10px 20px', 
                        marginRight: '10px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        cursor: 'pointer'
                    }}
                >
                    Alterar status do chamado
                </button>
                
                <button 
                    type="button" 
                    onClick={() => navigate("/")}
                    style={{ 
                        padding: '10px 20px',
                        backgroundColor: '#6c757d',
                        color: 'white',
                        border: 'none',
                        cursor: 'pointer'
                    }}
                >
                    Cancelar
                </button>
            </form>
        </div>
    );
}

export default AlterarChamado;