import { data, Names as FileNames } from "./file"

test("train-data.csv data", async () => {
  let records = await data(FileNames.TrainFeatures)

  expect(records).toBeArray()
  let [features] = records
  features.forEach(feature => expect(feature).toBeNumber())
})

test("train-target.csv data", async () => {
  let records = await data(FileNames.TrainTarget)

  expect(records).toBeArray()
  let [record] = records
  record.forEach(value => expect(value).toBePositive())
})

test("test-data.csv data", async () => {
  let records = await data(FileNames.TestFeatures)

  expect(records).toBeArray()
  let [record] = records
  record.forEach(value => expect(value).toBeNumber())
})

test("train-target.csv data", async () => {
  let records = await data(FileNames.TestTarget)

  expect(records).toBeArray()
  let [record] = records
  record.forEach(value => expect(value).toBePositive())
})
