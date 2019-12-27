export declare type Rewrite = {
    source: string;
    destination: string;
};
export declare type Redirect = Rewrite & {
    statusCode?: number;
};
export default function checkCustomRoutes(routes: Array<Rewrite | Redirect>, type: 'redirect' | 'rewrite'): void;
