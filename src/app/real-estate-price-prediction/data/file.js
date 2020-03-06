import fs from "fs-extra"
import { csv as parseCSV } from "./parse"
import pathOf from "../../../file/path"

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

export const data = name => {
  let path = pathOf(name)
  let contents = fs.readFileSync(path)
  return parseCSV(contents)
}
