import type { RequestItem } from "types/Request";
import axios from "api/index";

import UserInfoConfig from "./UserInfo";
import MenuListConfig from "./MenuList";

axios.setConfig("userInfo", UserInfoConfig as RequestItem[]);
axios.setConfig("menuList", MenuListConfig as RequestItem[]);

export default axios;
