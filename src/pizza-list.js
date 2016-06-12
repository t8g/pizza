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

  updatePizza (pizza) {
    return this.db.pizzas.put(pizza)
  }

  savePizza (pizza) {
    if (!pizza.id) return this.addPizza(pizza)
    return this.updatePizza(pizza)
  }

  deletePizza (id) {
    return this.db.pizzas.delete(parseInt(id))
  }

  getPizzas () {
    return this.db.pizzas.toArray()
  }

  getPizza (id) {
    return this.db.pizzas.get(parseInt(id))
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
        <table class="table table-bordered">
          ${pizzaRows.join('')}
        </table>
      `)
  }

  cookAll (drawPizzaList) {
    this.getPizzas()
      .then(pizzas => {
        const pizza = pizzas.find(p => p.status === 0)

        if (pizza) {
          return new Pizza(pizza).cook()
            .then(pizza => {
              this.savePizza(pizza)
            })
        }

        throw Error('No more pizzas')
      })
      .then(pizza => {
        drawPizzaList()
        this.cookAll(drawPizzaList)
      })
      .catch(() => {
        console.log('fin de la cuisson')
      })
  }

}
