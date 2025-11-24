import { useState } from "react";
import Chamado from "../../../models/Chamado";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CadastrarChamado() {
    const [descricao, setDescricao] = useState("");
    
    const navigate = useNavigate();

    async function enviarChamadoAPI(e: React.FormEvent) {
        e.preventDefault();
        
        if (!descricao.trim()) {
            alert("Por favor, preencha a descricao do chamado!");
            return;
        }

        try {
            const chamado: Chamado = {
                descricao: descricao.trim(),
                status : "Aberto"
            };

            await axios.post("http://localhost:5000/api/chamado/cadastrar", chamado);
            
            alert("Chamado cadastrado com sucesso!");
            navigate("/"); // Voltar para lista
        } catch (error: any) {
            console.log("Erro ao cadastrar chamado:", error);
        }
    }

    return (
        <div className="form-container">
            <h1>Cadastrar novo chamado</h1>
            
            <form onSubmit={enviarChamadoAPI} style={{ maxWidth: '500px' }}>
                
                <div className="form-group">
                    <label>
                        Descrição:
                    </label>
                    <input 
                        type="text" 
                        value={descricao} 
                        onChange={(e) => setDescricao(e.target.value)}
                    />
                </div>
                <div className="form-actions">
                    <button 
                        type="submit" 
                        className="submit-btn"
                    >
                        Cadastrar chamado
                    </button>
                    
                    <button 
                        type="button" 
                        className="cancel-btn"
                        onClick={() => navigate("/")}
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CadastrarChamado;