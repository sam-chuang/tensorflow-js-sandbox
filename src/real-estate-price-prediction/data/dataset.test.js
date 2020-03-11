import getDataset, { fromFile as getDatasetFromFile } from "./dataset"

test("dataset from file", async () => {
  let dataset = await getDatasetFromFile()
  let { trainFeatures, trainTarget, testFeatures, testTarget } = dataset

  expect(trainFeatures)
    .toBeArray()
    .not.toBeEmpty()

  expect(trainTarget)
    .toBeArray()
    .not.toBeEmpty()

  expect(testFeatures)
    .toBeArray()
    .not.toBeEmpty()

  expect(testTarget)
    .toBeArray()
    .not.toBeEmpty()

  let [features] = trainFeatures
  expect(features).toBeArray()
  expect(dataset.numberOfFeatures())
    .toBe(features.length)
    .toBePositive()
})

test("tensors dataset", async () => {
  let dataset = await getDataset()
  let numberOfFeatures = dataset.numberOfFeatures()
  expect(numberOfFeatures).toBePositive()

  let { trainFeatures, trainTarget, testFeatures, testTarget } = dataset
  expect(trainFeatures).toBeDefined()

  expect(trainTarget).toBeDefined()

  expect(testFeatures).toBeDefined()

  expect(testTarget).toBeDefined()
})
