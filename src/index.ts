import Fastify from 'fastify'
import userRoutes from './routes/userRoutes'
const app = Fastify()

app.register(userRoutes)

app.get('/', async (request, reply) => {
  return { message: 'Hello, Gympass API!' }
})

app.listen({ port: 3000, host: "0.0.0.0"}, (err, address) => {
    if(err){
      console.log(err)
      process.exit(1)
    }
    console.log(`Server listening at ${address}`)
})
