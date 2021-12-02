'use strict'

const { ObjectId } = require('mongodb')
const connectDB = require('./db')
const errorHandler = require('./errorHandler')

module.exports = {
  createCourse: async (root, { input }) => {
    const defaults = {
      teacher: '',
      topic: ''
    }
    const newCourse = Object.assign(defaults, input)
    let db
    let course
    try {
      db = await connectDB()
      course = await db.collection('Courses').insertOne(newCourse)
      newCourse._id = course.insertedId
    } catch (error) {
      errorHandler(error)
    }
    return newCourse
  },
  editCourse: async (root, { _id, input }) => {
    let db
    let course
    try {
      db = await connectDB()
      await db.collection('Courses').updateOne(
        { _id: ObjectId(_id) },
        { $set: input }
      )
      course = await db.collection('Courses').findOne(
        { _id: ObjectId(_id) }
      )
    } catch (error) {
      errorHandler(error)
    }
    return course
  },
  deleteCourse: async (root, { _id }) => {
    let db
    let info
    try {
      db = await connectDB()
      info = await db.collection('Courses').deleteOne(
        { _id: ObjectId(_id) }
      )
      return info.deletedCount
        ? `El curso con id ${_id} fue eliminado exitosamente.`
        : 'No existe el curso con el id indicado'
    } catch (error) {
      errorHandler(error)
    }
  },
  createPerson: async (root, { input }) => {
    let db
    let student
    try {
      db = await connectDB()
      student = await db.collection('Students').insertOne(input)
      input._id = student.insertedId
    } catch (error) {
      errorHandler(error)
    }
    return input
  },
  editPerson: async (root, { _id, input }) => {
    let db
    let student
    try {
      db = await connectDB()
      await db.collection('Students').updateOne(
        { _id: ObjectId(_id) },
        { $set: input }
      )
      student = await db.collection('Students').findOne(
        { _id: Object(_id) }
      )
    } catch (error) {
      errorHandler(error)
    }
    return student
  },
  deletePerson: async (root, { _id }) => {
    let db
    let info
    try {
      db = await connectDB()
      info = await db.collection('Students').deleteOne(
        { _id: ObjectId(_id) }
      )
      return info.deletedCount
        ? `El estudiante con id ${_id} fue eliminado exitosamente.`
        : 'No existe el estudiante con el id indicado'
    } catch (error) {
      errorHandler(error)
    }
  },
  addPeople: async (root, { courseID, personID }) => {
    let db
    let person
    let course
    try {
      db = await connectDB()
      course = await db.collection('Courses').findOne({ _id: ObjectId(courseID) })
      person = await db.collection('Students').findOne({ _id: ObjectId(personID) })
      if (!course || !person) throw new Error('La persona o el curso no existe')
      await db.collection('Courses').updateOne(
        { _id: ObjectId(courseID) },
        {
          $addToSet: {
            people: ObjectId(personID)
          }
        }
      )
      return course
    } catch (error) {
      errorHandler(error)
    }
  }
}
