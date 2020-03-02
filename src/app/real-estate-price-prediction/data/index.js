import * as tf from "@tensorflow/tfjs"
import normalize from "../../../tensor/normalize"

export const load = () => {}

export const tensors = ({
  trainFeatures,
  trainTarget,
  testFeatures,
  testTarget
} = {}) => {
  let result = {}

  result.rawTrainFeatures = tf.tensor2d(trainFeatures)
  result.trainTarget = tf.tensor2d(trainTarget)
  result.rawTestFeatures = tf.tensor2d(testFeatures)
  result.testTarget = tf.tensor2d(testTarget)

  let { dataMean, dataStd } = normalize.meanAndStandardDeviation(
    result.rawTrainFeatures
  )

  result.trainFeatures = normalize.dataset(
    result.rawTrainFeatures,
    dataMean,
    dataStd
  )
  result.testFeatures = normalize.dataset(
    result.rawTestFeatures,
    dataMean,
    dataStd
  )

  return result
}

export const featureDescriptions = [
  "Crime rate",
  "Land zone size",
  "Industrial proportion",
  "Next to river",
  "Nitric oxide concentration",
  "Number of rooms per house",
  "Age of housing",
  "Distance to commute",
  "Distance to highway",
  "Tax rate",
  "School class size",
  "School drop-out rate"
]
