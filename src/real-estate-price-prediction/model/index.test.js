import { linearRegression, train } from "./index"
import getDataset from "../data/dataset"

test("train model", async () => {
  let dataset = getDataset()
  let numberOfFeatures = dataset.numberOfFeatures()
  let model = model.linearRegression(numberOfFeatures)

  let history = await train(model)
  expect(history).toBeDefined()
})
