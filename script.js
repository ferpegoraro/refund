//Seleciona os elementos do formulário
const amount = document.querySelector("#amount")

//Captura o evento de input
amount.oninput = () => {
    
    //Substitui todos os caracteres que não sejam números por vazio
    let value = amount.value.replace(/\D/g, "")

    //Transformar o valor em centavos
    value = Number(value) / 100

    //Agora esse input aceita apenas números
    amount.value = formatCurrencyBRL(value)

}

function formatCurrencyBRL(value){
    value = value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    })

    return value
}

