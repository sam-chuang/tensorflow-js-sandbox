const row = record => {
  return Object.keys(record).map(key => parseFloat(record[key]))
}

export const csv = data => data.map(row)
