import {Props} from "../../core/types";
import {AvatarProps} from "../avatar/avatar";

export enum UserActionIcon {
  Add = 'add',
  Delete = 'delete'
}

export interface FoundUserProps extends Props {
  id: number;
  fullName: string;
  avatar: AvatarProps;
  iconType: UserActionIcon;
  iconDisabled?: boolean;
}
