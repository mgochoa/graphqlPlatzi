'use strict'
const { MongoClient } = require('mongodb')
const {
  DB_HOST,
  DB_NAME
} = process.env

let connection

const connectDB = async () => {
  if (connection) return connection
  try {
    const client = new MongoClient(DB_HOST)
    await client.connect()
    connection = client.db(DB_NAME)
  } catch (error) {
    console.error('Could not connect to db', DB_HOST, error)
    process.exit(1)
  }
  return connection
}

module.exports = connectDB
