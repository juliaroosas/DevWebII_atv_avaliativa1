// Importar módulo para capturar entrada do usuário no terminal
const prompt = require('prompt-sync')(); 

// Verificar preço do combustível
let precoCombustivel = parseFloat(prompt('Preço do litro do combustível: R$ ').replace(',', '.'));
let pedidos = [];
let codigosUsados = [];

while (true) {
    console.log('\nNovo Pedido');

    // Código único do pedido
    let codigo;
    while (true) {
        codigo = prompt('Código do pedido: ').trim();
        if (!codigosUsados.includes(codigo)) {
            codigosUsados.push(codigo);
            break;
        } else {
            console.log('Código já existente. Digite outro.');
        }
    }

    // Região
    let regiao = '';
    let precoPeca = 0;
    while (true) {
        let opcao = prompt('Digite o número correspondente à região: 1 - Sudeste, 2 - Sul, 3 - Centro-Oeste: ');
        if (opcao === '1') {
            regiao = 'Sudeste';
            precoPeca = 1.20;
            break;
        } else if (opcao === '2') {
            regiao = 'Sul';
            precoPeca = 1.30;
            break;
        } else if (opcao === '3') {
            regiao = 'Centro-Oeste';
            precoPeca = 1.50;
            break;
        } else {
            console.log('Região inválida. Tente novamente.');
        }
    }

    let distancia = parseFloat(prompt('Distância em km: ').replace(',', '.'));
    let quantidade = parseInt(prompt('Quantidade de peças: '));
    let rastreio = prompt('Deseja rastreamento? Digite "s" para sim e "n" para não: ').toLowerCase() === 's';

    // Cálculo
    let custoPecas = quantidade <= 1000
        ? quantidade * precoPeca
        : 1000 * precoPeca + (quantidade - 1000) * (precoPeca * 0.88);

    let custoKm = distancia * precoCombustivel;
    let custoRastreio = rastreio ? 200 : 0;
    let total = custoPecas + custoKm + custoRastreio;

    pedidos.push({ codigo, regiao, total });

    let continuar = prompt('Deseja adicionar outro pedido? Digite "s" para sim e "n" para não: ').toLowerCase();
    if (continuar !== "s") break;
}

// Relatório
console.log('\nRelatório final');

console.log('Total de pedidos:', pedidos.length);

let somaTotal = 0;
let totaisPorRegiao = { 'Sudeste': 0, 'Sul': 0, 'Centro-Oeste': 0 };
let maisCaro = pedidos[0];
let maisBarato = pedidos[0];

for (let pedido of pedidos) {
    somaTotal += pedido.total;
    totaisPorRegiao[pedido.regiao] += pedido.total;

    if (pedido.total > maisCaro.total) maisCaro = pedido;
    if (pedido.total < maisBarato.total) maisBarato = pedido;
}

console.log('Valor médio por pedido: R$ ' + (somaTotal / pedidos.length).toFixed(2));
console.log('Total por região:');
for (let regiao in totaisPorRegiao) {
    console.log(`  ${regiao}: R$ ${totaisPorRegiao[regiao].toFixed(2)}`);
}
console.log(`Pedido mais caro: ${maisCaro.codigo} - R$ ${maisCaro.total.toFixed(2)}`);
console.log(`Pedido mais barato: ${maisBarato.codigo} - R$ ${maisBarato.total.toFixed(2)}`);
