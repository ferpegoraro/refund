//Seleciona os elementos do formulário
const form = document.querySelector("form")
const amount = document.querySelector("#amount")
const expense = document.querySelector("#expense")
const category = document.querySelector("#category")

//Seleciona os elementos da lista
const ul = document.querySelector("ul")
const expenseQuantity = document.querySelector("aside header p span")
const expensesTotal = document.querySelector("aside header h2")


//Captura o evento de input
amount.oninput = () => {
    
    //Substitui todos os caracteres que não sejam números por vazio
    let value = amount.value.replace(/\D/g, "")

    //Transformar o valor em centavos
    value = Number(value) / 100

    //Agora esse input aceita apenas números
    amount.value = formatCurrencyBRL(value)

}

//Função para formatar o valor em real brasileiro
function formatCurrencyBRL(value){
    value = value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    })

    return value
}

//Captura o evento de submit
form.onsubmit = (event) => {
    event.preventDefault()

    //Cria um objeto com os detalhes da nova despesa
    const newExpense = {
        id : new Date().getTime(),
        expense: expense.value,
        category_id: category.value,
        category_name: category.options[category.selectedIndex].text,
        amount: amount.value,
        created_at: new Date(),
    }
    //Chama a função wue irá adicionar a despesa
    expenseAddRemove(newExpense)

    //Limpa o formulário
    form.reset()

    //Coloca o foco no input de nome da despesa
    expense.focus()

}

//Adiciona e remove itens na lista
function expenseAddRemove(newExpense){
    try {
        //Cria o elemento de li para adicionar na lista na ul
        const li = document.createElement("li")
        li.classList.add("expense")

        //Cria o ícone da categoria
        const icon = document.createElement("img")
        icon.setAttribute("src", `./img/${newExpense.category_id}.svg`)
        icon.setAttribute("alt", newExpense.category_name)

        //Cria a div para adicionar o nome da despesa e a categoria
        const div = document.createElement("div")
        div.classList.add("expense-info")

        //Cria o strong para adicionar o nome da despesa
        const expenseName = document.createElement("strong") 
        const expenseCategory = document.createElement("span")

        //Adiciona o nome da despesa e a categoria
        expenseName.textContent = newExpense.expense
        expenseCategory.textContent = newExpense.category_name

        //Adiciona o nome da despesa e a categoria na div
        div.append(expenseName, expenseCategory)

        //Cria o span para adicionar o valor da despesa
        const expenseValue = document.createElement("span")
        expenseValue.classList.add("expense-amount")
        expenseValue.innerHTML = `<small>R$</small>${newExpense.amount.toUpperCase().replace("R$", "")}`

        //Cria o icone de remover
        const removeIcon = document.createElement("img")
        removeIcon.classList.add("remove-icon")
        removeIcon.setAttribute("src", "./img/remove.svg")
        removeIcon.setAttribute("alt", "remover")
        
        //Adiciona os elementos na li
        li.append(icon, div, expenseValue, removeIcon)


        //Adiciona a li na ul
        ul.append(li)
        
        //Adiciona o evento de clique para remover o item
        removeIcon.onclick = () => {
            try {
                const li = removeIcon.closest("li")
                li.remove()
                
                //Atualiza o total após remover o item
                updateTotal()
            } catch (error) {
                alert("Não foi possível remover a despesa")
                console.log(error)
            }
        }
        
        //Atualiza o valor total
        updateTotal()
        
    } catch (error) {
        alert("Não for possivel atualizar a lista de despesas")
        console.log(error)
    }
}

//Calcular o valor total das despesas
function updateTotal(){
    try {
        const items = ul.children

        expenseQuantity.textContent = `${items.length} ${items.length > 1 ? "despesas" : "despesa"}`

        //Variável para incrementa o total
        let total = 0

        //percorre os itens da lista
        for (let i = 0; i < items.length; i++) {
            const itemAmount = items[i].querySelector(".expense-amount")

            // Extrair apenas os números e vírgula do texto
            let value = itemAmount.textContent.replace(/[^0-9,]/g, "").replace(",", ".")

            //Transformar o valor em centavos
            
            value = parseFloat(value)

            //Verificar se o valor é um número
            if(isNaN(value)){
                return alert("Não for possivel atualizar o valor total")
            }

            total += Number(value)    
        }

        // Formatar o total como moeda brasileira
        const symbol = document.createElement("small")
        symbol.textContent = "R$"

        //Transformar o valor em centavos
        total = formatCurrencyBRL(total).toUpperCase().replace("R$", "")
        
        //Remover o conteúdo do elemento expensesTotal
        expensesTotal.innerHTML = ""

        //Adicionar o símbolo e o valor total ao expensesTotal
        expensesTotal.append(symbol, total)

    } catch (error) {
        alert("Não for possivel atualizar o valor total")
        console.log(error)
    }
}
