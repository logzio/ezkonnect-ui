export const podsArray = [
	{
		name: 'adservice',
		namespace: 'default',
		controller_kind: 'deployment',
		container_name: 'server',
		traces_instrumented: true,
		application: null,
		language: 'java',
		log_type: 'nginx',
	},
	{
		name: 'cartservice',
		namespace: 'default',
		controller_kind: 'deployment',
		container_name: 'server',
		traces_instrumented: false,
		application: null,
		language: 'dotnet',
	},
	{
		name: 'checkoutservice',
		namespace: 'default',
		controller_kind: 'deployment',
		container_name: null,
		traces_instrumented: false,
		application: null,
		language: null,
		log_type: '',
	},
	{
		name: 'currencyservice',
		namespace: 'default',
		controller_kind: 'deployment',
		container_name: 'server',
		traces_instrumented: true,
		application: null,
		language: 'nodejs',
		log_type: '',
	},
	{
		name: 'emailservice',
		namespace: 'default',
		controller_kind: 'deployment',
		container_name: 'server',
		traces_instrumented: true,
		application: null,
		language: 'python',
		log_type: 'lololo',
	},
	{
		name: 'frontend',
		namespace: 'default',
		controller_kind: 'deployment',
		container_name: null,
		traces_instrumented: false,
		application: null,
		language: null,
		log_type: '',
	},
	{
		name: 'loadgenerator',
		namespace: 'default-app',
		controller_kind: 'deployment',
		container_name: 'main',
		traces_instrumented: true,
		application: null,
		language: 'python',
		log_type: '',
	},
	{
		name: 'my-release-nginx-ingress-controller',
		namespace: 'default-app',
		controller_kind: 'deployment',
		container_name: 'nginx-ingress',
		traces_instrumented: false,
		application: 'nginx',
		language: null,
		log_type: '',
	},
	{
		name: 'paymentservice',
		namespace: 'default',
		controller_kind: 'deployment',
		container_name: 'server',
		traces_instrumented: false,
		application: null,
		language: 'nodejs',
		log_type: '',
	},
	{
		name: 'productcatalogservice',
		namespace: 'default',
		controller_kind: 'deployment',
		container_name: null,
		traces_instrumented: false,
		application: null,
		language: null,
		log_type: 'lolo',
	},
	{
		name: 'recommendationservice',
		namespace: 'default',
		controller_kind: 'deployment',
		container_name: 'server',
		traces_instrumented: false,
		application: null,
		language: 'python',
		log_type: '',
	},
	{
		name: 'redis-cart',
		namespace: 'default',
		controller_kind: 'deployment',
		container_name: null,
		traces_instrumented: true,
		application: null,
		language: null,
		log_type: '',
	},
	{
		name: 'shippingservice',
		namespace: 'default',
		controller_kind: 'deployment',
		container_name: null,
		traces_instrumented: true,
		application: null,
		language: null,
		log_type: '',
	},
	{
		name: 'catalog-operator',
		namespace: 'olm',
		controller_kind: 'deployment',
		container_name: null,
		traces_instrumented: false,
		application: null,
		language: null,
		log_type: '',
	},
	{
		name: 'olm-operator',
		namespace: 'olm',
		controller_kind: 'deployment',
		container_name: null,
		traces_instrumented: false,
		application: null,
		language: null,
		log_type: '',
	},
];
export const typeLogsArray = ['nginx', 'lololo', 'lolo'];


