function incluir(event){
    event.preventDefault();
    let entradas = document.getElementById('incomes')
    let saidas = document.getElementById('expenses')
    let total = document.getElementById('total')
    let descricao = document.getElementById('desc')
    let valor = document.getElementById('amount')
    let tipo = document.getElementById('type')
    let entradasNumber = parseFloat(entradas.innerHTML)
    let saidasNumber = parseFloat(saidas.innerHTML)
    let totalNumber = parseFloat(total.innerHTML)
    let descricaoValor = descricao.value
    let valorNumber = parseFloat(valor.value)
    
    if(tipo.value==='entrada'){
        entradasNumber = entradasNumber + valorNumber
    }else{
        saidasNumber = saidasNumber + valorNumber
    }
    totalNumber = entradasNumber - saidasNumber
    
    let bodyTable = document.getElementById('bodytable')
    const row = document.createElement('tr');
    let transactionsStore = localStorage.getItem('transactions');
    let transactions = [];
    if(transactionsStore){
        transactions = JSON.parse(transactionsStore)
    }

    row.innerHTML = `<td class='direita'>${descricaoValor}</td>
                    <td class='esquerda'>${valorNumber.toFixed(2).replace('.',',')}</td>
                    <td class='esquerda'>${tipo.value==='entrada'?'Entrada':'Saída'}</td>
                    <td></td>`
    let linha = {
        descricao:descricaoValor,
        valor:valorNumber,
        tipo:tipo.value
    }
    transactions.push(linha)
    bodyTable.appendChild(row)
    entradas.innerHTML = entradasNumber.toFixed(2).replace('.',',')
    saidas.innerHTML = saidasNumber.toFixed(2).replace('.',',')
    total.innerHTML = totalNumber.toFixed(2).replace('.',',')
    descricao.value=""
    valor.value = ""
    tipo.value = ""
    localStorage.setItem('transactions', JSON.stringify(transactions))
    return false;
}

function alimentapagina(){
    let transactionsStore = localStorage.getItem('transactions');
    if(transactionsStore){
        let entradas = document.getElementById('incomes')
        let saidas = document.getElementById('expenses')
        let total = document.getElementById('total')
        let entradasNumber = 0;
        let saidasNumber = 0;
        let totalNumber = 0;
        let bodyTable = document.getElementById('bodytable')
        let transactions = JSON.parse(transactionsStore)
        transactions.forEach(transaction => {
            const row = document.createElement('tr');
            row.innerHTML = `<td class='direita'>${transaction.descricao}</td>
                    <td class='esquerda'>${transaction.valor.toFixed(2).replace('.',',')}</td>
                    <td class='esquerda'>${transaction.tipo==='entrada'?'Entrada':'Saída'}</td>
                    <td></td>`
            bodyTable.appendChild(row)
            if(transaction.tipo==='entrada'){
                entradasNumber = entradasNumber + transaction.valor
            }else{
                saidasNumber = saidasNumber + transaction.valor
            }
        });
        totalNumber = entradasNumber - saidasNumber
        entradas.innerHTML = entradasNumber.toFixed(2).replace('.',',')
        saidas.innerHTML = saidasNumber.toFixed(2).replace('.',',')
        total.innerHTML = totalNumber.toFixed(2).replace('.',',')
    }
}

alimentapagina()