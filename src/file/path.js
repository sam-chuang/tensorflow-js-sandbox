import { dirname } from "path"
import { fileURLToPath } from "url"
import fs from "fs-extra"

const DefaultUrl = import.meta.url //Note. jest not support 'import.meta.url'
const __filename = fileURLToPath(DefaultUrl)
const __dirname = dirname(fileURLToPath(DefaultUrl))

console.log("__filename", __filename, "__dirname", __dirname)

//TODO: required?
export const directory = (url = DefaultUrl) => {}

export default (url = DefaultUrl) => fileURLToPath(url)
