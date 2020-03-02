/**
 * Calculates the mean and standard deviation of each column of an array.
 *
 * @param {Tensor2d} data Dataset from which to calculate the mean and
 * std of each column independently.
 *
 * @returns {Object} Contains the mean and std of each vector
 * column as 1d tensors.
 */
export const meanAndStandardDeviation = data => {
  const dataMean = data.mean(0)
  const diffFromMean = data.sub(dataMean)
  const squaredDiffFromMean = diffFromMean.square()
  const variance = squaredDiffFromMean.mean(0)
  const dataStd = variance.sqrt()
  //const std = data.sub(data.mean(0)).square().mean().sqrt()
  return { dataMean, dataStd }
}

/**
 * Given expected mean and standard deviation, normalizes a dataset by
 * subtracting the mean and dividing by the standard deviation.
 *
 * @param {Tensor2d} data: Data to normalize.
 * Shape: [numSamples, numFeatures].
 * @param {Tensor1d} mean: Expected mean of the data. Shape [numFeatures].
 * @param {Tensor1d} std: Expected std of the data. Shape [numFeatures]
 *
 * @returns {Tensor2d}: Tensor the same shape as data, but each column
 * normalized to have zero mean and unit standard deviation.
 */
export const dataset = (data, dataMean, dataStd) => {
  return data.sub(dataMean).div(dataStd)
}

export default {
  meanAndStandardDeviation,
  dataset
}
