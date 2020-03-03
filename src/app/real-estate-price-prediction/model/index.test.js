import { linearRegression, train, test } from "./index"

test("create linear regression model", () => {
  let model = linearRegression()

  expect(model).toBeDefined()
})
