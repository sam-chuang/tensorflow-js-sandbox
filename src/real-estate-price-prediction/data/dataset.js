import { data, Names as FileNames } from "./file"
import shuffle from "./shuffle"
import * as tf from "@tensorflow/tfjs-node"
import { normalize, meanAndStandardDeviation } from "./normalize"

export const from = ({
  trainFeatures = [],
  trainTarget = [],
  testFeatures = [],
  testTarget = []
} = {}) => {
  shuffle(trainFeatures, trainTarget)
  shuffle(testFeatures, testTarget)

  return {
    trainFeatures,
    trainTarget,
    testFeatures,
    testTarget,
    numberOfFeatures: () => {
      let features = trainFeatures[0]
      return features.length
    }
  }
}

export const fromFile = async () => {
  let [
    trainFeatures,
    trainTarget,
    testFeatures,
    testTarget
  ] = await Promise.all([
    data(FileNames.TrainFeatures),
    data(FileNames.TrainTarget),
    data(FileNames.TestFeatures),
    data(FileNames.TestTarget)
  ])

  return from({
    trainFeatures,
    trainTarget,
    testFeatures,
    testTarget
  })
}

const toTensors = dataset => {
  let {
    trainFeatures: rawTrainFeatures,
    trainTarget: rawTrainTarget,
    testFeatures: rawTestFeatures,
    testTarget: rawTestTarget
  } = dataset

  let trainFeatures = tf.tensor2d(rawTrainFeatures)
  let { dataMean, dataStd } = meanAndStandardDeviation(trainFeatures)

  let trainTarget = tf.tensor2d(rawTrainTarget)
  let testFeatures = tf.tensor2d(rawTestFeatures)
  let testTarget = tf.tensor2d(rawTestTarget)

  return {
    ...dataset,
    raw: dataset,
    trainFeatures: normalize(trainFeatures, dataMean, dataStd),
    trainTarget,
    testFeatures: normalize(testFeatures, dataMean, dataStd),
    testTarget
  }
}

export default async () => {
  let dataset = await fromFile()
  return toTensors(dataset)
}
