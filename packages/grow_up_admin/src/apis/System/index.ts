import axios from "api/index";

import UserInfoConfig from "./UserInfo";
import MenuListConfig from "./MenuList";

axios.setConfig("userInfo", UserInfoConfig);
axios.setConfig("menuList", MenuListConfig);

export default axios;
