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
        return this.#precoVenda - this. #precoCompra
    }

    Resumo() {
        return this.#nome
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
        console.log(`${product.Resumo()} ---- Adicionado com sucesso`)
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
const peca2 = new Produto("Filtro de óleo Volks Santana", 15.90, 35.49, 50)
gerenciadorEstoque.adicionar(peca2)
console.log(`Lucro por peça: R$ ${peca2.calcLucro().toFixed(2)}`);
/* O QUE A CLASS ESTOQUE PRECISA SABER SOBRE O PRODUTO? 
1. O nome
2. Quantidade */