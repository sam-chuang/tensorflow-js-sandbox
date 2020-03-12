import * as tf from "@tensorflow/tfjs-node"

const LearningRate = 0.01
const NUM_EPOCHS = 200
const BATCH_SIZE = 40

const NoMessage = 0

export const train = async (
  { model, tensors },
  { optimizer, loss = "meanSquaredError", metrics, callbacks } = {}
) => {
  model.compile({
    optimizer: optimizer ?? tf.train.sgd(LearningRate),
    loss,
    metrics
  })

  return await model.fit(tensors.trainFeatures, tensors.trainTarget, {
    batchSize: BATCH_SIZE,
    epochs: NUM_EPOCHS,
    validationSplit: 0.2,
    callbacks,
    verbose: NoMessage
  })
}

export const linearRegression = numberOfFeatures => {
  const model = tf.sequential()
  model.add(tf.layers.dense({ inputShape: [numberOfFeatures], units: 1 }))
  return model
}

export const nonlinearTwoLayerRegression = numberOfFeatures => {
  const model = tf.sequential()
  model.add(
    tf.layers.dense({
      inputShape: [numberOfFeatures],
      units: 50,
      activation: "sigmoid",
      kernelInitializer: "leCunNormal"
    })
  )
  model.add(tf.layers.dense({ units: 1 }))
  return model
}

export const nonlinearMultiLayerRegression = numberOfFeatures => {
  const model = tf.sequential()
  model.add(
    tf.layers.dense({
      inputShape: [numberOfFeatures],
      units: 50,
      activation: "sigmoid",
      kernelInitializer: "leCunNormal"
    })
  )
  model.add(
    tf.layers.dense({
      units: 50,
      activation: "sigmoid",
      kernelInitializer: "leCunNormal"
    })
  )
  model.add(tf.layers.dense({ units: 1 }))
  return model
}
