import fs from "fs-extra"
import { normalize, resolve } from "path"
//import { csv as parseCSV } from "./parse"
import parseCSV from "neat-csv"
import { csv as formatCSV } from "./parse"

const TrainFeatures = "train-data.csv"

const TrainTarget = "train-target.csv"

const TestFeatures = "test-data.csv"

const TestTarget = "test-target.csv"

export const Names = {
  TrainFeatures,
  TrainTarget,
  TestFeatures,
  TestTarget
}

export const data = async name => {
  let path = resolve(__dirname, name)
  let stream = fs.createReadStream(path, "utf8")
  return parseCSV(stream).then(formatCSV)
}
