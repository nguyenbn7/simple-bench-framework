import http from "k6/http";
import { sleep } from "k6";

import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

const appName = "aspnetcontroller";
const url = "http://localhost:5000/api";
const testResultFolder = `test_result/${appName}`;

export const options = {
  // Key configurations for spike in this section
  stages: [
    { duration: "2m", target: 2000 }, // fast ramp-up to a high point
    // No plateau
    { duration: "1m", target: 0 }, // quick ramp-down to 0 users
  ],
};

export default () => {
  const urlRes = http.get(url);
  sleep(1);
  // MORE STEPS
  // Add only the processes that will be on high demand
  // Step1
  // Step2
  // etc.
};

export function handleSummary(data) {
  return {
    [`${testResultFolder}/spike_test.html`]: htmlReport(data),
    stdout: textSummary(data, { indent: " ", enableColors: true }),
  };
}
