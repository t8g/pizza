import Dexie from 'dexie'
import { Pizza } from './pizza'

export class PizzaList {
  constructor () {
    this.db = new Dexie('pizzeria')
    this.db.version(1).stores({
      pizzas: '++id, name'
    })
    this.db.open()
  }

  addPizza (pizza) {
    return this.db.pizzas.add(pizza)
  }

  deletePizza (id) {
    return this.db.pizzas.delete(parseInt(id))
  }

  getPizzas () {
    return this.db.pizzas.toArray()
  }

  // with (topping) {
  //   if (!topping) return this.getPizzas()
  //   return this.getPizzas()
  //     .then(pizzas => pizzas.filter(pizza => pizza.toppings.indexOf(topping) !== -1))
  // }

  toHtml () {
    return this.getPizzas()
      .then(pizzas => pizzas.map(json => new Pizza(json)))
      .then(pizzas => pizzas.map(pizza => pizza.toHtml()))
      .then(pizzaRows => `
        <table class="table">
          ${pizzaRows.join('')}
        </table>
      `)
  }

}
