import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; // useParams pega o ID da URL
import styled from "styled-components";
import api from "../../services/api";
import { toast } from 'react-toastify';

const Container = styled.div` 
min-height: 100vh; 
background-color: #f5f7fa; 
display: flex; 
justify-content: center; 
align-items: center; `;

const FormCard = styled.form` 
background: white; 
padding: 40px; 
border-radius: 8px; 
width: 100%; 
max-width: 500px; 
display: flex; 
flex-direction: column; 
gap: 15px; `;

const Input = styled.input` 
padding: 12px; 
border: 1px solid #ddd; 
border-radius: 4px; `;

const Select = styled.select` 
padding: 12px; 
border: 1px solid #ddd; 
border-radius: 4px; 
background: white;`;

const Button = styled.button` 
padding: 15px; 
background-color: #ffa502; 
color: white; border: none; 
border-radius: 4px; 
font-weight: bold; 
cursor: pointer; `;

const BackButton = styled.button` 
background: transparent; 
border: 1px solid #ccc; 
padding: 10px; 
cursor: pointer; `;

function EditarReserva() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [titulo, setTitulo] = useState('');
    const [salaId, setSalaId] = useState('');
    const [dataInicio, setDataInicio] = useState('');
    const [dataFim, setDataFim] = useState('');
    const [listaSalas, setListaSalas] = useState([]);

    useEffect(() => {
        async function CarregarDados() {
            try{
                const resSalas = await api.get('/salas');
                setListaSalas(resSalas.data);

                const resAgendamento = await api.get(`/agendamentos/${id}`);
                const dados = resAgendamento

                setTitulo(dados.titulo);
                setSalaId(dados.salaId);
                setDataInicio(dados.dataInicio.slice(0, 16));
                setDataFim(dados.dataFim.slice(0, 16));;
            }  catch (err) {
                toast.error("Erro ao carregar dados da reserva")
                navigate('/dashboard');
            }         
        }
        CarregarDados();
    }, [id, navigate])

    async function handleUpdate(evento) {
        evento.preventDefault();
        try {
            await api.put(`/agendamentos/${id}`, {
                sala_id: salaid,
                titulo: titulo,
                data_inicio: dataInicio,
                data_fim: dataFim
            })

            toast.success('✏️ Reserva atualizada!');
            navigate('/dashboard');
        }  catch (err) {
            console.error(err);
            toast.error('Erro ao atualizar.')
        }
    }

    return (
        <Container>
            <FormCard onSubmit={handleUpdate}>
                <h2 style={{textAlign: 'center'}}>Editar Reserva</h2>

                <label>Título</label>
                <Input type="text" value={titulo} onChange={e => setTitulo(e.target.value)} required />

                <label>Sala</label>
                <Select value={salaId} onChange={e => setSalaId(e.target.value)}>
                    {listaSalas.map(sala => (
                        <option key={sala.id} value={sala.id}>{sala.nome}</option>
                    ))}
                </Select>

                <label>Início</label>
                <Input type="datetime-local" value={dataInicio} onChange={e => setDataInicio(e.target.value)} required />

                <label>Fim</label>
                <Input type="datetime-local" value={dataFim} onChange={e => setDataFim(e.target.value)} required />

                <Button type="submit">Salvar Alterações</Button>
                <BackButton type="button" onClick={() => navigate('/dashboard')}>Cancelar</BackButton>
            </FormCard>
        </Container>
    );
}

export default EditarReserva;

