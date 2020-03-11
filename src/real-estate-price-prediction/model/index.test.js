import { linearRegression, train } from "./index"
import getDataset from "../data/dataset"

let Second = 1000
jest.setTimeout(60 * Second)

test("linear regression model", async () => {
  let dataset = await getDataset()

  let numberOfFeatures = dataset.numberOfFeatures()
  let model = linearRegression(numberOfFeatures)
  expect(model).toBeDefined()

  let result = await train({
    model,
    tensors: {
      trainFeatures: dataset.trainFeatures,
      trainTarget: dataset.trainTarget
    }
  })

  expect(result).toBeDefined()

  let { history } = result
  expect(history).toBeDefined()

  let { loss, val_loss } = history
  expect(loss)
    .toBeArray()
    .not.toBeEmpty()

  expect(val_loss)
    .toBeArray()
    .not.toBeEmpty()

  let lastLoss = loss[loss.length - 1]
  let lastValLoss = val_loss[val_loss.length - 1]

  expect(lastLoss)
    .toBeNumber()
    .toBePositive()
    .toBeLessThan(dataset.baselineLoss)
  expect(lastValLoss)
    .toBeNumber()
    .toBePositive()
    .toBeLessThan(dataset.baselineLoss)
})
