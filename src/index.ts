import Statuspage from "./Statuspage";

const Status = new Statuspage({
  url: "https://status.discordapp.com/index.json",
  file: "./build/data.json",
  interval: 150000
});

Status.on("start", console.log);

Status.on("run", console.log);

Status.on("update", console.log);

Status.run();
