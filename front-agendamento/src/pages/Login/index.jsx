import api from '../../services/api'
import { useState } from "react";
import styled from "styled-components";
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify'
import imagem from '../../assets/logoFramento.png';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f0f2f5;
`;

const Title = styled.h2`
color: #333;
margin-bottom: 20px:
text-align: center;
`;

const Form = styled.form`
    background-color: white;
    padding: 40px;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 400px;
    gap: 15px;

    background-image: url(${imagem});
    background-size: 45px;
    background-position: 10px 5px;
    background-repeat: no-repeat;
`;

const Input = styled.input`
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;

    &:focus {
    border-color: #007bff;
    outline: none;
    }
`;

const Button = styled.button`
    padding: 12px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    font-weight: bold;
    transition: background-color 0.2s;

    &:hover {
        background-color: #0056b3;
    }
`;

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    async function EnviarDados(event){
        event.preventDefault();
        try {
            const response = await api.post('/login', {
                email: email,
                password: password
            });

            const {token, usuario} = response.data;

            localStorage.setItem('token', token);
            localStorage.setItem('usuario_id', usuario.id)
            localStorage.setItem('nomeUsuario', response.data.usuario.nome);

            toast.success("Login realizado com sucesso!");

            api.defaults.headers.Authorization = `Bearer ${response.data.token}`;
            navigate('/dashboard')

        } catch (err){
            console.log("Erro ao logar: " + err)
            if (err.response) {
                toast.error(err.response.data.message || "Erro no servidor");
            } else {
                toast.error("Erro de conexão. Verifique se o Back-end está rodando.");
            }
        }
    }
        return (
            <Container>
                <Form onSubmit={EnviarDados}>
                    <Title>Acessar Sistema</Title>

                    <Input
                        type="email"
                        placeholder="Seu Email"
                        required //
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
                    />

                    <Input 
                        type="password"
                        placeholder="Sua senha"
                        required //
                        value={password}
                        onChange={(s) => setPassword(s.target.value)}
                    />

                    <Button type="submit">Entrar</Button>
                </Form>      
            </Container>    
        )
}


export default Login;