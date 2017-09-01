const $ = require('jquery')
const Meal = require("../models/meal")

$( document ).ready(function() {
  Meal.allMealsToHTML()
})

$('.add-to-meal .btn').on('click', Meal.addFoodstoMealTable);

$('.meal-table').on('click', '.trash-can', function(event) {
  event.preventDefault();

  var foodID = this.parentElement.parentElement.parentElement.childNodes[0].dataset.id
  var mealElement = this.parentElement.parentElement.parentElement.parentElement.parentElement
  var mealID = mealElement.dataset.id
  Meal.deleteFood(foodID, mealID)
  this.parentElement.parentElement.parentElement.remove()
  var mealTable = mealElement.id
  Meal.updateCalories(mealTable)
})

$('#search-name').keyup(filterFoods)

function filterFoods(){
  let filter = $('#search-name').val().toLowerCase()
  let foods = $('.food-name')
  for(var i = 0; i < foods.length; i++){
    let foodName = $(foods[i]).text()
    let matchedFilter = foodName.toLowerCase().indexOf(filter) > -1
    foods[i].parentElement.style.display = matchedFilter ? "" : "none"
  }
}
