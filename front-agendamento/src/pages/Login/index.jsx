import api from '../../services/api'
import { useState } from "react";
import styled from "styled-components";

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

function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function EnviarDados(event){
        event.preventDefault();
        try {
            const response = await api.post('/login', {
                email: email,
                password: password
            });

            console.log("Resposta do servidor:", response.data);
            alert(`Login realizado com sucesso! Token: ${response.data.token}`);
        } catch (err){
            console.log("Erro ao logar: " + err)
            if (err.response) {
                alert(err.response.data.message || "Erro no servidor");
            } else {
                alert("Erro de cnexão. Verifique se o Back-end está rodando.");
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