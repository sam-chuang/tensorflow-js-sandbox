import Papa from "papaparse"
import shuffle from "./shuffle"
import { csv as parseCSV } from "./parse"
import { Names as FileNames } from "./file"

const BASE_URL =
  "https://storage.googleapis.com/tfjs-examples/multivariate-linear-regression/data/"

export const dataset = async () => {
  let [
    trainFeatures,
    trainTarget,
    testFeatures,
    testTarget
  ] = await Promise.all([
    fetch(FileNames.TrainFeatures),
    fetch(FileNames.TrainTarget),
    fetch(FileNames.TestFeatures),
    fetch(FileNames.TestTarget)
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

const fetch = async filename => {
  return new Promise(resolve => {
    const url = `${BASE_URL}${filename}`

    console.log(`  * Downloading data from: ${url}`)
    Papa.parse(url, {
      download: true,
      header: true,
      complete: results => {
        resolve(parse(results["data"]))
      }
    })
  })
}

const parse = async data =>
  new Promise(resolve => {
    data = parseCSV(data)
    resolve(data)
  })
