import express from "express";
import authors from "./authors/authors.js"
import publishers from "./publisher/publishers.js"
import books from "./books/books.js"
import purchases from "./purchases/purchase.js"
import clientsAuth from "./auth/user.auth.js"
import authorsAuth from "./auth/authors.js"
import publishersAuth from "./auth/publisher.js"
import clients from "./clients/clients.js"
  
const routes = (app) => {
  app.route('/').get((req, res) => {
    res.status(200).send({ titulo: "WellCome to Bibliotech!" })
  })
  app.use(
    express.json(),
    clientsAuth,
    authorsAuth,
    publishersAuth,
    authors,
    publishers,
    books,
    purchases,
    clients
  )
}

export default routes