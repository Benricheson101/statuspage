import { StatuspageJSON, BaseOptions } from "./types";
import { EventEmitter } from "events";
import fetch from "node-fetch";
import { promises } from "fs";

export default class extends EventEmitter {
  private defaults: {
    path: "./build/data.json",
    interval: 150000,
  }

  remote?: StatuspageJSON;
  local?: StatuspageJSON;

  constructor (private options: BaseOptions) {
    super();
  } 

  /**
   * Compare local and remote data
   */
  compare () {
    if (!this.remote) {
      console.error(new Error("There is no remote data stored in memory. Use fetch before using compare"));
      return;
    }
    if (!this.local) {
      console.error(new Error("There is no local data stored in memory. Use read before using compare"));
      return;
    }
    if (!Object.keys(this.local).includes("components")) this.write();
    return this.local.components[0].updated_at !== this.remote.components[0].updated_at;
  }

  /**
   * Fetch data from the status page
   */
  async fetch () {
    const remote: StatuspageJSON = await fetch(this.options.url)
      .then((res) => res.json())
      .catch(console.error);
    this.remote = remote;
    return remote;
  }

  /**
   * Read locally saved data
   */
  async read () {
    const localData = await promises.readFile(this.options.file ?? this.defaults.path, "utf-8");
    this.local = JSON.parse(localData) as any;
    return localData;
  }

  /**
   * Run at a specified interval
   */
  async run () {
    this.emit("start", { startedAt: new Date() });

    const run = async () => {
      this.emit("run", { time: new Date() });
      await this.fetch();
      await this.read();

      const hasChanged: boolean = this.compare();
      
      if (hasChanged) {
        this.write();
        this.emit("update", this.local);
      }
    };
 
    run();
    setInterval(run, this.options.interval ?? this.defaults.interval);
  }

  /**
   * Write remote data to the local file
   */
  async write () {
    if (!this.remote) {
      console.error(new Error("There is no remote data saved in memory. Use fetch before using write"));
      return;
    }
    this.local = this.remote;
    return promises.writeFile(this.options.file ?? this.defaults.path, JSON.stringify(this.remote, null, 2));
  }
}

// compare
  // compare the updated_at or created_at times
  // emit event if not the same
// fetch
  // fetch remote data
// read
  // read from the local file
  // save to this.local
// run
  // run all of these functions
// write
  // write to the local file
