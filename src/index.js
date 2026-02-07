class Produto {
    #nome
    #precoCompra
    #precoVenda
    #quant
    constructor(nome, precoCompra, precoVenda, quant) {
        this.#nome = nome
        this.#precoCompra = precoCompra
        this.#precoVenda = precoVenda
        this.#quant = quant
    }

    calcLucro() {
        return this.#precoVenda - this.#precoCompra
    }

    Resumo() {
        return `${this.#nome} com ${this.#quant} unidades`
    }
    
    comparadorNome(nomeBus) {
        if(this.#nome.toLowerCase() === nomeBus.toLowerCase()) {
            return true
        } else {
            return false
        }
    }
    //método acima compara o nome com o nome que vai ser utilizado no search, no caso
    toJSON() {
        return {
            nome: this.#nome,
            precoCompra: this.#precoCompra,
            precoVenda: this.#precoVenda,
            quant: this.#quant
        }
    }
}

class Estoque {
    #lista
    constructor() {
        this.#lista = []
        this.carregarDado()
    }

    adicionar(product) {
        this.#lista.push(product)
        this.salvarDados()
        return `${product.Resumo()}`
    }

    search(nomeBus) {
        for(const value of this.#lista) {
            if(value.comparadorNome(nomeBus) === true) {
                return value
            }
        }
        return null
    }

    remove(nomeBus) {
        for(let cont = 0; cont < this.#lista.length; cont++) {
            if(this.#lista[cont].comparadorNome(nomeBus)) {
                this.#lista.splice(cont, 1)
                this.salvarDados()
                return true
            }
        }
        return false
    }   

    salvarDados() {
        const dadospSalvar = this.#lista.map(b => b.toJSON())
        localStorage.setItem('meuEstoque', JSON.stringify(dadospSalvar))
    }

    carregarDado() {
        const dadosSalvados = localStorage.getItem('meuEstoque')
        if(dadosSalvados) {
            const listaObj = JSON.parse(dadosSalvados)
            this.#lista = listaObj.map(
                dado => new Produto(
                    dado.nome,
                    dado.precoCompra,
                    dado.precoVenda,
                    dado.quant
                )
            )
        }
    }
}

const gerenciadorEstoque = new Estoque()

document.getElementById('btn-adicionar').addEventListener('click', function() {
    const nomeImput = document.getElementById('input-nome')
    const inputprecoCompra = document.getElementById('input-compra')
    const inputprecoVenda = document.getElementById('input-venda')
    const inputQuant = document.getElementById('input-quant')

    const nomeProduto = nomeImput.value
    const compraProduto = Number(inputprecoCompra.value)
    const precoVenda = Number(inputprecoVenda.value)
    const quantidade = Number(inputQuant.value)

    if (nomeProduto === "" || inputprecoCompra.value === "") {
        window.alert("O produto não pode ter valor vazio nem nome")
        return;
    }

    const newItem = new Produto(nomeProduto, compraProduto, precoVenda, quantidade)

    gerenciadorEstoque.adicionar(newItem)
    window.alert('Produto adicionado com sucesso!')

    nomeImput.value = ""
    inputprecoCompra.value = ""
    inputprecoVenda.value = ""
    inputQuant.value = ""
})

document.getElementById('btn-buscar').addEventListener('click', function() {
    const nomeBuscado = document.getElementById('search-nome').value
    const divRes = document.getElementById('resultado-busca')
    const res = gerenciadorEstoque.search(nomeBuscado)
    if (res != null) {
        divRes.innerHTML = `
        <p style="color: green; font-weight: bold;">Produto Encontrado!</p>
        <p>${res.Resumo()}</p>
        <p>Lucro p/ unidade: R$ ${res.calcLucro().toFixed(2)}</p>
        `;
        divRes.style.borderLeft = "4px solid green"
    }  else {
        divRes.innerHTML = `<p style="color: #d32f2f;">Produto "${nomeBuscado}" não encontrado.</p>`
        divRes.style.borderLeft = '4px solid #d32f2f'
    }
    
}) 

document.getElementById('btn-remover').addEventListener('click', function(){
    const nomRem = document.getElementById('remove-nome').value
    const resRem = document.getElementById('msg-remocao')
    if (nomRem === "") return;
    const rem = gerenciadorEstoque.remove(nomRem) 

    if (rem) {
        resRem.innerHTML = `<p style="color: green;">"${nomRem}" foi removido do estoque.</p>`
        resRem.style.borderLeft = "4px solid green"

        document.getElementById('search-nome').value = '';
        document.getElementById('resultado-busca').innerHTML = '<span class="placeholder-text">O resultado da busca aparecerá aqui...</span>';
    } else {
        resRem.innerHTML = `<p style="color: orange;">Erro: Não foi possível remover. Produto não encontrado.</p>`
        resRem.style.borderLeft = "4px solid #d32f2f"
    }
})

document.getElementById('search-nome').addEventListener('input', function() {
    const divRes = document.getElementById('resultado-busca');
    divRes.innerHTML = '<span class="placeholder-text">O resultado da busca aparecerá aqui...</span>';
    divRes.style.borderLeft = "none"; 
});

document.getElementById('remove-nome').addEventListener('input', function() {
    const remRes = document.getElementById('msg-remocao')
    remRes.innerHTML = '<span class="placeholder-text">Se remover algum produto, ele aparece aqui...</span>'
    remRes.style.borderLeft = "none"
})