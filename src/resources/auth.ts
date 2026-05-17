// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

/**
 * Human session login (cookie JWT) and API key lifecycle management.
 */
export class Auth extends APIResource {
  /**
   * Authenticates a partner human user with email and password. Returns a session
   * JWT in an httpOnly Set-Cookie. Use this endpoint when a human needs to access
   * the partner dashboard (key issuance, billing review, log inspection).
   * Server-to-server integrations should use API keys directly and do not require
   * login.
   *
   * @example
   * ```ts
   * const response = await client.auth.login({
   *   email: 'ops@partner-saas.com',
   *   password: 'redacted',
   * });
   * ```
   */
  login(body: AuthLoginParams, options?: RequestOptions): APIPromise<AuthLoginResponse> {
    return this._client.post('/v1/auth/login', { body, ...options, __security: {} });
  }
}

export interface AuthLoginResponse {
  partner_id: string;

  session_expires_at: string;
}

export interface AuthLoginParams {
  email: string;

  password: string;
}

export declare namespace Auth {
  export { type AuthLoginResponse as AuthLoginResponse, type AuthLoginParams as AuthLoginParams };
}
