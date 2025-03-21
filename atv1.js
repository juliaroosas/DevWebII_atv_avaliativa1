// Importar o módulo para capturar entrada do usuário no terminal
const readline = require("readline-sync");

// Iniciar loop para várias entradas do usuário
while (true) {
    // Solicitar ao usuário a escrita do peso em kg
    let peso = parseFloat(readline.question('Digite seu peso em kg (use ponto para separar casas decimais): '));
    
    // Solicitar ao usuário a escrita da altura em metros
    let altura = parseFloat(readline.question('Digite sua altura em metros (use ponto para separar casas decimais): '));
    
    // Verificar se o que foi inserido é válido
    if (isNaN(peso) || isNaN(altura) || peso <= 0 || altura <= 0) {
        console.log('Insira valores válidos para peso e altura.');
        continue; // Retoma o loop solicitando novos valores
    }

    // Calcular IMC: peso dividido por altura * altura
    let imc = peso / (altura * altura);

    // Declarar uma variável para armazenar a classificação do IMC
    let classificacao = "";

    // Verificar a categoria do IMC do usuário
    if (imc < 16) {
        classificacao = 'Baixo peso, muito grave';
    } else if (imc >= 16 && imc <= 16.99) {
        classificacao = 'Baixo peso grave';
    } else if (imc >= 17 && imc <= 18.49) {
        classificacao = 'Baixo peso';
    } else if (imc >= 18.5 && imc <= 24.99) {
        classificacao = 'Peso normal';
    } else if (imc >= 25 && imc <= 29.99) {
        classificacao = 'Sobrepeso';
    } else if (imc >= 30 && imc <= 34.99) {
        classificacao = 'Obesidade grau I';
    } else if (imc >= 35 && imc <= 39.99) {
        classificacao = 'Obesidade grau II';
    } else {
        classificacao = 'Obesidade grau III';
    }

    // Mostrar resultado para o usuário
    console.log(`Seu IMC é ${imc.toFixed(2)} - ${classificacao}`);

    // Perguntar ao usuário se ele deseja calcular novamente ou sair
    let opcao = readline.question('Deseja calcular outro IMC? Digite "s" para sim ou qualquer outra tecla para sair: ');

    // Verificar se a resposta não é "s", sair do loop e fechar o programa
    if (opcao.toLowerCase() !== 's') {
        console.log('Obrigada!');
        break;
    }
}
