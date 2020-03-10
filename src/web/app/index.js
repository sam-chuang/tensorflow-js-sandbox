import { app, h } from "hyperapp"

export default node => {
  return app({
    init: 0,
    view: state => html`
      Hi, Hyperapp
    `,
    node
  })
}
