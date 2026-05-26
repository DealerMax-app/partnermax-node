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
   * List metadata for keys owned by the calling partner.
   *
   * Returns both active and revoked keys — partners can audit revoked keys via the
   * `is_active` flag. Key material is never returned.
   */
  list(options?: RequestOptions): APIPromise<KeyListResponse> {
    return this._client.get('/v1/keys', options);
  }

  /**
   * Issue a new API key. Plaintext returned exactly once.
   *
   * Capability gate: caller's key must hold `can_issue_keys`. The bootstrap key
   * handed to a partner by DealerMAX support carries this capability; keys minted
   * here inherit the _same_ capabilities as the caller, so partners can never
   * accidentally widen their own scope.
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
   * Revoke a key. Cannot revoke the key currently authenticating the request.
   */
  revoke(keyID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/v1/keys/${keyID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

/**
 * Response envelope for `GET /v1/keys`.
 */
export interface KeyListResponse {
  data: Array<KeyListResponse.Data>;
}

export namespace KeyListResponse {
  /**
   * Metadata-only representation of an API key. Safe to return on list calls.
   */
  export interface Data {
    created_at: string;

    expires_at: string | null;

    is_active: boolean;

    key_id: string;

    key_prefix: string;

    label: string;

    last_used_at: string | null;
  }
}

/**
 * One-time response for `POST /v1/keys/issue`.
 *
 * The `key` field is plaintext and is never retrievable again. Callers must
 * persist it immediately on receipt.
 */
export interface KeyIssueResponse {
  created_at: string;

  expires_at: string | null;

  /**
   * Plaintext key material. Returned ONCE — never retrievable again.
   */
  key: string;

  key_id: string;

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
  expires_at?: string | null;

  /**
   * Header param
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
