import * as tf from "@tensorflow/tfjs"

//TODO inputShape instead of numberOfFeatures param?
export const linearRegression = numberOfFeatures => {
  const model = tf.sequential()
  model.add(tf.layers.dense({ inputShape: [numberOfFeatures], units: 1 }))
  return model
}

export default {
  linearRegression
}
