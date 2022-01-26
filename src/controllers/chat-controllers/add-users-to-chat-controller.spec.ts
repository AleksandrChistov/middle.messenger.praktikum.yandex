/* eslint-disable */
import {expect} from 'chai';
import {AddUsersToChatController, AddUsersToChatFormModel} from './add-users-to-chat-controller';
import store from '../../store/store';
import * as sinon from 'sinon';
import {AddUsersToChatApi} from '../../api/chat-api/add-users-api';
import {CHAT_PAGE_EVENT_NAME} from '../../screens/chat/events';

describe('AddUsersToChatController', () => {
	const formModel: AddUsersToChatFormModel = {
		users: [1],
		chatId: 1,
	};

	it('should call API', async () => {
		const spyAPI = sinon.stub(AddUsersToChatApi.prototype, 'add')
      .callsFake(async () => new Promise(resolve => {
			resolve(null);
		}));

		store.on(CHAT_PAGE_EVENT_NAME, () => {}, () => {});

		await AddUsersToChatController.add(formModel);

		expect(spyAPI.called).to.be.true;
	});

	it('should call store', async () => {
		const spyStore = sinon.spy();

		store.on(CHAT_PAGE_EVENT_NAME, spyStore, spyStore);

		await AddUsersToChatController.add(formModel);

		expect(spyStore.called).to.be.true;
	});
});
