import { readdirSync } from "fs"
import { join } from "path"

export default function loadResolvers() {
  const path: string = join(__dirname, "..", "Resolvers")

  return readdirSync(path).map((name) => require(join(path, name)).default)
}
