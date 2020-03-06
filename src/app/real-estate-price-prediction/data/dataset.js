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

export const fromFile = () => {
  let trainFeatures = data(FileNames.TrainFeatures)
  let trainTarget = data(FileNames.TrainTarget)
  let testFeatures = data(FileNames.TestFeatures)
  let testTarget = data(FileNames.TestTarget)
  return from({
    trainFeatures,
    trainTarget,
    testFeatures,
    testTarget
  })
}
