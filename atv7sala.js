// Importar módulo para capturar entrada do usuário no terminal
const readline = require('readline-sync');

// Verificar valor do salário mínimo 
let salarioMinimo;
while (true) {
    salarioMinimo = parseFloat(readline.question('Digite o valor do salário mínimo: '));
    if (!isNaN(salarioMinimo) && salarioMinimo > 0) {
        break;
    } else {
        console.log('Valor inválido. Tente novamente.');
    }
}

let funcionarios = [];
let codigosUsados = [];

let contagemBonus = {
    '10%': 0,
    '5%': 0,
    '2%': 0,
    '0%': 0
};

while (true) {
    console.log('\nNovo Funcionário');

    // Código único do funcionário
    let codigo;
    while (true) {
        codigo = readline.question('Digite o código do funcionário: ');
        if (!codigosUsados.includes(codigo)) {
            codigosUsados.push(codigo);
            break;
        } else {
            console.log('Código já cadastrado. Digite outro.');
        }
    }

    // Horas trabalhadas
    let horas = parseFloat(readline.question('Horas trabalhadas no mês: '));
    if (isNaN(horas) || horas <= 0) {
        console.log('Horas inválidas. Tente novamente.');
        continue;
    }

    // Categoria
    let categoria = readline.question('Categoria (F - Funcionário / G - Gerente): ').toUpperCase();
    if (!["F", "G"].includes(categoria)) {
        console.log('Categoria inválida. Tente novamente.');
        continue;
    }

    // Turno
    let turno = readline.question('Turno (M - Matutino / V - Vespertino / N - Noturno): ').toUpperCase();
    if (!['M', 'V', 'N'].includes(turno)) {
        console.log('Turno inválido. Tente novamente.');
        continue;
    }

    // Avaliação de desempenho
    let nota = parseFloat(readline.question('Nota de desempenho (0 a 10): '));
    if (isNaN(nota) || nota < 0 || nota > 10) {
        console.log('Nota inválida. Tente novamente.');
        continue;
    }

    // Valor da hora trabalhada
    let percentual = 0;
    if (categoria === 'F') {
        if (turno === 'M') percentual = 0.10;
        else if (turno === 'V') percentual = 0.15;
        else percentual = 0.20;
    } else {
        if (turno === 'M') percentual = 0.30;
        else if (turno === 'V') percentual = 0.35;
        else percentual = 0.40;
    }

    let valorHora = salarioMinimo * percentual;
    let salarioInicial = valorHora * horas;

    // Auxílio-alimentação
    let auxilio = 0;
    if (salarioInicial <= 800) auxilio = salarioInicial * 0.25;
    else if (salarioInicial <= 1200) auxilio = salarioInicial * 0.20;
    else auxilio = salarioInicial * 0.15;

    // Bônus por desempenho
    let bonus = 0;
    if (nota >= 9) {
        bonus = salarioInicial * 0.10;
        contagemBonus['10%']++;
    } else if (nota >= 7) {
        bonus = salarioInicial * 0.05;
        contagemBonus['5%']++;
    } else if (nota >= 5) {
        bonus = salarioInicial * 0.02;
        contagemBonus['2%']++;
    } else {
        contagemBonus['0%']++;
    }

    let salarioFinal = salarioInicial + auxilio + bonus;

    // Salvar funcionário
    funcionarios.push({
        codigo,
        horas,
        categoria,
        turno,
        nota,
        salarioInicial,
        auxilio,
        bonus,
        salarioFinal
    });

    // Continuar ou não
    let continuar = readline.question('Deseja cadastrar outro funcionário? Digite "s" para sim e "n" para não: ').toLowerCase();
    if (continuar !== "s") break;
}

// Relatório final
console.log('\nRelatório final');

let totalFuncionarios = funcionarios.length;
let somaSalarios = 0;
let somaF = 0, qtdF = 0;
let somaG = 0, qtdG = 0;

let maior = funcionarios[0];
let menor = funcionarios[0];

for (let f of funcionarios) {
    somaSalarios += f.salarioFinal;

    if (f.categoria === "F") {
        somaF += f.salarioFinal;
        qtdF++;
    } else {
        somaG += f.salarioFinal;
        qtdG++;
    }

    if (f.salarioFinal > maior.salarioFinal) maior = f;
    if (f.salarioFinal < menor.salarioFinal) menor = f;
}

console.log(`Total de funcionários cadastrados: ${totalFuncionarios}`);
console.log(`Média salarial geral: R$ ${(somaSalarios / totalFuncionarios).toFixed(2)}`);
console.log(`Média salarial - Funcionários: R$ ${(qtdF > 0 ? somaF / qtdF : 0).toFixed(2)}`);
console.log(`Média salarial - Gerentes: R$ ${(qtdG > 0 ? somaG / qtdG : 0).toFixed(2)}`);

console.log(`\nFuncionário com MAIOR salário:`);
console.log(`Código: ${maior.codigo}, Categoria: ${maior.categoria}, Turno: ${maior.turno}, Salário Final: R$ ${maior.salarioFinal.toFixed(2)}`);

console.log(`\nFuncionário com MENOR salário:`);
console.log(`Código: ${menor.codigo}, Categoria: ${menor.categoria}, Turno: ${menor.turno}, Salário Final: R$ ${menor.salarioFinal.toFixed(2)}`);

console.log(`\nFuncionários por faixa de bônus:`);
console.log(`10%: ${contagemBonus['10%']}`);
console.log(`5%: ${contagemBonus['5%']}`);
console.log(`2%: ${contagemBonus['2%']}`);
console.log(`Sem bônus: ${contagemBonus['0%']}`);


