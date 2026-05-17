// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as NltSettingsAPI from './nlt-settings';
import { DownPaymentTiers, NltSettingUpdateParams, NltSettings } from './nlt-settings';
import * as NltAPI from './nlt/nlt';
import { Nlt } from './nlt/nlt';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Provision, update, deactivate, and list dealers owned by the calling partner.
 */
export class Dealers extends APIResource {
  nltSettings: NltSettingsAPI.NltSettings = new NltSettingsAPI.NltSettings(this._client);
  nlt: NltAPI.Nlt = new NltAPI.Nlt(this._client);

  /**
   * Creates a new dealer as a child of the calling partner account. The dealer is
   * indexed in the cross-network AI-citation surfaces (MCP, Custom GPT, NLWeb,
   * llms.txt) within five minutes. The partner is responsible for ensuring the
   * business has consented to this provisioning and that the data provided is
   * accurate.
   *
   * Idempotent on `Idempotency-Key` for 24 hours.
   *
   * @example
   * ```ts
   * const dealerDetail = await client.dealers.create({
   *   business_name: 'Rossi Automobili S.R.L.',
   *   contact_email: 'info@rossi-auto.it',
   *   postal_code: '20121',
   *   primary_domain: 'rossi-auto.it',
   *   province_code: 'MI',
   *   vat_number: 'IT01234567890',
   *   activate: true,
   *   contact_phone: '+390212345678',
   *   metadata: { partner_internal_id: 'DLR-9182' },
   * });
   * ```
   */
  create(params: DealerCreateParams, options?: RequestOptions): APIPromise<DealerDetail> {
    const { 'Idempotency-Key': idempotencyKey, ...body } = params;
    return this._client.post('/v1/dealers', {
      body,
      ...options,
      headers: buildHeaders([
        { ...(idempotencyKey != null ? { 'Idempotency-Key': idempotencyKey } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Get a dealer's full detail
   *
   * @example
   * ```ts
   * const dealerDetail = await client.dealers.retrieve(
   *   'dealer_id',
   * );
   * ```
   */
  retrieve(dealerID: string, options?: RequestOptions): APIPromise<DealerDetail> {
    return this._client.get(path`/v1/dealers/${dealerID}`, options);
  }

  /**
   * Partial update of dealer fields. Only provided fields are modified. Setting
   * `status: "inactive"` removes the dealer from the cross-network AI-citation
   * surfaces within five minutes. Reactivation: send `status: "active"`.
   *
   * @example
   * ```ts
   * const dealerDetail = await client.dealers.update(
   *   'dealer_id',
   * );
   * ```
   */
  update(dealerID: string, params: DealerUpdateParams, options?: RequestOptions): APIPromise<DealerDetail> {
    const { 'Idempotency-Key': idempotencyKey, ...body } = params;
    return this._client.patch(path`/v1/dealers/${dealerID}`, {
      body,
      ...options,
      headers: buildHeaders([
        { ...(idempotencyKey != null ? { 'Idempotency-Key': idempotencyKey } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Returns a cursor-paginated list of dealers belonging to the calling partner.
   * Default ordering: most recently created first.
   *
   * @example
   * ```ts
   * const dealers = await client.dealers.list();
   * ```
   */
  list(
    query: DealerListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<DealerListResponse> {
    return this._client.get('/v1/dealers', { query, ...options });
  }

  /**
   * Marks the dealer as deleted while preserving the audit trail. Unlike
   * deactivation (`PATCH status=inactive`), a deleted dealer cannot be reactivated
   * by the partner — re-creation requires DealerMAX support. Use deactivation for
   * reversible suspensions.
   *
   * @example
   * ```ts
   * await client.dealers.delete('dealer_id');
   * ```
   */
  delete(dealerID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/v1/dealers/${dealerID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

export interface DealerDetail extends DealerSummary {
  contact_email?: string;

  contact_phone?: string | null;

  /**
   * Live indexing state for each cross-network AI surface. Values may be `false`
   * immediately after provisioning; reaches `true` within five minutes.
   */
  indexed_in_surfaces?: DealerDetail.IndexedInSurfaces;

  metadata?: { [key: string]: string };

  nlt_settings?: NltSettingsAPI.NltSettings;

  partner_id?: string;

  postal_code?: string;

  vat_number?: string;
}

export namespace DealerDetail {
  /**
   * Live indexing state for each cross-network AI surface. Values may be `false`
   * immediately after provisioning; reaches `true` within five minutes.
   */
  export interface IndexedInSurfaces {
    custom_gpt?: boolean;

    llms_txt?: boolean;

    mcp?: boolean;

    nlweb?: boolean;
  }
}

export interface DealerSummary {
  business_name: string;

  created_at: string;

  dealer_id: string;

  nlt_enabled: boolean;

  primary_domain: string;

  province_code: string;

  status: 'active' | 'inactive' | 'deleted';

  last_active_at?: string;
}

export interface DealerListResponse {
  data: Array<DealerSummary>;

  has_more: boolean;

  /**
   * Pass as `cursor` to retrieve next page; null when no more pages.
   */
  next_cursor?: string | null;
}

export interface DealerCreateParams {
  /**
   * Body param
   */
  business_name: string;

  /**
   * Body param
   */
  contact_email: string;

  /**
   * Body param: Italian 5-digit postal code.
   */
  postal_code: string;

  /**
   * Body param: Root domain of the dealer's public website.
   */
  primary_domain: string;

  /**
   * Body param: Italian two-letter province code, e.g., `MI`, `RM`, `TO`.
   */
  province_code: string;

  /**
   * Body param: Italian VAT number, 11 digits prefixed with `IT`.
   */
  vat_number: string;

  /**
   * Body param: If false, dealer is created in inactive state and does not appear in
   * AI surfaces until activated.
   */
  activate?: boolean;

  /**
   * Body param: E.164 format recommended.
   */
  contact_phone?: string;

  /**
   * Body param: Free-form partner-supplied key-value pairs, max 16 keys, values max
   * 500 chars.
   */
  metadata?: { [key: string]: string };

  /**
   * Header param: Stripe-style idempotency key. Replaying the same request with the
   * same key within 24 hours returns the original response without re-executing.
   * Strongly recommended on all POST, PATCH, and DELETE requests.
   */
  'Idempotency-Key'?: string;
}

export interface DealerUpdateParams {
  /**
   * Body param
   */
  business_name?: string;

  /**
   * Body param
   */
  contact_email?: string;

  /**
   * Body param
   */
  contact_phone?: string;

  /**
   * Body param
   */
  metadata?: { [key: string]: string };

  /**
   * Body param
   */
  postal_code?: string;

  /**
   * Body param
   */
  province_code?: string;

  /**
   * Body param: Toggle activation. Inactive dealers are removed from AI surfaces
   * within 5 minutes.
   */
  status?: 'active' | 'inactive';

  /**
   * Header param: Stripe-style idempotency key. Replaying the same request with the
   * same key within 24 hours returns the original response without re-executing.
   * Strongly recommended on all POST, PATCH, and DELETE requests.
   */
  'Idempotency-Key'?: string;
}

export interface DealerListParams {
  /**
   * Opaque pagination cursor from a previous response's `next_cursor`.
   */
  cursor?: string;

  /**
   * Maximum number of items to return.
   */
  limit?: number;

  /**
   * Filter by dealer status.
   */
  status?: 'active' | 'inactive' | 'all';
}

Dealers.Nlt = Nlt;

export declare namespace Dealers {
  export {
    type DealerDetail as DealerDetail,
    type DealerSummary as DealerSummary,
    type DealerListResponse as DealerListResponse,
    type DealerCreateParams as DealerCreateParams,
    type DealerUpdateParams as DealerUpdateParams,
    type DealerListParams as DealerListParams,
  };

  export {
    type NltSettings as NltSettings,
    type DownPaymentTiers as DownPaymentTiers,
    type NltSettingUpdateParams as NltSettingUpdateParams,
  };

  export { Nlt as Nlt };
}
