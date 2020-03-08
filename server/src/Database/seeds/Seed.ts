import { createConnection } from "typeorm"
import { getConnectionOptions } from "typeorm"
import { join } from "path"
import { readdir } from "fs"
import { promisify } from "util"

async function seed(): Promise<void> {
  const connectionOptions = await getConnectionOptions(
    process.env.NODE_ENV || "dev"
  )
  await createConnection({ ...connectionOptions, name: "default" })

  const files = await promisify(readdir)(__dirname)

  const seeders = await Promise.all(
    files
      .filter((name) => !/Seed.ts/.test(name))
      .map((name) => import(join(__dirname, name)))
  )

  seeders.forEach((seeder) => seeder.default())
}
seed()
process.exit()