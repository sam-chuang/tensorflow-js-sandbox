import { app, h } from "/web_modules/hyperapp.js?rev=b1efa64065";
export default (node => {
  return app({
    init: 0,
    view: state => "Hi, Hyperapp",
    node
  });
});