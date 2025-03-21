// Importar o módulo para capturar entrada do usuário no terminal
const readline = require('readline-sync');

// Inicializar objeto para contar por faixa etária
let contadorFaixaEtaria = {
    crianca: 0,
    adolescente: 0,
    adulto: 0,
    idoso: 0
};

while (true) {
    // Solicitar idade
    let idade = parseInt(readline.question('Digite a idade da pessoa: '));

    // Verificar validade da entrada
    if (isNaN(idade) || idade < 0) {
        console.log('Insira uma idade válida.');
        continue;
    }

    // Classificar idade na faixa etária
    if (idade <= 12) {
        contadorFaixaEtaria.crianca++;
    } else if (idade <= 17) {
        contadorFaixaEtaria.adolescente++;
    } else if (idade <= 59) {
        contadorFaixaEtaria.adulto++;
    } else {
        contadorFaixaEtaria.idoso++;
    }

    // Mostrar contagem atual
    console.log(`\nContagem atual:
Crianças: ${contadorFaixaEtaria.crianca}
Adolescentes: ${contadorFaixaEtaria.adolescente}
Adultos: ${contadorFaixaEtaria.adulto}
Idosos: ${contadorFaixaEtaria.idoso}\n`);

    // Perguntar se deseja continuar
    let opcao = readline.question('Deseja inserir outra idade? (Digite "s" para sim ou outra letra para sair): ');
    if (opcao.toLowerCase() !== 's') {
        console.log('\nObrigada!\n');
        break;
    }
}
