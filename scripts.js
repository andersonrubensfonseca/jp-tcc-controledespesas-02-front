let nome = document.querySelector('#nome')
let labelNome = document.querySelector('#labelNome')
let validNome = false

let senha = document.querySelector('#senha')
let labelSenha = document.querySelector('#labelSenha')
let validSenha = false

let confirmSenha = document.querySelector('#confirmSenha')
let labelConfirmSenha = document.querySelector('#labelConfirmSenha')
let validConfirmSenha = false

let msgError = document.querySelector('#msgError')
let msgSuccess = document.querySelector('#msgSuccess')

if (window.location.href.includes('cadastro.html')) {
  nome.addEventListener('keyup', () => {
    if (nome.value.length <= 2) {
      labelNome.setAttribute('style', 'color: red')
      labelNome.innerHTML = 'Nome *Insira no minimo 3 caracteres'
      nome.setAttribute('style', 'border-color: red')
      validNome = false
    } else {
      labelNome.setAttribute('style', 'color: green')
      labelNome.innerHTML = 'Nome'
      nome.setAttribute('style', 'border-color: green')
      validNome = true
    }
  })
}


if (window.location.href.includes('cadastro.html')) {
  senha.addEventListener('keyup', () => {
    if (senha.value.length <= 5) {
      labelSenha.setAttribute('style', 'color: red')
      labelSenha.innerHTML = 'Senha *Insira no minimo 6 caracteres'
      senha.setAttribute('style', 'border-color: red')
      validSenha = false
    } else {
      labelSenha.setAttribute('style', 'color: green')
      labelSenha.innerHTML = 'Senha'
      senha.setAttribute('style', 'border-color: green')
      validSenha = true
    }
  })
  confirmSenha.addEventListener('keyup', () => {
    if (senha.value != confirmSenha.value) {
      labelConfirmSenha.setAttribute('style', 'color: red')
      labelConfirmSenha.innerHTML = 'Confirmar Senha *As senhas não conferem'
      confirmSenha.setAttribute('style', 'border-color: red')
      validConfirmSenha = false
    } else {
      labelConfirmSenha.setAttribute('style', 'color: green')
      labelConfirmSenha.innerHTML = 'Confirmar Senha'
      confirmSenha.setAttribute('style', 'border-color: green')
      validConfirmSenha = true
    }
  })
}
function cadastrar(event) {
  event.preventDefault();
  if (validNome && validSenha && validConfirmSenha) {
    let listaUser = JSON.parse(localStorage.getItem('listaUser') || '[]')

    listaUser.push(
      {
        nomeCad: nome.value,
        senhaCad: senha.value
      }
    )

    localStorage.setItem('listaUser', JSON.stringify(listaUser))


    msgSuccess.setAttribute('style', 'display: block')
    msgSuccess.innerHTML = '<strong>Cadastrando usuário...</strong>'
    msgError.setAttribute('style', 'display: none')
    msgError.innerHTML = ''

    setTimeout(() => {
      window.location = './index.html'
    }, 1000)


  } else {
    msgError.setAttribute('style', 'display: block')
    msgError.innerHTML = '<strong>Preencha todos os campos corretamente antes de cadastrar</strong>'
    msgSuccess.innerHTML = ''
    msgSuccess.setAttribute('style', 'display: none')
  }
  return false;
}

if (window.location.href.includes('cadastro.html')) {
  btn.addEventListener('click', () => {
    let inputSenha = document.querySelector('#senha')

    if (inputSenha.getAttribute('type') == 'password') {
      inputSenha.setAttribute('type', 'text')
    } else {
      inputSenha.setAttribute('type', 'password')
    }

  })
  btnConfirm.addEventListener('click', () => {
    let inputConfirmSenha = document.querySelector('#confirmSenha')

    if (inputConfirmSenha.getAttribute('type') == 'password') {
      inputConfirmSenha.setAttribute('type', 'text')
    } else {
      inputConfirmSenha.setAttribute('type', 'password')
    }
  })
}

