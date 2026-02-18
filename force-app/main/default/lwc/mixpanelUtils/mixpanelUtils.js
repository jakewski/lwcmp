import { mixpanel } from "./vendored/mixpanel-core";

export function initMixpanel(token, config = {}) {
  mixpanel.init(
    token,
    {
      ...config,
      persistence: "localStorage"
    },
    "lwc_tracker"
  );

  return mixpanel.lwc_tracker;
}
