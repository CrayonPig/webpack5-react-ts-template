
export interface MetaProps {
	keepAlive?: boolean;
	requiresAuth?: boolean;
	title?: string;
	key?: string;
  hidden?: boolean;
  header?: string;
  pageName?: string;
}

export interface RouteObject {
	caseSensitive?: boolean;
	children?: RouteObject[];
	element?:  any;
	index?: boolean;
	path?: string;
	meta?: MetaProps;
	isLink?: string;
}
