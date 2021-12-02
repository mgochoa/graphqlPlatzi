'use strict'

const connectDB = require('./db')
const { ObjectId } = require('mongodb')
const errorHandler = require('./errorHandler')

module.exports = {
  Courses: async () => {
    let db
    let courses = []
    try {
      db = await connectDB()
      courses = await db.collection('Courses').find().toArray()
    } catch (error) {
      errorHandler(error)
    }
    return courses
  },
  Course: async (root, { id }) => {
    let db
    let course = {}
    try {
      db = await connectDB()
      course = await db.collection('Courses').findOne({ _id: ObjectId(id) })
    } catch (error) {

    }
    return course
  },
  People: async () => {
    let db
    let students = []
    try {
      db = await connectDB()
      students = await db.collection('Students').find().toArray()
    } catch (error) {
      errorHandler(error)
    }
    return students
  },
  Person: async (root, { id }) => {
    let db
    let student
    try {
      db = await connectDB()
      student = await db.collection('Students').findOne({ _id: ObjectId(id) })
    } catch (error) {
      errorHandler(error)
    }
    return student
  },
  searchItems: async (root, { keyword }) => {
    let db
    let items
    let courses
    let people

    try {
      db = await connectDB()
      courses = await db.collection('Courses').find(
        { $text: { $search: keyword } }
      ).toArray()
      people = await db.collection('Students').find(
        { $text: { $search: keyword } }
      ).toArray()
      items = [...courses, ...people]
    } catch (error) {
      errorHandler(error)
    }
    return items
  }
}
