import React from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import ListarChamados from './components/Pages/Chamado/ListarChamados';
import ListarChamadosResolvidos from './components/Pages/Chamado/ListarChamadosResolvidos';
import ListarChamadosNaoResolvidos from './components/Pages/Chamado/ListarChamadosNaoResolvidos';
import CadastrarChamado from './components/Pages/Chamado/CadastrarChamado';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* Menu de navegação */}
        <nav style={{ padding: '20px', backgroundColor: '#f0f0f0', borderBottom: '1px solid #ccc' }}>
          <ul style={{ 
            listStyle: 'none', 
            display: 'flex', 
            gap: '20px', 
            margin: 0, 
            padding: 0 
          }}>
            <li>
              <Link to="/" style={{ 
                textDecoration: 'none', 
                color: 'blue',
                fontWeight: 'bold'
              }}>
                Listar Chamados
              </Link>
            </li>
            <li>
              <Link to="/resolvidos" style={{ 
                textDecoration: 'none', 
                color: 'blue',
                fontWeight: 'bold'
              }}>
                Chamados resolvidos
              </Link>
            </li>
            <li>
              <Link to="/pendentes" style={{ 
                textDecoration: 'none', 
                color: 'blue',
                fontWeight: 'bold'
              }}>
                Chamados pendentes
              </Link>
            </li>
            <li>
              <Link to="/cadastrar" style={{ 
                textDecoration: 'none', 
                color: 'green',
                fontWeight: 'bold'
              }}>
                Cadastrar Chamado
              </Link>
            </li>
          </ul>
        </nav>

        {/* Área de conteúdo */}
        <div style={{ padding: '20px' }}>
          <Routes>
            <Route path="/" element={<ListarChamados />} />
            <Route path="/resolvidos" element={<ListarChamadosResolvidos />} />
            <Route path="/pendentes" element={<ListarChamadosNaoResolvidos />} />
            <Route path="/cadastrar" element={<CadastrarChamado />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;