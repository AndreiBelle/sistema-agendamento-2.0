//Importando estilos para navegadores
import { createGlobalStyle } from "styled-components";

//Criando e exportando o componente
export default createGlobalStyle`
*{
margin: 0;
padding: 0;
box-sizing: border-box;
front-family: 'Arial', sans-serif;
}
 body {
    background-color: #f5f5f5;
    color: #333;
    -webkit-front-smoothing: antialiased;
 }
button {
    cursor: pointer;
}
`;
