import { data, Names as FileNames } from "./file"
import shuffle from "./shuffle"

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

export default fromFile
