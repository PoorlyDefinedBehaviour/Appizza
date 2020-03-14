import { createConnection } from "typeorm"
import { getConnectionOptions } from "typeorm"
import { join } from "path"
import { readdir } from "fs"
import { promisify } from "util"
import loadEntities from "@Utils/LoadEntities"

async function seed(): Promise<void> {
  const connectionOptions = await getConnectionOptions(
    process.env.NODE_ENV || "dev"
  )
  const connection = await createConnection({
    ...connectionOptions,
    entities: loadEntities(),
    name: "default"
  })

  const files = await promisify(readdir)(__dirname)

  const seeders = await Promise.all(
    files
      .filter((name) => !/Seed.ts/.test(name))
      .map((name) => import(join(__dirname, name)))
  )

  await Promise.all(seeders.map((seeder) => seeder.default()))

  await connection.close()
}
seed()
