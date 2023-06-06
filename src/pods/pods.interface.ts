
export interface IPod {
	name: string;
	namespace: string;
	controller_kind: string;
	container_name: string;
	traces_instrumented: boolean;
	metrics_instrumented?: boolean;
	application?: string | null;
	log_type?: string;
}
