import Dataset from "./dataset"

test("dataset", async () => {
  let dataset = await Dataset()
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
