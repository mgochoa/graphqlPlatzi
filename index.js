'use strict'
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { graphqlHTTP } = require('express-graphql')
const { makeExecutableSchema } = require('graphql-tools')
const { readFileSync } = require('fs')
const { join } = require('path')
// The root provides a resolver function for each API endpoint
const app = express()
const port = process.env.PORT || 4000
const isDev = process.env.NODE_ENV ? process.env.NODE_ENV.trimRight() !== 'production' : true
// Construct a schema, using GraphQL schema language
const resolvers = require('./lib/resolvers')
const typeDefs = readFileSync(
  join(__dirname, 'lib', 'schema.graphql'),
  'utf-8'
)
const schema = makeExecutableSchema({ typeDefs, resolvers })

app.use(cors())

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: resolvers,
  graphiql: isDev
}))

app.listen(port, () => {
  console.log(`Running a GraphQL API server at http://localhost:${port}/graphql`)
})
