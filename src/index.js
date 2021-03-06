import { Pizza } from './pizza.js'
import { PizzaList } from './pizza-list.js'

var pizzaList = new PizzaList()
var pizza = null

var pizzaArea = document.getElementById('pizzaToppings')
var pizzaName = document.getElementById('pizzaName')
var savePizza = document.getElementById('savePizza')
var newPizza = document.getElementById('newPizza')
var cookPizzas = document.getElementById('cookPizzas')
const container = document.getElementById('container')

document.getElementById('toppings').innerHTML = new Pizza().allToppingsToHtml()
Array.prototype.slice.call(document.getElementsByClassName('topping'))
  .forEach(li => {
    li.addEventListener('dragstart', evt => {
      evt.dataTransfer.setData('text/html', li.dataset.topping)
    }, false)
  })

pizzaArea.addEventListener('dragenter', evt => {
  evt.preventDefault()
  evt.target.style.backgroundColor = 'red'
}, false)

pizzaArea.addEventListener('dragover', evt => {
  evt.preventDefault()
}, false)

pizzaArea.addEventListener('dragleave', evt => {
  evt.preventDefault()
  evt.target.style.backgroundColor = '#f5f5f5'
}, false)

pizzaArea.addEventListener('drop', evt => {
  evt.preventDefault()
  pizza.addTopping(evt.dataTransfer.getData('text/html'))
  evt.target.style.backgroundColor = '#f5f5f5'
  drawPizza()
}, false)

savePizza.addEventListener('click', evt => {
  if (!pizza) return
  pizza.setName(pizzaName.value)
  pizzaList.savePizza(pizza)
  drawPizzaList()
  pizza = null
  container.style.display = 'none'
  container.style.visibility = 'hidden'
  pizzaName.value = ''
}, false)

newPizza.addEventListener('click', evt => {
  pizza = new Pizza({ name: 'autre pizza' })
  container.style.display = 'block'
  container.style.visibility = 'visible'
  drawPizza()
})

cookPizzas.addEventListener('click', evt => {
  pizzaList.cookAll(drawPizzaList)
})

function drawPizza () {
  if (!pizza) {
    pizzaArea.innerHTML = 'NO PIZZA SELECTED'
    pizzaName.value = ''
    return
  }
  pizzaArea.innerHTML = pizza.toppings2string()
}
drawPizza()

function drawPizzaList () {
  pizzaList.toHtml()
    .then(html => {
      document.getElementById('pizzas').innerHTML = html
      // astuce pour utiliser un NodeList comme un tableau
      Array.prototype.slice.call(document.getElementsByClassName('deletePizza'))
        .forEach(button => {
          button.addEventListener('click', evt => {
            pizzaList.deletePizza(button.dataset.id)
              .then(drawPizzaList)
          }, false)
        })

      Array.prototype.slice.call(document.getElementsByClassName('selectPizza'))
        .forEach(button => {
          button.addEventListener('click', evt => {
            pizzaList.getPizza(button.dataset.id)
              .then(json => {
                pizza = new Pizza(json)
                pizzaName.value = pizza.name
                container.style.display = 'block'
                container.style.visibility = 'visible'
                drawPizza()
              }, false)
          })
        })

      Array.prototype.slice.call(document.getElementsByClassName('cookPizza'))
              .forEach(button => {
                button.addEventListener('click', function (evt) {
                  pizzaList.getPizza(button.dataset.id)
                    .then(json => {
                      new Pizza(json).cook().then(
                        (p) => {
                          // enregistrer la pizza
                          pizzaList.savePizza(p)
                          // mettre à jour l'affichage
                          drawPizzaList()
                        }
                      )
                    })
                }, false)
              })
    })
}

drawPizzaList()
