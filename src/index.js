import { Pizza } from './pizza.js'
import { PizzaList } from './pizza-list.js'
import { toppings } from './toppings.js'

// var pizzaList = new PizzaList()
var pizza = new Pizza({ name: 'autre pizza', toppings: ['eggs'] })

document.getElementById('toppings').innerHTML = pizza.allToppingsToHtml()
Array.prototype.slice.call(document.getElementsByClassName('topping'))
  .forEach(li => {
    li.addEventListener('dragstart', evt => {
      evt.dataTransfer.setData('text/html', li.dataset.topping)
    }, false)
  })

var pizzaArea = document.getElementById('pizza')

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

function drawPizza () {
  pizzaArea.innerHTML = pizza.toppings2string()
}
drawPizza()

// function drawPizzaList () {
//   pizzaList.toHtml()
//     .then(html => {
//       document.getElementById('pizzas').innerHTML = html
//       // astuce pour utiliser un NodeList comme un tableau
//       Array.prototype.slice.call(document.getElementsByClassName('deletePizza'))
//         .forEach(button => {
//           button.addEventListener('click', evt => {
//             pizzaList.deletePizza(button.dataset.id)
//               .then(drawPizzaList)
//           })
//         })
//     })
// }

// drawPizzaList()
