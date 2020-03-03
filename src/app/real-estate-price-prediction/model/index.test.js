import * as model from "./index"

test("create linear regression model", () => {
  let numberOfFeatures = 12
  let model = model.linearRegression(numberOfFeatures)

  expect(model).toBeDefined()
})
