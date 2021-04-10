export const getGroups = (users) => {
  let maxAge = users[0].registered.age

  users.forEach((user, idx) => {
   const prevUser = users[idx - 1]
    if (user.registered.age > prevUser?.registered.age) {
      maxAge = user.registered.age
    }
  })
  const groups = []
  let start = 1
  let end = 10

  for (let i = 1; i <= Math.trunc(maxAge/10) + 1; i++) {
    groups.push(`${start} - ${end}`)
    start += 10
    end += 10
  }
  return groups
}
