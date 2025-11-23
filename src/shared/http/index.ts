import { http as tosslibHttp, isHttpError } from 'tosslib';

const BASE_URL = 'http://localhost:5173';

/**
 * HTTP 클라이언트 인터페이스
 * @description HTTP 요청을 수행하는 클라이언트의 추상화 인터페이스입니다.
 * 이 인터페이스를 구현하면 axios, fetch, tosslib 등 어떤 HTTP 클라이언트도 사용할 수 있습니다.
 */
export interface HttpClient {
  get<T>(url: string): Promise<T>;
  post<T>(url: string, data: unknown): Promise<T>;
  put<T>(url: string, data: unknown): Promise<T>;
  delete<T>(url: string): Promise<T>;
  patch<T>(url: string, data: unknown): Promise<T>;
}

/**
 * Tosslib Http 어댑터
 * @description tosslib의 http를 HttpClient 인터페이스에 맞게 래핑합니다.
 */
class TosslibHttpAdapter implements HttpClient {
  constructor(private readonly http: typeof tosslibHttp) {}

  async get<T>(url: string): Promise<T> {
    return this.handleRequest(() => this.http.get<T>(url));
  }

  async post<T>(url: string, data: unknown): Promise<T> {
    return this.handleRequest(() => this.http.post<T>(url, { json: data }));
  }

  async put<T>(url: string, data: unknown): Promise<T> {
    return this.handleRequest(() => this.http.put<T>(url, { json: data }));
  }

  async delete<T>(url: string): Promise<T> {
    return this.handleRequest(() => this.http.delete<T>(url));
  }

  async patch<T>(url: string, data: unknown): Promise<T> {
    return this.handleRequest(() => this.http.patch<T>(url, { json: data }));
  }

  private async handleRequest<T>(request: () => Promise<T>): Promise<T> {
    try {
      return await request();
    } catch (error) {
      if (isHttpError(error)) {
        // HTTP 에러인 경우 에러 정보를 포함하여 재throw
        throw error;
      }
      // 기타 에러인 경우 그대로 재throw
      throw error;
    }
  }
}

/**
 * 기본 HTTP 클라이언트
 * @description 기본 HTTP 클라이언트는 기본적인 HTTP 메서드를 제공합니다.
 * baseUrl을 자동으로 URL 앞에 추가하여 요청을 수행합니다.
 * @example
 * const http = new BaseHttp('https://api.example.com');
 * const response = await http.get<T>('/api/users');
 * console.log(response);
 */
export class BaseHttp implements HttpClient {
  constructor(
    private readonly baseUrl: string,
    private readonly client: HttpClient = new TosslibHttpAdapter(tosslibHttp)
  ) {}

  async get<T>(url: string): Promise<T> {
    return this.client.get<T>(`${this.baseUrl}${url}`);
  }

  async post<T>(url: string, data: unknown): Promise<T> {
    return this.client.post<T>(`${this.baseUrl}${url}`, data);
  }

  async put<T>(url: string, data: unknown): Promise<T> {
    return this.client.put<T>(`${this.baseUrl}${url}`, data);
  }

  async delete<T>(url: string): Promise<T> {
    return this.client.delete<T>(`${this.baseUrl}${url}`);
  }

  async patch<T>(url: string, data: unknown): Promise<T> {
    return this.client.patch<T>(`${this.baseUrl}${url}`, data);
  }
}

// BaseHttp 싱글톤 인스턴스 생성
export const baseHttp = new BaseHttp(BASE_URL);
