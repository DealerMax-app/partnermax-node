// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

/**
 * API key lifecycle management — issue, list, revoke. The partner authenticates every request with `X-Api-Key` (preferred) or `Authorization: Bearer <key>`; the server identifies the partner from the key and scopes all reads/writes to dealers owned by that partner.
 */
export class Keys extends APIResource {
  /**
   * Returns metadata for all active keys belonging to the calling partner. Key
   * material is never returned — only the prefix (first 8 characters) for safe
   * logging and identification.
   *
   * @example
   * ```ts
   * const keys = await client.keys.list();
   * ```
   */
  list(options?: RequestOptions): APIPromise<KeyListResponse> {
    return this._client.get('/v1/keys', options);
  }

  /**
   * Creates a new API key for the calling partner. The key material is returned in
   * plaintext in the response and is never retrievable again — store it securely on
   * first receipt. Must be called with an existing API key that has the
   * `can_issue_keys` capability (the initial key issued by DealerMAX support has
   * this capability by default; rotated keys inherit it unless explicitly scoped
   * down).
   *
   * @example
   * ```ts
   * const response = await client.keys.issue({
   *   label: 'production-backend-2026',
   * });
   * ```
   */
  issue(params: KeyIssueParams, options?: RequestOptions): APIPromise<KeyIssueResponse> {
    const { 'Idempotency-Key': idempotencyKey, ...body } = params;
    return this._client.post('/v1/keys/issue', {
      body,
      ...options,
      headers: buildHeaders([
        { ...(idempotencyKey != null ? { 'Idempotency-Key': idempotencyKey } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Immediately invalidates the specified key. Any in-flight requests using this key
   * will continue until completion; subsequent requests will receive 401
   * invalid_api_key. Revocation is logged in the audit trail.
   *
   * @example
   * ```ts
   * await client.keys.revoke('key_id');
   * ```
   */
  revoke(keyID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/v1/keys/${keyID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export interface KeyListResponse {
  data: Array<KeyListResponse.Data>;
}

export namespace KeyListResponse {
  export interface Data {
    created_at: string;

    is_active: boolean;

    key_id: string;

    key_prefix: string;

    label: string;

    expires_at?: string;

    last_used_at?: string;
  }
}

export interface KeyIssueResponse {
  created_at: string;

  expires_at: string;

  /**
   * Plaintext key material. Returned ONCE — never retrievable again. Store securely.
   */
  key: string;

  key_id: string;

  /**
   * First 8 characters of the key, safe for logging.
   */
  key_prefix: string;

  label: string;
}

export interface KeyIssueParams {
  /**
   * Body param: Human-readable identifier for this key, used for safe logging.
   */
  label: string;

  /**
   * Body param: Optional expiry timestamp. Null = never expires until revoked.
   */
  expires_at?: string;

  /**
   * Header param: Stripe-style idempotency key. Replaying the same request with the
   * same key within 24 hours returns the original response without re-executing.
   * Strongly recommended on all POST, PATCH, and DELETE requests.
   */
  'Idempotency-Key'?: string;
}

export declare namespace Keys {
  export {
    type KeyListResponse as KeyListResponse,
    type KeyIssueResponse as KeyIssueResponse,
    type KeyIssueParams as KeyIssueParams,
  };
}
