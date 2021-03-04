import express from 'express'
import MockTodoDB from './todos.json'

const api = express()
const DELAY = 200 // ms
const sleep = (ms) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(), ms || DELAY);
  })
}
api.get('/todos', async (req, res)  => {
  await sleep(DELAY);
  res.status(200).json(MockTodoDB)
  console.log(`[SERVER][/todos] respond`)
})

api.get('/todos/:id', async (req, res) => {
  await sleep(DELAY);
  const todo = MockTodoDB.find(item => item.id == req.params.id)
  if (todo) {
    res.status(200).json(todo)
  } else {
    res.status(404).json({})
  }
  console.log(`[SERVER][/todo/${req.params.id}] respond`)
})

export default {
  path: '/api',
  handler: api
}