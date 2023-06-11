import {

	SET_NOTIFICATION,
	REMOVE_NOTIFICATION,

} from '../types';
import { IContextState, INotification } from '../../utils/interfaces';

export const NotificationReducer = (currentState: IContextState, action: any): IContextState => {
	switch (action.type) {


		case SET_NOTIFICATION: {

			const updatedNotifications = [...currentState.notifications];
			updatedNotifications.push({
				message: action.payload.notification,
				type: action.payload.typeNotification,
				notificationId: action.payload.notificationId
			});
			return {
				...currentState, notifications: [...updatedNotifications]

			};
		}
		case REMOVE_NOTIFICATION: {

			const findIndex = currentState.notifications.findIndex(
				(notif: INotification) => notif.notificationId === action.payload.tempId,
			);
			let updRemovedNotification: INotification[] = [];
			if (currentState.notifications.length === 1) {
				updRemovedNotification = [];
			} else {
				updRemovedNotification = [...currentState.notifications.splice(findIndex, 1)];
			}
			return {
				...currentState, notifications: [...updRemovedNotification]

			};
		}

		default:
			return { ...currentState }
	}
};
