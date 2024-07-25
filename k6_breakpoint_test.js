import http from "k6/http";
import { sleep } from "k6";

import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

const appName = "aspnetcontroller";
const url = "http://localhost:5000/api";
const testResultFolder = `test_result/${appName}`;

export const options = {
  // Key configurations for breakpoint in this section
  executor: "ramping-arrival-rate", //Assure load increase if the system slows
  stages: [
    { duration: "2h", target: 20000 }, // just slowly ramp-up to a HUGE load
  ],
};

export default () => {
  const urlRes = http.get(url);
  sleep(1);
  // MORE STEPS
  // Here you can have more steps or complex script
  // Step1
  // Step2
  // etc.
};

export function handleSummary(data) {
  return {
    [`${testResultFolder}/breakpoint_test.html`]: htmlReport(data),
    stdout: textSummary(data, { indent: " ", enableColors: true }),
  };
}
