import {ChatCard} from "../components/chat-card/chat-card";
import {SearchInput} from "../components/inputs/search/search-input";
import {Avatar} from "../components/avatar/avatar";
import {Time} from "../components/time/time";
import {Message} from "../components/message/message";
import {ErrorMessage} from "../components/error-message/error-message";
import {TextInput} from "../components/inputs/text/text-input";
import {PasswordInput} from "../components/inputs/password/password-input";
import {FormButton} from "../components/form-button/form-button";
import {EmailInput} from "../components/inputs/email/email-input";
import {PhoneInput} from "../components/inputs/phone/phone-input";
import {PopupAvatar} from "../components/popups/popup-avatar/popup-avatar";

export const REGISTERED_COMPONENTS = {
  TextInputComponent: TextInput,
  EmailInputComponent: EmailInput,
  PasswordInputComponent: PasswordInput,
  PhoneInputComponent: PhoneInput,
  SearchInputComponent: SearchInput,
  FormButtonComponent: FormButton,
  ErrorMessageComponent: ErrorMessage,
  ChatCardComponent: ChatCard,
  AvatarComponent: Avatar,
  TimeComponent: Time,
  MessageComponent: Message,
  PopupAvatarComponent: PopupAvatar,
}
