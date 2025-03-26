import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { CustomTranslateLoader } from './custom-translate-loader';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export class CompositeTranslateLoader implements TranslateLoader {
  constructor(private http: HttpClient) { }

  getTranslation(lang: string): Observable<any> {
    return new CustomTranslateLoader(this.http).getTranslation(lang)
      .pipe(
        catchError(() => {
          return new TranslateHttpLoader(this.http, './assets/i18n/', '.json').getTranslation(lang)
            .pipe(
              catchError((error) => {
                console.error('Failed to load translations from custom and default loader', error);
                return throwError('Failed to load translations');
              })
            );
        })
      );
  }

  translateInput(text: string, targetLang: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
      fetch(url)
        .then(response => response.json())
        .then(data => resolve(data[0][0][0]))
        .catch(error => reject(error));
    });
  }
  
}