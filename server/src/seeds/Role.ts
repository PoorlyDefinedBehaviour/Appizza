import Role from "@Entities/Role"

export default async function run() {
  await Promise.all([
    Role.create({
      title: "Administrator",
      slug: "administrator",
      description: "All access role"
    }),
    Role.create({
      title: "Client",
      slug: "client",
      description: "Basic functionality access role"
    })
  ])
}