function entrar(event) {
  event.preventDefault();
  let usuario = document.querySelector('#usuario')
  let userLabel = document.querySelector('#userLabel')

  let senha = document.querySelector('#senha')
  let senhaLabel = document.querySelector('#senhaLabel')

  let msgError = document.querySelector('#msgError')
  let listaUser = []

  let userValid = {
    nome: '',
    user: '',
    senha: ''
  }

  listaUser = JSON.parse(localStorage.getItem('listaUser'))
  listaUser.forEach((item) => {
    if (usuario.value == item.nomeCad && senha.value == item.senhaCad) {
      userValid = {
        nome: item.nomeCad,
        user: item.userCad,
        senha: item.senhaCad
      }

    }
  })
  if (usuario.value == userValid.nome && senha.value == userValid.senha) {
    window.location = './dashboad.html'

    let mathRandom = Math.random().toString(16).substr(2)
    let token = mathRandom + mathRandom

    localStorage.setItem('token', token)
    localStorage.setItem('userLogado', JSON.stringify(userValid))
  } else {
    userLabel.setAttribute('style', 'color: red')
    usuario.setAttribute('style', 'border-color: red')
    senhaLabel.setAttribute('style', 'color: red')
    senha.setAttribute('style', 'border-color: red')
    msgError.setAttribute('style', 'display: block')
    msgError.innerHTML = 'Usuário ou senha incorretos'
    usuario.focus()
  }
  return false
}

const pagina = window.location.pathname
const locais = pagina.split('/')

function incluir(event) {
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

  if (tipo.value === 'entrada') {
    entradasNumber = entradasNumber + valorNumber
  } else {
    saidasNumber = saidasNumber + valorNumber
  }
  totalNumber = entradasNumber - saidasNumber

  let bodyTable = document.getElementById('bodytable')
  const row = document.createElement('tr');
  let transactionsStore = localStorage.getItem('transactions');
  let transactions = [];
  if (transactionsStore) {
    transactions = JSON.parse(transactionsStore)
  }
  let hoje = new Date()
  hoje = hoje.getDate() + "/" + (hoje.getMonth() + 1) + "/" + hoje.getFullYear();
  row.innerHTML = `<td class='direita'>${descricaoValor}</td>
                    <td class='columnType'>${tipo.value === 'entrada' ? 'Entrada' : 'Saída'}</td>                    
                    <td class='esquerda'>${valorNumber.toFixed(2).replace('.', ',')}</td>
                    <td></td>`
  let linha = {
    descricao: descricaoValor,
    tipo: tipo.value,
    data: hoje,
    valor: valorNumber
  }
  transactions.push(linha)
  bodyTable.appendChild(row)
  entradas.innerHTML = entradasNumber.toFixed(2).replace('.', ',')
  saidas.innerHTML = saidasNumber.toFixed(2).replace('.', ',')
  total.innerHTML = totalNumber.toFixed(2).replace('.', ',')
  descricao.value = ""
  valor.value = ""
  tipo.value = ""
  localStorage.setItem('transactions', JSON.stringify(transactions))
  return false;
}

function alimentapagina() {
  let transactionsStore = localStorage.getItem('transactions');
  if (transactionsStore) {
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
                    <td class='columnType'>${transaction.tipo === 'entrada' ? 'Entrada' : 'Saída'}</td>                    
                    <td class='esquerda'>${transaction.valor.toFixed(2).replace('.', ',')}</td>
                    <td></td>`
      bodyTable.appendChild(row)
      if (transaction.tipo === 'entrada') {
        entradasNumber = entradasNumber + transaction.valor
      } else {
        saidasNumber = saidasNumber + transaction.valor
      }
    });
    totalNumber = entradasNumber - saidasNumber
    entradas.innerHTML = entradasNumber.toFixed(2).replace('.', ',')
    saidas.innerHTML = saidasNumber.toFixed(2).replace('.', ',')
    total.innerHTML = totalNumber.toFixed(2).replace('.', ',')
  }
}

if (locais[locais.length - 1] === 'dashboad.html') {
  alimentapagina()
}

if (locais[locais.length - 1] === 'relatorios.html') {
  function alimentapagina2() {
    let transactionsStore = localStorage.getItem('transactions');
    let bodyTable = document.getElementById('bodyTable')
    let transactions = JSON.parse(transactionsStore)
    transactions.forEach(transaction => {
      const row = document.createElement('tr');
      row.innerHTML = `<td class='direita'>${transaction.descricao}</td>
                        <td class='esquerda'>${transaction.tipo === 'entrada' ? 'Entrada' : 'Saída'}</td>
                        <td class='esquerda'>${transaction.valor.toFixed(2).replace('.', ',')}</td>
                        <td style="text-align:center">${transaction.data ? transaction.data : '-'}</td>
                        <td></td>`
      bodyTable.appendChild(row)
    });
  }
  alimentapagina2()

}

function sair() {
  localStorage.removeItem('userLogado')
  localStorage.removeItem('token')
  window.location = "./index.html"
}