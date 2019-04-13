
//get database value
let test = null
const url = "https://www.hollidaystore.com.br/hollidaystore/painel/api/quantidade/read.php"
// const url = "http://localhost/holliday-painel-api/api/quantidade/read.php"

fetch(url)
    .then(response => {
        if (!response.ok) {
            throw Error(response.statusText)
        }
        else {
            return response
        }
    })
    .then(response => {
        return response.json()
    })
    .then(response => {

        if (response.active == 1) {
            let testValue = 0
            let testLayer = dataLayer[0].ProductBasketProducts.map(prod => {
                return (
                    testValue = +testValue + prod.quantity
                )
            })

            if (testValue < response.quantidade) {

                // diferença
                let diferenca = +response.quantidade - testValue

                // se o test value for menor que a quantidade nao deixar o cliente comprar

                // esconder os botoes de valor
                let span12 = document.querySelector('#corpo .finalizar-compra form .span12')
                let oldBotaoDesativo = document.querySelector('.botao.principal.grande.desativo')
                let oldBotaoAtivo = span12.querySelector('.botao.principal.grande')

                span12.style.display = "flex";
                span12.style.justifyContent = "flex-end";

                if (oldBotaoDesativo !== null) {
                    if (oldBotaoDesativo !== null) {
                        oldBotaoDesativo.style.display = 'none'
                    }
                }

                if (oldBotaoAtivo !== null) {
                    if (oldBotaoAtivo !== null) {
                        oldBotaoAtivo.style.display = 'none'
                    }
                }




                // criar tool tip
                let toolTip = document.createElement('div');
                toolTip.classList.add('new-tooltip')

                let toolTipText = `Ainda faltam ${diferenca} produtos para poder finalizar a compra.`
                if (diferenca == 1) {
                    toolTipText = `Ainda falta ${diferenca} produto para poder finalizar a compra.`
                }
                toolTip.innerText = toolTipText

                // criar novo botao de compra inativo
                let novoBotaoCompraInativo = document.createElement('a');
                let novoBotaoCompraWrapper = document.createElement('div');
                novoBotaoCompraWrapper.classList.add('novo-botao-wrapper')
                novoBotaoCompraInativo.classList.add('novo-botao-compra')
                novoBotaoCompraInativo.classList.add('botao')
                novoBotaoCompraInativo.classList.add('principal')
                novoBotaoCompraInativo.classList.add('grande')
                novoBotaoCompraInativo.classList.add('desativo')

                novoBotaoCompraInativo.innerText = "Finalizar Compra"

                novoBotaoCompraWrapper.appendChild(toolTip)
                novoBotaoCompraWrapper.appendChild(novoBotaoCompraInativo)
                span12.appendChild(novoBotaoCompraWrapper)
                console.log(novoBotaoCompraInativo)
            } else {
                // caso seja, permitir a compra
                // novoBotaoCompraWrapper.style.display = 'none !important'
                debugger
                let span12 = document.querySelector('#corpo .finalizar-compra form .span12')

                let oldBotaoDesativo = document.querySelector('.botao.principal.grande.desativo')

                if (oldBotaoDesativo !== null) {
                    if (oldBotaoDesativo !== null) {
                        oldBotaoDesativo.style.display = 'none'
                    }
                }

                let oldBotaoAtivo = span12.querySelector('.botao.principal.grande')

                if (oldBotaoAtivo !== null) {
                    if (oldBotaoAtivo !== null) {
                        oldBotaoAtivo.style.display = 'none'
                    }
                }

                let novoBotaoCompraAtivo = document.createElement('button');

                novoBotaoCompraAtivo.classList.add('novo-botao-compra')

                novoBotaoCompraAtivo.innerText = "Finalizar Compra"
                console.log(novoBotaoCompraAtivo)
                span12.appendChild(novoBotaoCompraAtivo)
            }
        }
    })
    .catch(error => console.log(error))




