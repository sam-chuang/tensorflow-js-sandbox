import * as tf from "@tensorflow/tfjs-node"
import { linearRegression, train } from "./index"
import getDataset from "../data/dataset"

let Second = 1000
jest.setTimeout(60 * Second)

test("linear regression model", async () => {
  let dataset = await getDataset()

  let numberOfFeatures = dataset.numberOfFeatures()
  let model = linearRegression(numberOfFeatures)
  expect(model).toBeDefined()

  let history = await train({
    model,
    tensors: {
      trainFeatures: dataset.trainFeatures,
      trainTarget: dataset.trainTarget
    }
  })

  expect(history).toBeDefined()

  //TODO: get last val_loss from history
  //TODO: get last loss from history
  //TODO: compare with baseline
})
