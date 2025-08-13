import userRoutes from './routes/user.routes'
import gymRoutes from './routes/gym.routes'
import Fastify, {FastifyRequest, FastifyReply} from "fastify"
const app = Fastify()

app.register(userRoutes)
app.register(gymRoutes)

app.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
  return { message: 'Hello, Gympass API again!' }
})

app.listen({ port: 3000, host: "0.0.0.0"}, (err, address) => {
  if(err){
    console.log(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
 