import {
  linearRegression,
  nonlinearTwoLayerRegression,
  nonlinearMultiLayerRegression,
  train
} from "./index"
import getDataset from "../data/dataset"

let Second = 1000
jest.setTimeout(100 * Second)

test("linear regression model", async () => {
  let dataset = await getDataset()

  let numberOfFeatures = dataset.numberOfFeatures()
  let model = linearRegression(numberOfFeatures)
  expect(model).toBeDefined()

  let result = await train({
    model,
    tensors: dataset
  })

  expectHistory(result, "linear regression model", dataset)
})

test("non-linear two layer regression model", async () => {
  let dataset = await getDataset()

  let numberOfFeatures = dataset.numberOfFeatures()
  let model = nonlinearTwoLayerRegression(numberOfFeatures)
  expect(model).toBeDefined()

  let result = await train({
    model,
    tensors: dataset
  })

  expectHistory(result, "non-linear two layer regression model", dataset)
})

test("non-linear multi layer regression model", async () => {
  let dataset = await getDataset()

  let numberOfFeatures = dataset.numberOfFeatures()
  let model = nonlinearMultiLayerRegression(numberOfFeatures)
  expect(model).toBeDefined()

  let result = await train({
    model,
    tensors: dataset
  })

  expectHistory(result, "non-linear multi layer regression model", dataset)
})

const expectHistory = ({ history }, name = "", dataset) => {
  expect(history).toBeDefined()

  let { loss, val_loss } = history
  expect(loss)
    .toBeArray()
    .not.toBeEmpty()

  expect(val_loss)
    .toBeArray()
    .not.toBeEmpty()

  let lastLoss = loss[loss.length - 1]
  expect(lastLoss)
    .toBeNumber()
    .toBePositive()
    .toBeLessThan(dataset.baselineLoss)

  let lastValLoss = val_loss[val_loss.length - 1]
  expect(lastValLoss)
    .toBeNumber()
    .toBePositive()
    .toBeLessThan(dataset.baselineLoss)

  console.log(
    `${name} loss = ${lastLoss}, validation loss = ${lastValLoss}, baseline loss = ${dataset.baselineLoss}`
  )
}
