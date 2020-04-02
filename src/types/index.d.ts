import { PathLike } from "fs";

export interface BaseOptions {
  /** The statuspage.io URL */
  url: string;
  /** Where to save the data */
  file?: PathLike;
  /** The interval to make a request to the status page (ms) */
  interval?: number;
}

export interface StatuspageJSON {
  page: {
    id: string;
    name: string;
    url: string;
  }
  status: {
    indicator: string;
    description: string;
  }
  components: component[];

  [key: string]: any;
}

export interface component {
  status: string;
  name: string;
  created_at: string;
  updated_at: string;
  position: number;
  showcase: boolean;
  description: string;
  id: string;
  page_id: string;
  grup_id: unknown;

  [key: string]: any;
}
