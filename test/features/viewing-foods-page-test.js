const assert = require('chai').assert
const webdriver = require('selenium-webdriver')
const until = webdriver.until
const test = require('selenium-webdriver/testing')
const frontEndLocation = "http://localhost:8080/foods.html"

test.describe('Our test bundle', function() {
	it('works', function() {
		assert(true)
	})
})

test.describe('Testing Foods Page', function() {
	var driver
	this.timeout(10000)

	test.beforeEach(function () {
		driver = new webdriver.Builder()
		.forBrowser('chrome')
		.build()
	})

	test.afterEach(function () {
		driver.quit()
	})

	test.it("lists all foods from database on load", function() {
		driver.get(`${frontEndLocation}`)
		driver.wait(until.elementLocated({css: '.food-name'}))
		driver.findElements({css: '.food-name'})
		.then(function(foods) {
      foods.forEach(function(food) {
        assert(food.isDisplayed())
      })
		})
	})

	test.it("adds a new food to the foods table", function() {
		driver.get(`${frontEndLocation}`)
		driver.wait(until.elementLocated({css: '.add-food-button'}))
		driver.findElements({css: '.food-name'})
			.then(function(foods) {
				initialFoodCount = foods.length
				driver.findElement({css: 'input[name="food-name"]'}).sendKeys('Chocolate Ice Cream Cone')
				driver.findElement({css: 'input[name="food-calories"]'}).sendKeys('173')
				driver.findElement({css: '.add-food-button'}).click()
				driver.sleep(1000)
			})
			.then(function() {
				driver.findElements({css: '.foods-table'})
				.then(function(foods) {
					assert.lengthOf(foods, initialFoodCount + 1)
				})
			})
	})

	// test.it("can delete a food", function() {
	// 	driver.get(`${frontEndLocation}`)
	// 	driver.wait(until.elementLocated({css: '.food-name'}))
	// 	driver.findElement({css: '.trash-can'}).click()
	// 	driver.findElements({css: '.food-name'})
	// 		.then(function(foods) {
	// 			assert.lengthOf(foods, initialFoodCount)
	// 		})
	// })
})
