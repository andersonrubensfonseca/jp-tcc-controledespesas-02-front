const pagina = window.location.pathname
const locais = pagina.split('/')

async function login(event){
    event.preventDefault();
    const form = document.getElementById('meuFormulario');
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    // try {
    //     const response = await fetch('https://api.example.com/endpoint', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(data),
    //     });

    //     const result = await response.json();
    //     console.log('Resposta da API:', result);

    // } catch (error) {
    //     console.error('Erro ao fazer a chamada API:', error);
    // }
    
    return false;
}

    // if(data.username.trim() === 'Linda' && data.password.trim() === '291122'){
    //     localStorage.setItem('credenciais', JSON.stringify(data))
    //     window.location="dashboad.html"
    // }else{
    //     alert('Credenciais inválidas!')
    //     form.reset();
    // }

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
    let hoje = new Date()
    hoje = hoje.getDate()+"/"+(hoje.getMonth()+1)+"/"+hoje.getFullYear();
    row.innerHTML = `<td class='direita'>${descricaoValor}</td>
                    <td class='columnType'>${tipo.value==='entrada'?'Entrada':'Saída'}</td>                    
                    <td class='esquerda'>${valorNumber.toFixed(2).replace('.',',')}</td>
                    <td></td>`
    let linha = {
        descricao:descricaoValor,
        tipo:tipo.value,
        data: hoje,
        valor:valorNumber
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
                    <td class='columnType'>${transaction.tipo==='entrada'?'Entrada':'Saída'}</td>                    
                    <td class='esquerda'>${transaction.valor.toFixed(2).replace('.',',')}</td>
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

if(locais[locais.length-1]==='relatorios.html'){
    function alimentapagina2(){
        let transactionsStore = localStorage.getItem('transactions');
        let bodyTable = document.getElementById('bodytable')
        console.log(bodyTable)
            let transactions = JSON.parse(transactionsStore)
            transactions.forEach(transaction => {
                const row = document.createElement('tr');
                row.innerHTML = `<td class='direita'>${transaction.descricao}</td>
                        <td class='esquerda'>${transaction.tipo==='entrada'?'Entrada':'Saída'}</td>
                        <td class='esquerda'>${transaction.valor.toFixed(2).replace('.',',')}</td>
                        <td style="text-align:center">${transaction.data?transaction.data:'-'}</td>
                        <td></td>`
                bodyTable.appendChild(row)
    });
    }
    
    alimentapagina2()
}