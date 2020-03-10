import * as tf from "@tensorflow/tfjs-node"

const LearningRate = 0.01
const NUM_EPOCHS = 200
const BATCH_SIZE = 40

//TODO
export const train = async ({ model, tensors }, {} = {}) => {
  model.compile({
    optimizer: tf.train.sgd(LearningRate),
    loss: "meanSquaredError"
  })

  //TODO: check tensors trainFeatures and trainTarget
  await model.fit(tensors.trainFeatures, tensors.trainTarget, {
    batchSize: BATCH_SIZE,
    epochs: NUM_EPOCHS,
    validationSplit: 0.2,
    callbacks: {
      onEpochEnd: async (epoch, logs) => {
        //TODO:
        //onEpochEnd(epoch, logs)
        console.log(`Epoch ${epoch + 1} of ${NUM_EPOCHS} completed.`)

        //TODO?
        /*
        if (weightsIllustration) {
          model.layers[0]
            .getWeights()[0]
            .data()
            .then(kernelAsArr => {
              const weightsList = describeKernelElements(kernelAsArr)
              ui.updateWeightDescription(weightsList)
            })
        }
        */
      }
    }
  })
}

//TODO
export const test = () => {}

//TODO inputShape instead of numberOfFeatures param?
export const linearRegression = numberOfFeatures => {
  const model = tf.sequential()
  model.add(tf.layers.dense({ inputShape: [numberOfFeatures], units: 1 }))
  return model
}
