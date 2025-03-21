// Importar o módulo para capturar entrada do usuário no terminal
const readline = require('readline-sync');

// Solicitar a inserção do salário mínimo
let salarioMinimo = parseFloat(readline.question('Digite o valor do salário minimo: '));

// Verificar se o valor inserido é válido
if (isNaN(salarioMinimo) || salarioMinimo <= 0) {
    console.log('Insira um valor válido.');
} else {
    // Iniciar loop para cadastrar vários funcionários
    while (true) {
        // Solicitar a inserção do código do funcionário
        let codigo = readline.question('Digite o código do funcionário: ');
        
        // Solicitar a inserção do número de horas trabalhadas no mês
        let horasTrabalhadas = parseFloat(readline.question('Digite o número de horas trabalhadas no mês: '));
        
        // Verificar se o número é válido
        if (isNaN(horasTrabalhadas) || horasTrabalhadas <= 0) {
            console.log('Insira um número válido.');
            continue;
        }
        
        // Solicitar a inserção do turno de trabalho
        let turno = readline.question('Digite a letra referente ao turno de trabalho (M - Matutino, V - Vespertino, N - Noturno): ').toUpperCase();
        
        // Verificar se o turno inserido é válido
        if (!['M', 'V', 'N'].includes(turno)) {
            console.log('Turno inválido. Digite M, V ou N.');
            continue;
        }
        
        // Solicitar a inserção da categoria do funcionário
        let categoria = readline.question('Digite a categoria do funcionário (F - funcionário, G - gerente): ').toUpperCase();
        
        // Verificar se a categoria é válida
        if (!['F', 'G'].includes(categoria)) {
            console.log('Categoria inválida. Digite F ou G.');
            continue;
        }
        
        // Determinar o valor da hora trabalhada 
        let valorHora;
        switch (categoria) {
            case 'F':
                if (turno === 'M') valorHora = (10 / 100) * salarioMinimo;
                else if (turno === 'V') valorHora = (15 / 100) * salarioMinimo;
                else valorHora = (20 / 100) * salarioMinimo;
                break;
            case 'G':
                if (turno === 'M') valorHora = (30 / 100) * salarioMinimo;
                else if (turno === 'V') valorHora = (35 / 100) * salarioMinimo;
                else valorHora = (40 / 100) * salarioMinimo;
                break;
        }
        
        // Calcular salário inicial
        let salarioInicial = valorHora * horasTrabalhadas;
        
        // Calcular auxílio-alimentação
        let auxilioAlimentacao;
        if (salarioInicial <= 800) {
            auxilioAlimentacao = salarioInicial * 0.25;
        } else if (salarioInicial > 800 && salarioInicial <= 1200) {
            auxilioAlimentacao = salarioInicial * 0.20;
        } else {
            auxilioAlimentacao = salarioInicial * 0.15;
        }
        
        // Calcular salário final
        let salarioFinal = salarioInicial + auxilioAlimentacao;
        
        // Mostrar resumo dos dados do funcionário
        console.log(`Resumo da folha de pagamento:\nCódigo: ${codigo}\nHoras trabalhadas: ${horasTrabalhadas}\nTurno: ${turno}\nCategoria: ${categoria}\nValor da hora: R$ ${valorHora.toFixed(2)}\nSalario inicial: R$ ${salarioInicial.toFixed(2)}\nAuxilio-alimentação: R$ ${auxilioAlimentacao.toFixed(2)}\nSalario final: R$ ${salarioFinal.toFixed(2)}`);
        
        // Perguntar se deseja cadastrar outro funcionário
        let opcao = readline.question('Deseja cadastrar outro funcionário? (Digites "s" para sim ou outra letra para sair): ');
        
        // Se a resposta for diferente de "s", encerrar programa
        if (opcao.toLowerCase() !== 's') {
            console.log('Obrigada!');
            break;
        }
    }
}

