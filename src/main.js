/* comment out if you don't want a Promise polyfill (remove also from webpack.config.js) */
import * as Bluebird from 'bluebird';
Bluebird.config({ warnings: false });

export async function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging();

  await aurelia.start();
  aurelia.setRoot("pages/rootComponent/rootComponent");
}