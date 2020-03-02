import Papa from "papaparse"

const BASE_URL =
  "https://storage.googleapis.com/tfjs-examples/multivariate-linear-regression/data/"

const TRAIN_FEATURES_FN = "train-data.csv"
const TRAIN_TARGET_FN = "train-target.csv"
const TEST_FEATURES_FN = "test-data.csv"
const TEST_TARGET_FN = "test-target.csv"

//TODO: load from local cache first
export const dataset = async () => {
  let [
    trainFeatures,
    trainTarget,
    testFeatures,
    testTarget
  ] = await Promise.all([
    fetch(TRAIN_FEATURES_FN),
    fetch(TRAIN_TARGET_FN),
    fetch(TEST_FEATURES_FN),
    fetch(TEST_TARGET_FN)
  ])

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

/**
 * Shuffles data and target (maintaining alignment) using Fisher-Yates
 * algorithm.flab
 */
function shuffle(data, target) {
  let counter = data.length
  let temp = 0
  let index = 0
  while (counter > 0) {
    index = (Math.random() * counter) | 0
    counter--
    // data:
    temp = data[counter]
    data[counter] = data[index]
    data[index] = temp
    // target:
    temp = target[counter]
    target[counter] = target[index]
    target[index] = temp
  }
}

const fetch = async filename => {
  return new Promise(resolve => {
    const url = `${BASE_URL}${filename}`

    console.log(`  * Downloading data from: ${url}`)
    Papa.parse(url, {
      download: true,
      header: true,
      complete: results => {
        resolve(parseCsv(results["data"]))
      }
    })
  })
}

const parseCsv = async data => {
  return new Promise(resolve => {
    data = data.map(row => {
      return Object.keys(row).map(key => parseFloat(row[key]))
    })
    resolve(data)
  })
}
