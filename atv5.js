// Importar o módulo para capturar entrada do usuário no terminal
const readline = require('readline-sync');

// Iniciar um loop para a entrada de vários alunos
while (true) {
    // Solicitar a inserção da nota da atividade prática 
    let nota1 = parseFloat(readline.question('Digite a nota da atividade prática em laboratório (0 a 10): '));
    
    // Solicitar a inserção da nota da prova
    let nota2 = parseFloat(readline.question('Digite a nota da prova do semestre (0 a 10): '));
    
    // Solicitar a inserção da nota do trabalho teórico
    let nota3 = parseFloat(readline.question('Digite a nota do trabalho teórico (0 a 10): '));
    
    // Verificar se as notas são válidas 
    if (isNaN(nota1) || isNaN(nota2) || isNaN(nota3) || 
        nota1 < 0 || nota1 > 10 || nota2 < 0 || nota2 > 10 || nota3 < 0 || nota3 > 10) {
        console.log('Insira valores entre 0 e 10.');
        continue; // Solicitar novas notas
    }
    
    // Definir peso das notas
    let peso1 = 2, peso2 = 5, peso3 = 3;
    
    // Calcular média ponderada
    let media = ((nota1 * peso1) + (nota2 * peso2) + (nota3 * peso3)) / (peso1 + peso2 + peso3);
    
    // Mostrar a classificação do aluno 
    let classificacao;
    if (media >= 9) {
        classificacao = 'A';
    } else if (media >= 8) {
        classificacao = 'B';
    } else if (media >= 7) {
        classificacao = 'C';
    } else if (media >= 6) {
        classificacao = 'D';
    } else if (media >= 5) {
        classificacao = 'E';
    } else {
        classificacao = 'F';
    }
    
    // Mostrar resultado com a média e a classificação
    console.log(`A média do aluno é = ${media.toFixed(2)} e a sua classificação é ${classificacao}`);
    
    // Perguntar se deseja calcular a média de outro aluno
    let opcao = readline.question('Deseja calcular a média de outro aluno? (Digite "s" para sim ou outra letra para sair): ');
    
    // Se a resposta for diferente de "s", encerrar programa
    if (opcao.toLowerCase() !== 's') {
        console.log('Obrigada!');
        break;
    }
}