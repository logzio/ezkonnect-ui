export interface IPod {
	name: string;
	namespace: string;
	controller_kind: string;
	container_name: string;
	traces_instrumented: boolean;
	metrics_instrumented: boolean;
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
	telemetry_type?: string; //logs /metrics/traces
	action?: string; //add or delete
	log_type?: string;

}

export interface IParsedItem {

	pods: number;
	all_log_types: string[];
	podsItem: IPod[];
	namespaces: string[];
	traces_instrumented?: boolean;
	metrics_instrumented?: boolean;
	isTouched?: boolean;
	log_type_default?: string;
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

type logListType = {
	name: string;
	isDisabled: boolean;
	default: boolean;
}

export interface IContextState {
	logsPods: IParsedItem[] | null,
	tracesPods: IParsedItem[] | null,
	podsItems: IPod[] | null,
	logList: logListType[],
	notifications: INotification[],
}