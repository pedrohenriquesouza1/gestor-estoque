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
        if(this.#nome === nomeBus) {
            return true
        } else {
            return false
        }
    }
    //método acima compara o nome com o nome que vai ser utilizado no search, no caso
}

const peca1 = new Produto("Óleo 5w40 sintético", 25.90, 39.99, 120);
console.log(peca1.Resumo());
console.log(`Lucro por peça: R$ ${peca1.calcLucro().toFixed(2)}`);

class Estoque {
    #lista
    constructor() {
        this.#lista = []
    }

    adicionar(product) {
        this.#lista.push(product)
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

    remove() {
        for(let cont = 0; cont <= this.#lista.length; cont++) {
            if(this.#lista[cont].comparadorNome(nomeBus)) {
                this.#lista.splice(cont, 1)
                return true
            }
        }
        return false
    }

}

const gerenciadorEstoque = new Estoque()
gerenciadorEstoque.adicionar(peca1)

const peca2 = new Produto("Filtro de óleo Volks Santana", 15.90, 35.49, 50)
gerenciadorEstoque.adicionar(peca2)
console.log(`Lucro por peça: R$ ${peca2.calcLucro().toFixed(2)}`);

const res = gerenciadorEstoque.search("bolo de pote")
if(res != null) {
    console.log(`Produto encontrado, ${res.Resumo()}`)
} else {
    console.log("nenhum produto encontrado :(")
}

