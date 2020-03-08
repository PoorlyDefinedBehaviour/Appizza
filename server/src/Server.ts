import "reflect-metadata"
import load from "process-env-loader"
load()
import express from "express"
import cors from "cors"
import { createConnection, getConnectionOptions } from "typeorm"
import { ApolloServer } from "apollo-server-express"
import { buildSchema } from "type-graphql"
import { Server } from "http"

import loadResolvers from "@Utils/LoadResolvers"
import loadEntities from "@Utils/LoadEntities"

interface ServerStartResult {
  server: Server
  port: number | string
}

export default async function startServer(): Promise<ServerStartResult> {
  const isProductionEnv = /prod/gi.test(process.env.NODE_ENV!)

  const app = express()
  app.use(express.json())
  app.use(cors())

  const connectionOptions = await getConnectionOptions(
    process.env.NODE_ENV || "dev"
  )
  await createConnection({
    ...connectionOptions,
    name: "default",
    entities: loadEntities()
  })

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: loadResolvers()
    }),
    context: (ctx) => ctx,
    debug: !isProductionEnv,
    playground: !isProductionEnv
  })

  apolloServer.applyMiddleware({ app, cors: false })

  const port = process.env.PORT || 8080
  return { server: app.listen(port, () => {}), port }
}
