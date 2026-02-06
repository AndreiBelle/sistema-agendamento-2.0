import api from '../../services/api'
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; // useParams pega o ID da URL
import { toast } from 'react-toastify'
import styled from 'styled-components';
import ImagemFundo from '../../assets/FRAMENTO.png'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

const FormCard = styled.div`
    background: white;
    padding: 5rem;
    border-radius: 25px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
    

    h2 {
    text-align: center;
    left: 1020px;
    margin-bottom: 1.5rem;
    color: #121111
    }

    background-image: url(${ImagemFundo});
    background-size: 400px;
    background-position: 0px -60px;
    background-repeat: no-repeat;
`;

const LogoutButton = styled.button`
  background: transparent;
  border: 1px solid #dc3545;
  color: #dc3545;
  padding: 0.8rem 106px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.2s; 


  &:hover {
    background-color: #dc3545;
    color: white;
  }
`;

const InputGroup = styled.div`
    margin-bottom: 1rem

    label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: bold;
        color: #555;
    }

    input {
        width: 100%;
        padding: 0.8rem;
        border: 1px solid #ddd;
        border-radius: 5px;
        box-sizing: border-box;

    &:focus {
            border-color: #007bff;
            outline: none;
        }
    }
`;

const Button = styled.button`
    width: 100%;
    padding: 0.8rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    font-weight: bold
    cursor: pointer;
    transition: 0.3s;

    &:hover {
        background-color: #0056b3;
    }

    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }
`;

function Cadastro() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const navigate = useNavigate();

    async function EnviarDados(event) {
        event.preventDefault();
        try{
            const response = await api.post('/cadastro', {
                nome: nome,
                email: email,
                senha: senha
            });

            toast.success("Usuário Cadastrado")
            navigate('/dashboard')
        }catch (err) {  
            if(err.response){
                if (err.response.status == 409) {
                    console.log("Erro ao Cadastrar: " + err);
                    toast.error('Erro ao Cadastrar, Usuário já existe!');
                } else if (err.response == 500) {
                    console.log("Erro ao Cadastrar: SERVIDOR! " + err);
                    toast.error('Erro ao Cadastrar, erro interno no servidor, tente mais tarde!');
                } else {
                    console.log("Erro ao Cadastrar: problema inesperado " + err);
                    toast.error('Erro ao Cadastrar, problema inesperado!');
                }
            }
   
        }

    }

    const Logout = () => {
        navigate('/dashboard')
    }

    return (
            <Container>
                <FormCard>
                    <form onSubmit={EnviarDados}>
                        <h2></h2>
                        
                        <InputGroup>
                            <label>Nome</label>
                            <input value={nome} onChange={(e) => setNome(e.target.value)} required />
                        </InputGroup>

                        <InputGroup>
                            <label>Email</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </InputGroup>

                        <InputGroup>
                            <label>Senha</label>
                            <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required />
                        </InputGroup>
                        <br></br> 
                        <Button type="submit">Enviar</Button>
                    </form>
                    <br></br>
                    <LogoutButton onClick={Logout}>Sair</LogoutButton>
                </FormCard>
                
            </Container>
        );


}
export default Cadastro;

