# Vendored Dependencies

Contains vendored source from [mixpanel-js](https://github.com/mixpanel/mixpanel-js).

## mixpanel-core

Sourced from [`dist/mixpanel-core.cjs.js`](https://github.com/mixpanel/mixpanel-js/blob/a2ad09ec229355a0ad723fbe1fd73764c095910e/dist/mixpanel-core.cjs.js).

The CJS build was modified to use ES module exports (`export` instead of `module.exports`) since LWC requires ES modules — CommonJS is not supported in Lightning Web Components.

Only the main SDK is included. Session recording is excluded because it relies on DOM access patterns that are incompatible with LWC's sandboxed environment.
