import { addIcon } from "@iconify/vue/dist/offline";

/**
 * 这里存放本地图标，在 src/layout/index.vue 文件中加载，避免在首启动加载
 */

// 本地菜单图标，后端在路由的icon中返回对应的图标字符串并且前端在此处使用addIcon添加即可渲染菜单图标
import HomeFilled from "@iconify-icons/ep/home-filled";
import InformationLine from "@iconify-icons/ri/information-line";
import Lollipop from "@iconify-icons/ep/lollipop";
import List from "@iconify-icons/ep/list";
import PictureFilled from "@iconify-icons/ep/picture-filled";
import UserFilled from "@iconify-icons/ep/user-filled";
import Setting from "@iconify-icons/ri/settings-3-line";
import Message from "@iconify-icons/ep/message";
import Views from "@iconify-icons/ri/eye-fill";
import ChatDotRound from "@iconify-icons/ep/chat-dot-round";
import Pencil from "@iconify-icons/ri/pencil-fill";
import Discount from "@iconify-icons/ep/discount";

addIcon("homeFilled", HomeFilled);
addIcon("informationLine", InformationLine);
addIcon("lollipop", Lollipop);
addIcon("list", List);
addIcon("pictureFilled", PictureFilled);
addIcon("user", UserFilled);
addIcon("message", Message);
addIcon("setting", Setting);
addIcon("views", Views);
addIcon("chatDotRound", ChatDotRound);
addIcon("pencil", Pencil);
addIcon("discount", Discount);
