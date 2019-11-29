// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  hmr: false,
  baseURL: 'http://localhost:4200',
  api: {
    client_id: 'HMTwUig7aBNVTAnicwhPk23QT1iVvotl',
    url_auth: 'https://arbi.api.homolog.inf.br/portal/v1/perfil/ce',
    redirect_uri: 'http://localhost:4200',
    client_secret: 'DB8kZD9QmTihSXwvOPkq0DRAZYxIELEing',
    app_name: 'app_xapss',
    url: 'https://api-bancoarbi.sensedia.com/cessaotitulos/v1',
    user: {}
  },
  email: {
    token: '19aa9834-17ba-436e-a4bd-94505b8ab379'
  },
  shortUrl: 'https://www.googleapis.com/urlshortener/v1/url?key=AIzaSyAVSLlvlmj7pfNcHc3WmeIo-GJzvS_1swI'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
