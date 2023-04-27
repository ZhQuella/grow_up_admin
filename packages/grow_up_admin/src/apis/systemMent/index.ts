import type { RequestItem } from "types/Request";
import axios from "api/index";

import deptMentConfig from "./deptMent";
import accountMentConfig from "./accountMent";

axios.setConfig("deptMent", deptMentConfig as RequestItem[]);
axios.setConfig("accountMent", accountMentConfig as RequestItem[]);

export default axios;
