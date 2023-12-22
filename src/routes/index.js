import express from "express";
import books from "./books.js";
import authors from "./authors.js";
import users from "./users.js"
import auth from "./auth.js"
const routes = (app) => {
  app.route('/').get((req, res) => {
    res.status(200).send({ titulo: "WellCome to Bibliotech!" })
  })
  app.use(
    express.json(),
    books,
    authors,
    users,
    auth
  )
}

export default routes