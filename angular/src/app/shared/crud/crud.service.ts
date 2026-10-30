import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * CRUD calls of one backend resource that follows the common REST layout:
 * GET {baseUrl}/{listPath}, GET {baseUrl}/{id}, POST {baseUrl}/save, DELETE {baseUrl}/{id}.
 */
export class CrudService<T> {

  constructor(private http: HttpClient,
              private baseUrl: string,
              private listPath: string) { }

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(`${this.baseUrl}/${this.listPath}`);
  }

  get(id: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${id}`);
  }

  save(item: T): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/save`, item);
  }

  delete(id: string): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}/${id}`);
  }
}
