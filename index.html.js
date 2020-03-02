import { dirname } from "path"
import { fileURLToPath } from "url"
import fs from "fs-extra"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(fileURLToPath(import.meta.url))

console.log("__filename", __filename, "__dirname", __dirname)

//TODO: get version from package.json
const document = `
<!DOCTYPE html>
<html>
  <head>
    <title>TensorFlow.js Sandbox</title>
    <meta charset="UTF-8" />
  </head>

  <body>
    <div id="app"></div>

    <script type="module" src="index.js"></script>
  </body>
</html>
`

//TODO: get dist folder from setting?
fs.outputFileSync(`${__dirname}/dist/index.html`, document)
