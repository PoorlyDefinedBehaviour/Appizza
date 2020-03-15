import startServer from "./Server"

async function main(): Promise<void> {
  const { port } = await startServer()
  console.log(`Listening on PORT => ${port} 🚀`)
}
main()
