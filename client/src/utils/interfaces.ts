export interface IPod {
	name: string;
	namespace: string;
	controller_kind: string;
	container_name: string | null;
	traces_instrumented: boolean;
	application?: string | null;
	language?: string | null;
	current_log_type?: string | null;
	log_type?: string;
	isTouched?: boolean;
}
export interface IItemToSend {
	name: string;
	controller_kind: string;
	namespace: string;
	service_name?: string;
	telemetry_type?: string; //logs /metrics/traces
	action?: string; //add or delete
	log_type?: string;

}

export interface IParsedItem {

	pods: number;
	all_log_types: string[];
	podsItem: IPod[];
	namespaces: string[];
	all_service_names: string[];
	traces_instrumented?: boolean;
	isTouched?: boolean;
	log_type_default?: string;
	service_name_default?: string;
	logTypeOnSelect?: string;
}
export interface IParsedLogsData {
	[key: string]: IParsedItem;

}

export enum NotificationStatus {
	'Success',
	'Info',
	'Warning',
	'Danger',
}
export interface INotification {
	message: string;
	type: NotificationStatus.Success;
	notificationId: number;
}

export type ListType = {
	name: string;
	isDisabled: boolean;
	default: boolean;
}

export interface IContextState {
	notifications: INotification[],
}

export interface ILogsContextState {
	logsPods: IParsedItem[] | null,
	logList: ListType[],

}
export interface ITracesContextState {
	tracesPods: IParsedItem[] | null,
	serviceNameList: ListType[];
}