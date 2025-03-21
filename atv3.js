// Importar o módulo para capturar entrada do usuário no terminal
const readline = require('readline-sync');

// Iniciar loop para várias entradas do usuário
for (;;) {
    // Solicitar a inserção da distância, em km, que a carga vai percorrer
    let distancia = parseFloat(readline.question('Digite a distância em km: '));
    
    // Verificar se o que foi inserido é válida
    if (isNaN(distancia) || distancia <= 0) {
        console.log('Insira uma distância válida.');
        continue; // Voltar para solicitar um novo valor
    }
    
    // Solicitar a inserção da quantidade de peças a serem transportadas
    let quantidadePecas = parseInt(readline.question('Digite a quantidade de peças transportadas: '));
    
    // Verificar se a quantidade é válida
    if (isNaN(quantidadePecas) || quantidadePecas <= 0) {
        console.log('Insira um valor válido.');
        continue;
    }
    
    // Iniciar loop para a região escolhida
    let valorPorPeca;
    while (true) {
        // Solicitar a inserção da região de destino
        let regiao = parseInt(readline.question('Digite o número referente à região de destino:\n1 - Sudeste (R$ 1,20 por peca)\n2 - Sul (R$ 1,30 por peca)\n3 - Centro-Oeste (R$ 1,50 por peca)\n'));
        
        // Definir o valor por peça com base na região
        switch (regiao) {
            case 1:
                valorPorPeca = 1.20;
                break;
            case 2:
                valorPorPeca = 1.30;
                break;
            case 3:
                valorPorPeca = 1.50;
                break;
            default:
                console.log('Inválida. Escolha uma opção entre 1 e 3.');
                continue;
        }
        break; // Sair do loop se a região for válida
    }
    
    // Calcular frete de acordo com a quantidade de peças
    let custoFretePecas;
    if (quantidadePecas > 1000) {
        // Calcular custo das primeiras 1000 peças (sem desconto)
        let custoSemDesconto = 1000 * valorPorPeca;
        // Calcular custo das demais peças (desconto de 12%)
        let custoComDesconto = (quantidadePecas - 1000) * (valorPorPeca * 0.88);
        // Somar os valores
        custoFretePecas = custoSemDesconto + custoComDesconto;
    } else {
        // Calcular custo se for até 1000 peças apenas
        custoFretePecas = quantidadePecas * valorPorPeca;
    }
    
    // Calcular custo do frete por km (custo de 1L de combustível)
    let custoFreteKm = distancia * 1;
    
    // Perguntar de deseja adicionar rastreamento
    let rastreamento = readline.question('Deseja rastrear o pedido? (Digite "s" para sim ou outra letra para não): ');
    let custoRastreamento = (rastreamento.toLowerCase() === 's') ? 200 : 0;
    
    // Calcular o custo total do frete
    let custoTotalFrete = custoFretePecas + custoFreteKm + custoRastreamento;
    
    // Exibir os valores finais para o usuário
    console.log(`Resumo do frete:\nTaxa de rastreamento: R$ ${custoRastreamento.toFixed(2)}\nCusto do frete por peça: R$ ${custoFretePecas.toFixed(2)}\nCusto do frete por km: R$ ${custoFreteKm.toFixed(2)}\nTotal do frete: R$ ${custoTotalFrete.toFixed(2)}`);
    
    // Perguntar se deseja calcular outro frete
    let opcao = readline.question('Deseja calcular outro frete? (Digite "s" para sim ou outra letra para sair): ');
    
    // Se a resposta for diferente de "s", encerrar programa
    if (opcao.toLowerCase() !== 's') {
        console.log("Obrigada!");
        break;
    }
}
