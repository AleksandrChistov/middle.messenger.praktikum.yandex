import {BaseAPI} from "../base-api";
import {Http, Options} from "../../services/http-service";
import {host} from "../../constants";
import {ErrorResponse} from "../types";


export type ChatsResponse = Chat[];

export type Chat = {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  last_message: LastMessage;
}

export type LastMessage = {
  user: ChatUser;
  time: string;
  content: string;
}

export type ChatUser = {
  first_name: string,
  second_name: string,
  avatar: string,
  email: string,
  login: string,
  phone: string
}

const getChatsAPIInstance = new Http(`${host}/api/v2/chats`);

export class GetChatsAPI extends BaseAPI {
  public get(options: Options): Promise<ChatsResponse | ErrorResponse> {
    return getChatsAPIInstance.get<ChatsResponse | ErrorResponse>('', options)
      .then((data) => data);
  }
}
