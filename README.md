# Quantified Self

Welcome to greatest calorie tracking application on the web!

View the front end live [HERE](https://benja-ross.github.io/quantified-self/)!

View the back end API documentation via Heroku [HERE](https://lit-basin-44778.herokuapp.com/)!

View the back end GitHub repo [HERE](https://github.com/Benja-Ross/node-quantified-self-api!)

# How Does It Work?

With an existing database of delicious foods to choose from on the home page, click the checkbox under "SELECT" and add the food to a meal of your choice.

![foods table](https://github.com/rwilhel/bootstrap_tutorial/blob/master/QS-markdown-1.png)

Remove a food from a meal by clicking the trash can icon.

![trash can icons](https://github.com/rwilhel/bootstrap_tutorial/blob/master/QS-markdown-2.png)

Check out those calorie adjustments--no reloading needed!

While still on the home page, you can filter foods in the database by name, eliminating all other foods from the table.

![create new foods button](https://github.com/rwilhel/bootstrap_tutorial/blob/master/QS-markdown-3.png)

Not enough foods to choose from? Click CREATE NEW FOODS to navigate to the food management page:

![food management page](https://github.com/rwilhel/bootstrap_tutorial/blob/master/QS-markdown-4.png)

From here, you can create a new food to post to the database. Foods MUST have both a name and calorie amount to be added. You can also search for foods by name here as well and view foods sorted by calories.

## Install and Run Locally

Clone the front end and back end:

```shell
git clone git@github.com:Benja-Ross/quantified-self.git
git clone git@github.com:Benja-Ross/node-quantified-self-api.git
```

Set up the back end:

```shell
$ cd node-quantified-self-api
$ npm install
$ knex migrate:latest
$ knex seed:run
$ npm start
```

Set up the front end:

```shell
$ cd quantified-self
$ npm install
$ npm start
```

Open the link on localhost:

```
http://localhost:8080/webpack-dev-server/
```
