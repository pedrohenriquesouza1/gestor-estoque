class Produto {
    constructor(nome, precoCompra, precoVenda, quant) {
        this.nome = nome
        this.precoCompra = precoCompra
        this.precoVenda = precoVenda
        this.quant = quant
    }

    calcLucro() {
        return this.precoVenda - this.precoCompra
    }

    Resumo() {
        return `Produto ${this.nome}; Estoque: ${this.quant} unidades`
    }
    
}
const peca1 = new Produto("Óleo 5w40 sintético", 25.90, 39.99, 120);
console.log(peca1.Resumo());
console.log(`Lucro por peça: R$ ${peca1.calcLucro().toFixed(2)}`);

class Estoque {
    constructor() {
        this.lista = []
    }

    adicionar(product) {
        this.lista.push(product)
        console.log(`${product.nome} adicionado com sucesso`)
    }

    remove() {
        //continuar daqui
    }

    search() {
        //continuar daqui
    }
}

const gerenciadorEstoque = new Estoque()
gerenciadorEstoque.adicionar(peca1)
console.log(gerenciadorEstoque.lista)