export const parsedDataMultiple = { "java_default_server": { "pods": 1, "all_log_types": ["nginx", "lololo", "lolo"], "all_service_names": ["server"], "traces_instrumented": true, "log_type_default": "", "service_name_default": "server", "namespaces": ["default"], "isTouched": false, "podsItem": [{ "name": "adservice", "namespace": "default", "controller_kind": "deployment", "container_name": "server", "traces_instrumented": true, "application": null, "language": "java", "log_type": "nginx" }], "logTypeOnSelect": "" }, "dotnet_default_server": { "pods": 1, "all_log_types": ["nginx", "lololo", "lolo"], "all_service_names": ["server"], "traces_instrumented": false, "log_type_default": "", "service_name_default": "server", "namespaces": ["default"], "isTouched": false, "podsItem": [{ "name": "cartservice", "namespace": "default", "controller_kind": "deployment", "container_name": "server", "traces_instrumented": false, "application": null, "language": "dotnet" }], "logTypeOnSelect": "" }, "Undetected": { "pods": 8, "all_log_types": ["nginx", "lololo", "lolo"], "all_service_names": ["nginx-ingress"], "traces_instrumented": false, "namespaces": ["default", "default", "default-app", "default", "default", "default", "olm", "olm"], "log_type_default": "", "podsItem": [{ "name": "checkoutservice", "namespace": "default", "controller_kind": "deployment", "container_name": null, "traces_instrumented": false, "application": null, "language": null, "log_type": "" }, { "name": "frontend", "namespace": "default", "controller_kind": "deployment", "container_name": null, "traces_instrumented": false, "application": null, "language": null, "log_type": "" }, { "name": "my-release-nginx-ingress-controller", "namespace": "default-app", "controller_kind": "deployment", "container_name": "nginx-ingress", "traces_instrumented": false, "application": "nginx", "language": null, "log_type": "" }, { "name": "productcatalogservice", "namespace": "default", "controller_kind": "deployment", "container_name": null, "traces_instrumented": false, "application": null, "language": null, "log_type": "lolo" }, { "name": "redis-cart", "namespace": "default", "controller_kind": "deployment", "container_name": null, "traces_instrumented": true, "application": null, "language": null, "log_type": "" }, { "name": "shippingservice", "namespace": "default", "controller_kind": "deployment", "container_name": null, "traces_instrumented": true, "application": null, "language": null, "log_type": "" }, { "name": "catalog-operator", "namespace": "olm", "controller_kind": "deployment", "container_name": null, "traces_instrumented": false, "application": null, "language": null, "log_type": "" }, { "name": "olm-operator", "namespace": "olm", "controller_kind": "deployment", "container_name": null, "traces_instrumented": false, "application": null, "language": null, "log_type": "" }] }, "nodejs_default_server": { "pods": 2, "all_log_types": ["nginx", "lololo", "lolo"], "all_service_names": ["server", "server"], "traces_instrumented": true, "log_type_default": "", "service_name_default": "server", "namespaces": ["default", "default"], "isTouched": false, "podsItem": [{ "name": "currencyservice", "namespace": "default", "controller_kind": "deployment", "container_name": "server", "traces_instrumented": true, "application": null, "language": "nodejs", "log_type": "" }, { "name": "paymentservice", "namespace": "default", "controller_kind": "deployment", "container_name": "server", "traces_instrumented": false, "application": null, "language": "nodejs", "log_type": "" }], "logTypeOnSelect": "" }, "python_default_server": { "pods": 2, "all_log_types": ["nginx", "lololo", "lolo"], "all_service_names": ["server", "server"], "traces_instrumented": true, "log_type_default": "", "service_name_default": "server", "namespaces": ["default", "default"], "isTouched": false, "podsItem": [{ "name": "emailservice", "namespace": "default", "controller_kind": "deployment", "container_name": "server", "traces_instrumented": true, "application": null, "language": "python", "log_type": "lololo" }, { "name": "recommendationservice", "namespace": "default", "controller_kind": "deployment", "container_name": "server", "traces_instrumented": false, "application": null, "language": "python", "log_type": "" }], "logTypeOnSelect": "" }, "python_default-app_main": { "pods": 1, "all_log_types": ["nginx", "lololo", "lolo"], "all_service_names": ["main"], "traces_instrumented": true, "log_type_default": "", "service_name_default": "main", "namespaces": ["default-app"], "isTouched": false, "podsItem": [{ "name": "loadgenerator", "namespace": "default-app", "controller_kind": "deployment", "container_name": "main", "traces_instrumented": true, "application": null, "language": "python", "log_type": "" }], "logTypeOnSelect": "" } }

