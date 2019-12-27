import webpack from 'webpack';
export declare function build(config: webpack.Configuration, { rootDirectory, customAppFile, isDevelopment, isServer, hasSupportCss, hasExperimentalData, }: {
    rootDirectory: string;
    customAppFile: string | null;
    isDevelopment: boolean;
    isServer: boolean;
    hasSupportCss: boolean;
    hasExperimentalData: boolean;
}): Promise<webpack.Configuration>;
