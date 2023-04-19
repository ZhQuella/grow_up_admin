import type { RequestItem } from "types/Request";
import axios from "api/index";

import DictConfig from "./DictConfig";

axios.setConfig("dicts", DictConfig as RequestItem[]);

export default axios;
