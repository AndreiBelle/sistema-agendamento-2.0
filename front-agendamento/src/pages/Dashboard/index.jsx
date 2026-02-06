import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import api from "../../services/api";
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import imagem from '../../assets/Framento.png';
import { jwtDecode } from "jwt-decode";
import socket from '../../services/socket';


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

const Logo = styled.img`
  height: 61px;
  width: 300px;
  object-fit: contain;
`;

const NameWelcome = styled.h2`
  color: #000000;
  text-align: center;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;

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
  background: transparent;
  border: 1px solid #2538e2;
  color: #0400ffd3;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.2s;
  display: flex;
  text-align: left;


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
  gap: 45px;
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
  padding: 20px 10px;
  border-bottom: 5px solid #ffffff;
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
  span { font-size: 15px; color: #000000d5; }

  button {
    background: #1bca03c4;
    color: #000000;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 12px;
    
    &:hover { background: #1eff00; color: white; }
  }
`;



function Dashboard() {
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  let emailUsuario = "";

  if (token) {
    try{
    const dadosToken = jwtDecode(token);

    emailUsuario = dadosToken.email;
    } catch (err) {
      toast.error("Erro ao ler token! " + err)
    }
  }
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

     socket.on('atualizaAgendamento', () => {
            console.log("O servidor avisou que tem coisa nova...");
            carregarDados();
        })
        return () => socket.off('atualizaAgendamento');
    
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

    if (emailUsuario == "recepcao@transframento.com.br" || emailUsuario == "teste@teste.com") {
      navigate('/cadastro');
    } else {
      toast.error('Você não tem permissão para cadastrar novos usuários!')

    }
  }

  return (
    
    <Container>
      <Navbar>
        <NameWelcome>Olá {nomeUsuario}! </NameWelcome>
        <a href='https://framento.com.br/'>
        <Logo src={imagem} alt='Logo Sistema'></Logo>
        </a>
        <ButtonGroup>
        <CadastroButton onClick={handleCadastro}>Cadastrar usuario</CadastroButton>
        <LogoutButton onClick={handleLogout}>Sair</LogoutButton>
        </ButtonGroup>

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
                    <div style={{padding: 30, textAlign: 'center', color: '#000000'}}>
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
                onClick={() => navigate(`/editar/${item.id}`)}
                title="Editar Reserva"

            >
                Editar Reserva
            </button>    
            <button 
                onClick={() => handleDelete(item.id)}
                style={{
                    backgroundColor: '#fff0f0',
                    color: '#d80101',
                    border: 'none',
                    padding: '10px 14px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                }}>
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