/* eslint-disable */
import {expect} from 'chai';
import {AddUsersToChatController, AddUsersToChatFormModel} from './add-users-to-chat-controller';
import store from '../../store/store';
import * as sinon from 'sinon';
import {AddUsersToChatApi} from '../../api/chat-api/add-users-api';
import {getEventName} from "../../core/utils/get-event-name";
import {authService} from '../../services/auth-service';

describe('AddUsersToChatController', () => {
  sinon.stub(authService, 'isAuthorized').get(() => true);

	const formModel: AddUsersToChatFormModel = {
		users: [1],
		chatId: 1,
	};

  const spyAPI = sinon.stub(AddUsersToChatApi.prototype, 'add')
    .callsFake(async () => new Promise(resolve => {
      resolve(null);
    }));

	it('should call API', async () => {
		store.on(getEventName('popupAddUserToChat', 'usersList'), () => {}, () => {});

		await AddUsersToChatController.add(formModel);

		expect(spyAPI.called).to.be.true;
	});

	it('should call store', async () => {
		const spyStore = sinon.spy();

		store.on(getEventName('popupAddUserToChat', 'usersList'), spyStore, spyStore);

		await AddUsersToChatController.add(formModel);

		expect(spyStore.called).to.be.true;
	});
});
