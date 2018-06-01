const setPagination = (arr, pagination) => {
  const total = arr.length
  const start = pagination.size * (pagination.current - 1)
  const end = pagination.size * pagination.current - 1
  const list = arr.slice(start, end)
  console.log(list)

  return {
    list,
    total
  }
}

export default setPagination
