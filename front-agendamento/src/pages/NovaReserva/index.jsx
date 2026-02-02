import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import api from "../../services/api";
import { toast } from 'react-toastify'

const Container = styled.div`
  min-height: 100vh;
  background-color: #f5f7fa;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormCard = styled.form`
  background: white;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 15px;

  h2 {
    color: #333;
    text-align: center;
    margin-bottom: 20px;
  }
`;

const Label = styled.label`
  font-weight: bold;
  color: #555;
  font-size: 14px;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  
  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const Select = styled.select`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  background-color: white;
`;

const Button = styled.button`
  margin-top: 10px;
  padding: 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background-color: #0056b3;
  }
`;

const BackButton = styled.button`
  background: transparent;
  border: 1px solid #ccc;
  color: #666;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

function NovaReserva() {
    const navigate = useNavigate();

    const [titulo, setTitulo] = useState('');
    const [salaId, setSalaId] = useState(''); 
    const [dataInicio, setDataInicio] = useState('');
    const [dataFim, setDataFim] = useState('');

    const [listaSalas, setListaSalas] = useState([]);

    useEffect(() => {
        async function carregarSalas() {
            try {
                const response = await api.get('/salas');
                setListaSalas(response.data);

                if(response.data.length > 0) {
                    setSalaId(response.data[0].id);
                }
            } catch (err) {
                alert('Erro ao carregar salas');
            }
        }
        carregarSalas();
    }, []);

    async function handleSubmit(event) {
        event.preventDefault();

        const usuarioId = localStorage.getItem('usuario_id');

        if(!usuarioId) {
            toast.success('Erro: usuario não identificado. Faça login novamente.');
            navigate('/');
            return;
        }

        try {
            await api.post('/agendamentos', {
                sala_id: salaId,
                usuario_id: usuarioId,
                titulo: titulo,
                data_inicio: dataInicio,
                data_fim: dataFim
            });
    
            alert('Reserva criada com sucesso!');
            navigate('/dashboard');
        } catch (err) {
            console.error(err);
            if(err.response && err.response.data) {
                toast.error(err.response.data.mensagem);
            } else {
                toast.error('Erro ao criar reserva.');
            }
        }
    } 

    return (
        <Container>
            <FormCard onSubmit={handleSubmit}>
                <h2>Nova Reserva</h2>

                <Label>Título da Reunião</Label>
                <Input 
                    type="text"
                    placeholder="Ex: Reunião de Planejamento"
                    value={titulo}
                    onChange={e => setTitulo(e.target.value)}
                    required
                />

                <Label>Escolha a sala</Label>
                <Select 
                    value={salaId}
                    onChange={e => setSalaId(e.target.value)}
                >
                    {listaSalas.map(sala => (
                        <option key={sala.id} value={sala.id}>
                            {sala.nome}
                        </option>
                    ))}
                </Select>

                <Label>Início</Label>
                <Input 
                    type="datetime-local" 
                    value={dataInicio}
                    onChange={e => setDataInicio(e.target.value)}
                    required
                />

                <Label>Fim</Label>
                <Input 
                    type="datetime-local" 
                    value={dataFim} 
                    onChange={e => setDataFim(e.target.value)}
                    required
                />

                <Button type="submit">Agendar Sala</Button>
                <BackButton type="button" onClick={() => navigate('/dashboard')}>
                    Cancelar e Voltar
                </BackButton>
            </FormCard>
        </Container>
    );
}

export default NovaReserva;