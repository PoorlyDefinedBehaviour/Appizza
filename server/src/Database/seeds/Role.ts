import Role from "@Entities/Role"

export default async function run() {
  await Role.delete({})

  await Promise.all([
    Role.create({
      title: "Administrator",
      slug: "administrator",
      description: "All access role"
    }).save()
  ])
}
