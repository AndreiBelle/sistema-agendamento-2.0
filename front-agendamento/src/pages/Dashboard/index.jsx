import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import api from "../../services/api";
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const Container = styled.div`
  min-height: 100vh;
  background-color: #f5f7fa;
`;

const Navbar = styled.nav`
  background-color: #ffffff;
  padding: 0 30px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const Logo = styled.h2`
  color: #052c55;
  text-align: center;
`;

const LogoutButton = styled.button`
  background: transparent;
  border: 1px solid #dc3545;
  color: #dc3545;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.2s;

  &:hover {
    background-color: #dc3545;
    color: white;
  }
`;

const CadastroButton = styled.button`
  color: #0400ffd3;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.2s;
  display: flex;
  text-align: right;


   &:hover {
    background-color: #0400ffd3;
    color: white;
  }

`;

const Content = styled.div`
  max-width: 1000px;
  margin: 40px auto;
  padding: 20px;
`;

const Section = styled.div`
  margin-bottom: 40px;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const NewReserveButton = styled.button`
  background-color: #28a745;
  color: white;
  border: none;
  padding: 11px 21px;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #218838;
  }
`;

const RoomsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
`;

const RoomCard = styled.div`
  background: white;
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  border-left: 5px solid #007bff;
  
  h3 { margin-top: 0; color: #000000; }
  p { color: #292929; font-size: 14px; }
`;

const ScheduleList = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  overflow: hidden;
`;

const ScheduleItem = styled.div`
  padding: 17px 22px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:last-child { border-bottom: none; }
  
  div {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  strong { color: #000000; }
  span { font-size: 15px; color: #000000af; }

  button {
    background: #fff0f0;
    color: #dc3545;
    border: none;
    padding: 10px 15px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 12px;
    
    &:hover { background: #dc3545; color: white; }
  }
`;

const ImageBackgound = styled.body`
  background-image: url("C:\Users\Andrei TI\Desktop\sistema-agendamento\front-agendamento\FRAMENTO.png");
  background-size: cover; 
  background-repeat: no-repeat; 
  background-position: center;
  background-attachment: fixed;
`

function Dashboard() {
  const navigate = useNavigate();

  const nomeUsuario = localStorage.getItem('nomeUsuario' || "Visitante");
  const [salas, setSalas] = useState([]);
  const [agendamentos, setAgendamentos] = useState([]);

  async function carregarDados() {
    try {
        const respSalas = await api.get('/salas');
        setSalas(respSalas.data);

        const respAgenda = await api.get('/agendamentos');
        setAgendamentos(respAgenda.data);

    } catch (error) {
        console.error("Erro ao buscar dados", error);
    }
  }

  useEffect(() => {
    carregarDados();
  }, []);

  async function handleDelete(id) {
    const resultado = await Swal.fire ({
      title: 'Tem certeza?',
      text: "Você não poderá reverter esta ação!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Voltar'
    });

    if (resultado.isConfirmed) {
      try {
        await api.delete(`/agendamentos/${id}`);

        Swal.fire(
          'Deletado!',
          'A reselva foi cancelada.',
          'success'
        );

        carregarDados();
      } catch (err) {
        toast.error("Erro ao cancelar a reserva.");
      }
    }
  }

  function formatarData(dataForm) {
    return new Date(dataForm).toLocaleString('pt-BR');
  }

  function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario_id');
    api.defaults.headers['Authorization'] = undefined;
    navigate('/');
  }

  function handleCadastro() {

    if (nomeUsuario == "Recepção" || nomeUsuario == "Teste Admin") {
      navigate('/cadastro');
    } else {
      toast.error('Você não tem permissão para cadastrar novos usuários!')

    }
  }

  return (
    
    <Container>
      <Navbar>
        <Logo>Olá {nomeUsuario}! </Logo>
        <CadastroButton onClick={handleCadastro}>Cadastrar usuario</CadastroButton>
        <LogoutButton onClick={handleLogout}>Sair</LogoutButton>
        

      </Navbar>

      <Content>
        
        <Section>
            <SectionHeader>
                <h2>Nossas Salas</h2>
                <NewReserveButton onClick={() => navigate('/reservar')}>
                    + Nova Reserva
                </NewReserveButton>
            </SectionHeader>

            <RoomsGrid>
                {salas.map(sala => (
                    <RoomCard key={sala.id}>
                        <h3>{sala.nome}</h3>
                        <p>{sala.descricao}</p>
                    </RoomCard>
                ))}
            </RoomsGrid>
        </Section>

        <Section>
            <h2>Agenda de Reuniões</h2>
            <ScheduleList>
                {agendamentos.length === 0 && (
                    <div style={{padding: 28, textAlign: 'center', color: '#999'}}>
                        Nenhuma reunião agendada.
                    </div>
                )}


{agendamentos.map(item => (
    <ScheduleItem key={item.id}>
        <div>
            <strong>{item.titulo}</strong>
            <span>Sala: {item.nome_sala} | Resp: {item.nome_usuario}</span>
            <span>
                🕒 {formatarData(item.data_inicio)} até {formatarData(item.data_fim)}
            </span>
        </div>
        
        <div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
            
            <button 
                style={{
                    backgroundColor: '#ffc107', 
                    color: '#000', 
                    border: 'none', 
                    padding: '8px 12px', 
                    borderRadius: '4px', 
                    cursor: 'pointer',
                    fontSize: '16px'
                }}
                onClick={() => navigate(`/editar/${item.id}`)}
                title="Editar Reserva"
            >
                ✏️
            </button>

            <button 
                onClick={() => handleDelete(item.id)}
                style={{
                    backgroundColor: '#fff0f0',
                    color: '#dc3545',
                    border: 'none',
                    padding: '10px 14px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                }}
            >
                Cancelar
            </button>
        </div>
                    </ScheduleItem>
                ))}
            </ScheduleList>
        </Section>

      </Content>
    </Container>
  );
}

export default Dashboard;