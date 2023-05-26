import axios from "api/index";

import DictConfig from "./DictConfig";

axios.setConfig("dicts", DictConfig);

export default axios;
