var $ = require('jquery')
var state

function Food(food) {
  this.id = food.id;
  this.name = food.name;
  this.calories = food.calories;
}

Food.prototype.toHTML = function(page) {
  return `<tr class="food-row">` +
  `<td class="food-name" data-id="${this.id}" id="${this.id}" contenteditable="true">${this.name}</td>`+
  `<td class="food-calories" id="${this.id}" contenteditable="true">${this.calories}</td>`
  + eval(`this.${page}()`)
}

Food.prototype.index = function() {
  return `<td class="trash-can-space"><a><input type="image" src="public/trash-can.png" class="trash-can" id=${this.id} alt="a trash can"/></a></td></tr>`
}

Food.prototype.diary = function() {
  return `<td class="checkbox"><input class="checkbox" type="checkbox" id="checkbox ${this.id}"</td></tr>`
}

Food.delete = function(foodID) {
  return $.ajax({
    url: `https://lit-basin-44778.herokuapp.com/api/v1/foods/` + foodID,
    type: 'DELETE',
    dataType: "json",
    error: function(error) {
      alert("Cannot delete food")
    }
  }).done(function(response) {
    return response
  })
}

Food.removeFood = function(element) {
  $('.food-row').each(function() {
    if (this.firstChild.attributes['id'].value == element) {
      this.remove()
    }
  })
}

Food.allFoodsToHTML = function() {
  return this.getAllFoods()
  .then(function(foodList) {
    return foodList.map(function(food) {
      return new Food(food);
    }).sort(function(a, b) {
      return b.id - a.id;
    })
  })
  .then(function(foodList) {
    return foodList.map(function(food) {
      if($('.foods-table').length) {
        return food.toHTML('index');
      } else {
        return food.toHTML('diary');
      }
    })
  })
}

Food.getAllFoods = function() {
  return $.ajax({
    type: "GET",
    url: 'https://lit-basin-44778.herokuapp.com/api/v1/foods',
    dataType:"json",
  })
  .done(function(data) {
    return data;
  })
  .fail(function(error) {
    alert('Unable to request foods')
  })
}

Food.editFood = function(food) {
  return $.ajax({
    type: "PATCH",
    url: 'https://lit-basin-44778.herokuapp.com/api/v1/foods/' + food.id,
    dataType: "json",
    data: { food: food },
    error: function(error) {
      alert("Food could not be edited")
    }
  }).done(function(post) {
    return Food.updateMealsTables(post)
  })
}

Food.updateMealsTables = function(post) {
  const food = post
  var meals = ['breakfast', 'snacks', 'lunch', 'dinner']

  for (var i = 0; i < meals.length; i++) {
    Food.updateMealTable(meals[i], food)
  }
}

Food.updateMealTable = function(meal, food) {
  var foods = $(`.diary-table-${meal}`)[0].children[0].children
  for (var i = 0; i < foods.length; i++) {
    if (food.id == foods[i].children[0].id) {
      foods[i].children[0].innerText = food.name
      foods[i].children[1].innerText = food.calories
    }
  }
}

Food.sortCalories = function() {
  $('#foods-table tr').sort(function(a, b) {
    switch(order) {
      case 'asc':
        return Number($('td:nth-child(2)', a).text()) - Number($('td:nth-child(2)', b).text())
        break
      case 'desc':
        return Number($('td:nth-child(2)', b).text()) - Number($('td:nth-child(2)', a).text())
        break
      case 'original':
        return Number(b.id) - Number(a.id)
        break
    }
  }).appendTo('#foods-table')
}

module.exports = Food
