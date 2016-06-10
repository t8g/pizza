import { toppings as authorizedToppings } from './toppings.js'

export class Pizza {

  constructor ({ name = 'new pizza', id = null, toppings = [], status = 0 } = {}) {
    if (id) this.id = id
    this.name = name
    this.toppings = toppings
    this.status = status // 0 === crue, 1 === en cours de cuisson, 2 === cuite
  }

  setName (name) {
    this.name = name
  }

  addTopping (topping) {
    // only authorized toppings
    if (Object.keys(authorizedToppings).indexOf(topping) === -1) return this

    // 2 identical toppings max
    if (this.toppings.filter(t => t === topping).length > 1) return this

    this.toppings.push(topping)

    return this
  }

  removeTopping (topping) {
    const pos = this.toppings.indexOf(topping)
    if (pos !== -1) {
      this.toppings.splice(pos, 1)
    }
    return this
  }

  cook (time = 1000) {
    return new Promise((resolve, reject) => {
      if (this.status === 1) return reject('Pizza en cours de cuisson')
      if (this.status === 2) return reject('Pizza déjà cuite')

      this.status = 1
      setTimeout(() => {
        this.status = 2
        resolve(this)
      }, time)
    })
  }

  translate (topping, lang = 'en') {
    return authorizedToppings[topping][lang] || topping
  }

  toppings2string (lang = 'en') {
    return this.toppings

      // uniqs
      .reduce((acc, topping) => {
        if (acc.indexOf(topping) === -1) acc.push(topping)
        return acc
      }, [])

      // topping (translated (nb))
      .map(topping => {
        const size = this.toppings.filter(item => item === topping).length
        if (size > 1) return `${this.translate(topping, lang)} x${size}`
        return `${this.translate(topping, lang)}`
      })
      .join(', ')
  }

  toHtml () {
    return `
      <tr>
        <td><a data-id="${this.id}" class="selectPizza">${this.name}</a></td>
        <td>${this.toppings2string()}</td>
        <td>${this.status}</td>
        <td><button data-id="${this.id}" type="button" class="close deletePizza"><span>&times;</span></button></td>
      </tr>
    `
  }

  allToppingsToHtml () {
    return `
      <ul class="list-group">
      ${Object.keys(authorizedToppings)
        .map(topping => `
          <li data-topping="${topping}" draggable="true" class="topping list-group-item" style="cursor:move">${this.translate(topping)}</li>
        `).join('')}
      </ul>`
  }

}
