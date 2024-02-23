import type {Emitter} from "mitt";
import mitt from "mitt";

/** 全局公共事件需要在此处添加类型 */
type Events = {
  resize: {
    detail: {
      width: number;
      height: number;
    };
  };
  openPanel: string;
  tagViewsChange: string;
  tagViewsShowModel: string;
  logoChange: boolean;
  // changLayoutRoute: {
  //   indexPath: string;
  //   parentPath: string;
  // };
  changLayoutRoute: string;
};

export const emitter: Emitter<Events> = mitt<Events>();