export const parsedDataOneFilter = { "Undetected": { "pods": 14, "all_log_types": ["nginx", "lololo", "lolo"], "all_service_names": [], "traces_instrumented": true, "namespaces": ["default", "default", "default", "default", "default", "default", "default-app", "default", "default", "default", "default", "default", "olm", "olm"], "log_type_default": "", "podsItem": [{ "name": "adservice", "namespace": "default", "controller_kind": "deployment", "container_name": "server", "traces_instrumented": true, "application": null, "language": "java", "log_type": "nginx" }, { "name": "cartservice", "namespace": "default", "controller_kind": "deployment", "container_name": "server", "traces_instrumented": false, "application": null, "language": "dotnet" }, { "name": "checkoutservice", "namespace": "default", "controller_kind": "deployment", "container_name": null, "traces_instrumented": false, "application": null, "language": null, "log_type": "" }, { "name": "currencyservice", "namespace": "default", "controller_kind": "deployment", "container_name": "server", "traces_instrumented": true, "application": null, "language": "nodejs", "log_type": "" }, { "name": "emailservice", "namespace": "default", "controller_kind": "deployment", "container_name": "server", "traces_instrumented": true, "application": null, "language": "python", "log_type": "lololo" }, { "name": "frontend", "namespace": "default", "controller_kind": "deployment", "container_name": null, "traces_instrumented": false, "application": null, "language": null, "log_type": "" }, { "name": "loadgenerator", "namespace": "default-app", "controller_kind": "deployment", "container_name": "main", "traces_instrumented": true, "application": null, "language": "python", "log_type": "" }, { "name": "paymentservice", "namespace": "default", "controller_kind": "deployment", "container_name": "server", "traces_instrumented": false, "application": null, "language": "nodejs", "log_type": "" }, { "name": "productcatalogservice", "namespace": "default", "controller_kind": "deployment", "container_name": null, "traces_instrumented": false, "application": null, "language": null, "log_type": "lolo" }, { "name": "recommendationservice", "namespace": "default", "controller_kind": "deployment", "container_name": "server", "traces_instrumented": false, "application": null, "language": "python", "log_type": "" }, { "name": "redis-cart", "namespace": "default", "controller_kind": "deployment", "container_name": null, "traces_instrumented": true, "application": null, "language": null, "log_type": "" }, { "name": "shippingservice", "namespace": "default", "controller_kind": "deployment", "container_name": null, "traces_instrumented": true, "application": null, "language": null, "log_type": "" }, { "name": "catalog-operator", "namespace": "olm", "controller_kind": "deployment", "container_name": null, "traces_instrumented": false, "application": null, "language": null, "log_type": "" }, { "name": "olm-operator", "namespace": "olm", "controller_kind": "deployment", "container_name": null, "traces_instrumented": false, "application": null, "language": null, "log_type": "" }] }, "nginx": { "pods": 1, "all_log_types": ["nginx", "lololo", "lolo"], "all_service_names": [], "traces_instrumented": false, "log_type_default": "", "service_name_default": "", "namespaces": ["default-app"], "isTouched": false, "podsItem": [{ "name": "my-release-nginx-ingress-controller", "namespace": "default-app", "controller_kind": "deployment", "container_name": "nginx-ingress", "traces_instrumented": false, "application": "nginx", "language": null, "log_type": "" }], "logTypeOnSelect": "" } }

export interface IItemToSend {
	name: string;
	controller_kind: string;
	namespace: string;
	service_name?: string;
	telemetry_type?: string; //logs /metrics/traces
	action?: string; //add or delete
	log_type?: string;

}

export const itemsToSend = [{
	name: 'app',
	controller_kind: 'default',
	namespace: 'redis',
	service_name: 'default',
	telemetry_type: 'traces', //logs /metrics/traces
	action: 'add', //add or delete
	log_type: 'redis-container',
}, {
	name: 'app-frontend',
	controller_kind: 'default',
	namespace: 'redis',
	service_name: 'default',
	telemetry_type: 'logs', //logs /metrics/traces
	action: 'delete', //add or delete
	log_type: 'frontend-app',
}];