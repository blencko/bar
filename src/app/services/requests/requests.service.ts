import { Injectable } from '@angular/core';
import { Http, Headers, BrowserXhr } from '@angular/http';
import { environment } from 'src/environments/environment.hmr';
import { BehaviorSubject, Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  // tslint:disable-next-line:variable-name
  private _token: BehaviorSubject<any[]>;
  public token: Observable<any[]>;

  constructor(
    // tslint:disable-next-line: deprecation
    private http: Http
  ) {

    this._token = new BehaviorSubject([]) as BehaviorSubject<any>;
    this.token = this._token.asObservable();

    const data = {
      client_id: environment.api.client_id,
      redirect_uri: environment.api.redirect_uri
    };

    this.getCode('/oauth/grant-code', data)
      .then(res => {
        const redirect_uri = environment.api.redirect_uri;
        const trim = res.redirect_uri.replace(`${redirect_uri}/?code=`, '');
        const token = btoa(`${environment.api.client_id}:${environment.api.client_secret}`);
        const params = {
          grant_type: 'authorization_code',
          code: trim
        };
        const tokenData = Object.keys(params).map((key) => {
          return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
        }).join('&');

        this.getToken('/oauth/access-token', tokenData, token)
          .then(result => {
            this._token.next(result.access_token);
          });
      })
      .catch(error => console.error(error));
  }

  // tslint:disable-next-line: deprecation
  private HeadersToken(token?): Headers {
    // tslint:disable-next-line: deprecation
    const headers = new Headers();
    headers.append('content-Type', 'application/x-www-form-urlencoded');
    headers.append('authorization', `Basic ${token}`);
    return headers;
  }

  // tslint:disable-next-line: deprecation
  private HeadersExternal(): Headers {
    // tslint:disable-next-line: deprecation
    const headers = new Headers();
    headers.append('content-Type', 'application/json');
    return headers;
  }

  // tslint:disable-next-line: deprecation
  private Headers(token): Headers {
    // tslint:disable-next-line: deprecation
    const headers = new Headers();
    headers.append('content-Type', 'application/json');
    headers.append('client_id', environment.api.client_id);
    headers.append('access_token', token);
    return headers;
  }


  private async getCode(url: string, body: any): Promise<any> {
    return Promise.resolve(this.http.post(`${environment.api.urlBase}${url}`, body)
      .toPromise()
      .then((res) => {
        return JSON.parse(res.text());
      })
      .catch((error) => {
        this.handleError(error.status);
      })
    );
  }

  private async getToken(url: string, body: any, token): Promise<any> {
    const headers = this.HeadersToken(token);

    return Promise.resolve(this.http.post(`${environment.api.urlBase}${url}`, body, { headers })
      .toPromise()
      .then((res) => {
        return JSON.parse(res.text());
      })
      .catch((error) => {
        this.handleError(error.status);
      })
    );
  }

  getExternal(url: string, options?): Promise<any> {
    const headers = this.HeadersExternal();
    return Promise.resolve(this.http.get(url, { headers })
      .toPromise()
      .then((res) => {
        console.log('aqui', res);
        return JSON.parse(res.text());
      })
      .catch(error => this.handleError(error.status))
    );
  }

  get(url: string, token, options?): Promise<any> {
    const headers = this.Headers(token);
    return Promise.resolve(this.http.get(`${environment.api.url}${url}`, token ? { headers } : {})
      .toPromise()
      .then((res) => {
        return JSON.parse(res.text());
      })
      .catch(error => this.handleError(error.status))
    );
  }

  post(url: string, body: any, token): Promise<any> {
    const headers = this.Headers(token);
    return Promise.resolve(this.http.post(`${environment.api.url}${url}`, body, token ? { headers } : {})
      .toPromise()
      .then((res) => {
        return JSON.parse(res.text());
      })
      .catch(error => this.handleError(error.status))
    );
  }

  postExternal(url: string, body: any): Promise<any> {
    return Promise.resolve(this.http.post(url, body)
      .toPromise()
      .then((res) => {
        return JSON.parse(res.text());
      })
      .catch(error => this.handleError(error.status))
    );
  }

  put(url: string, body: any, token): Promise<any> {
    const headers = this.Headers(token);
    return Promise.resolve(this.http.put(`${environment.api.url}${url}`, body, token ? { headers } : {})
      .toPromise()
      .then((res) => {
        return JSON.parse(res.text());
      })
      .catch(error => this.handleError(error.status))
    );
  }

  delete(url: string, token): Promise<any> {
    const headers = this.Headers(token);
    return Promise.resolve(this.http.delete(`${environment.api.url}${url}`, { headers })
      .toPromise()
      .then((res) => {
        return JSON.parse(res.text());
      })
      .catch(error => this.handleError(error.status))
    );
  }


  sendMail(body: any, token?): Promise<any> {
    const headers = this.Headers(token);
    return Promise.resolve(this.http.post(`${environment.api.send}/send`, body, token ? { headers } : {})
      .toPromise()
      .then((res) => {
        return JSON.parse(res.text());
      })
      .catch(error => this.handleError(error.status))
    );
  }

  upload(data: any, token?): Promise<any> {
    const formData = new FormData();
    const headers = token ? this.Headers(token) : false;

    for (const key in data) {
      if (key && data) {
        formData.append(key, data[key]);
      }
    }
    // return false;

    return Promise.resolve(this.http.post(`${environment.api.send}/attachment`, formData, headers ? { headers } : {})
      .toPromise()
      .then((res) => {
        return res;
      })
      .catch((error) => {
        console.error(error);
        // return [];
      })
    );
  }


  private async handleError(code) {
    switch (code) {
      case 500:
        Swal.fire({
          title: 'Erro interno.',
          text: 'Estamos com instabilidade em nossa API, entre em contato com o nosso suporte.',
          type: 'warning',
          showCancelButton: false,
          showConfirmButton: false,
          customClass: 'default'
        });

        setTimeout(() => {
          Swal.close();
        }, 5000);
        break;
      case 404:
        Swal.fire({
          title: 'Rota não encontrada.',
          text: 'Verifique o caminho da rota.',
          type: 'error',
          showCancelButton: false,
          showConfirmButton: false,
          customClass: 'default'
        });

        setTimeout(() => {
          Swal.close();
        }, 5000);
        break;
      case 401:
        Swal.fire({
          title: 'Rota não autorizada.',
          text: 'Você não tem permissão para consumir esta rota.',
          type: 'error',
          showCancelButton: false,
          showConfirmButton: false,
          customClass: 'default'
        });

        setTimeout(() => {
          Swal.close();
          // window.location.href = 'https://www.bancoarbi.com.br/';
        }, 5000);
        break;
      default:
        Swal.fire({
          title: 'Erro interno.',
          text: 'Estamos com instabilidade em nossa API, entre em contato com o nosso suporte.',
          type: 'warning',
          showCancelButton: false,
          showConfirmButton: false,
          customClass: 'default'
        });

        setTimeout(() => {
          Swal.close();
        }, 5000);
        break;
    }
  }
}
