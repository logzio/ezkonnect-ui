import {

	SET_NOTIFICATION,
	REMOVE_NOTIFICATION,

} from '../types';
import { IContextState, INotification, NotificationStatus } from '../../utils/interfaces';

interface Ipayload {
	notification?: string;
	typeNotification?: NotificationStatus;
	notificationId: number | string;
}

interface IAction {
	type: string;
	payload: Ipayload;

}

export const NotificationReducer = (currentState: IContextState, action: IAction): IContextState => {
	switch (action.type) {


		case SET_NOTIFICATION: {

			const updatedNotifications = [...currentState.notifications];
			updatedNotifications.push({
				message: action.payload.notification ? action.payload.notification : '',
				type: action.payload.typeNotification ? action.payload.typeNotification : NotificationStatus.Info,
				notificationId: action.payload.notificationId
			});
			return {
				...currentState, notifications: [...updatedNotifications]

			};
		}
		case REMOVE_NOTIFICATION: {

			const findIndex = currentState.notifications.findIndex(
				(notif: INotification) => notif.notificationId === action.payload.notificationId,
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
