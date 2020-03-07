import { readdirSync } from "fs"
import { join } from "path"

export default function loadResolvers() {
  const path: string = join(__dirname, "..", "resolvers")
  return readdirSync(path).map((name) => require(join(path, name)))
}
