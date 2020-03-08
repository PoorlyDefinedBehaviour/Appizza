import { readdirSync } from "fs"
import { join } from "path"

export default function loadEntities() {
  const path: string = join(__dirname, "..", "Entities")

  return readdirSync(path).map((name) => require(join(path, name)).default)
}
