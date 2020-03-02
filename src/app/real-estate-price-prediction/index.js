import * as tf from "@tensorflow/tfjs"
import * as tfvis from "@tensorflow/tfjs-vis"
import { linearRegression } from "./model"

let model = linearRegression()

//hyperparameters for model training.
const NUM_EPOCHS = 200
const BATCH_SIZE = 40
const LearningRate = 0.01

model.compile({
  optimizer: tf.train.sgd(LearningRate),
  loss: "meanSquaredError"
})

let trainLoss
let valLoss
await model.fit(tensors.trainFeatures, tensors.trainTarget, {
  batchSize: BATCH_SIZE,
  epochs: NUM_EPOCHS,
  callbacks: {
    onEpochEnd: async (epoch, logs) => {
      //TODO
      await ui.updateStatus(`Epoch ${epoch + 1} of ${NUM_EPOCHS} completed.`)

      trainLoss = logs.loss
      valLoss = logs.val_loss

      //TODO
      await ui.plotData(epoch, trainLoss, valLoss)
    }
  }
})

//TODO
await ui.updateStatus("Running on test data...")

const result = model.evaluate(tensors.testFeatures, tensors.testTarget, {
  batchSize: BATCH_SIZE
})
const testLoss = result.dataSync()[0]
await ui.updateStatus(
  `Final train-set loss: ${trainLoss.toFixed(4)}\n` +
    `Final validation-set loss: ${valLoss.toFixed(4)}\n` +
    `Test-set loss: ${testLoss.toFixed(4)}`
)
