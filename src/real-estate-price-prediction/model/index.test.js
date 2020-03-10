import * as tf from "@tensorflow/tfjs-node"
import { linearRegression, train } from "./index"
import getDataset from "../data/dataset"

test("linear regression model", async () => {
  let dataset = await getDataset()

  let numberOfFeatures = dataset.numberOfFeatures()
  let model = linearRegression(numberOfFeatures)
  expect(model).toBeDefined()

  let history = await train({
    model,
    tensors: {
      trainFeatures: tf.tensor2d(dataset.trainFeatures),
      trainTarget: tf.tensor2d(dataset.trainTarget)
    }
  })
  expect(history).toBeDefined()
})
