const assert = require('chai').assert
const Meal = require("../../lib/models/meal")

describe('Meal', function() {
  context('when created', function () {
    it('is a meal', function () {
      const myMeal = new Meal({name: "Lunch", foods: []})
      assert.instanceOf(myMeal, Meal)
    })

    it('has an id', function () {
      const myMeal = new Meal({id: 1, name: "Lunch", foods: []})
      assert.deepEqual(myMeal.id, 1)
    })

    it('has a name', function () {
      const myMeal = new Meal({name: "Lunch", foods: []})
      assert.deepEqual(myMeal.name, "Lunch")
    })

    it('has foods', function () {
      const myMeal = new Meal({name: "Lunch", foods: []})
      assert.deepEqual(myMeal.foods, [])
    })
  })
})
