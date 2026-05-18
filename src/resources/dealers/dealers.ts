// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as NltSettingsAPI from './nlt-settings';
import { DownPaymentTiers, NltSettingUpdateParams, NltSettings } from './nlt-settings';
import * as VehiclesAPI from './vehicles';
import {
  BulkCreateVehiclesResponse,
  BulkRowOutcome,
  VehicleBulkParams,
  VehicleCreateParams,
  VehicleDeleteParams,
  VehicleDetail,
  VehicleList,
  VehicleListParams,
  VehicleRetrieveParams,
  VehicleSummary,
  VehicleUpdateParams,
  Vehicles,
} from './vehicles';
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
  vehicles: VehiclesAPI.Vehicles = new VehiclesAPI.Vehicles(this._client);

  /**
   * Provision a new dealer as child of the calling partner.
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
   * Fetch a dealer's full detail. ACL-protected.
   */
  retrieve(dealerID: string, options?: RequestOptions): APIPromise<DealerDetail> {
    return this._client.get(path`/v1/dealers/${dealerID}`, options);
  }

  /**
   * Update or toggle status. Inactive dealers drop from AI surfaces within 5 min.
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
   * List dealers owned by the calling partner. Cursor-paginated.
   */
  list(
    query: DealerListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<DealerListResponse> {
    return this._client.get('/v1/dealers', { query, ...options });
  }

  /**
   * Soft-delete. Audit trail retained; reactivation requires DealerMAX support.
   */
  delete(dealerID: string, options?: RequestOptions): APIPromise<void> {
    return this._client.delete(path`/v1/dealers/${dealerID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

/**
 * Full dealer payload used by single-resource and write endpoints.
 */
export interface DealerDetail {
  address: string;

  business_name: string;

  city: string;

  contact_email: string;

  created_at: string;

  dealer_id: string;

  nlt_enabled: boolean;

  partner_id: string;

  postal_code: string;

  primary_domain: string;

  province_code: string;

  status: 'active' | 'inactive' | 'deleted';

  vat_number: string;

  contact_phone?: string | null;

  /**
   * Per-surface AI indexing state. All values may be `false` immediately after
   * provisioning; reconciliation by `azurenet-engine` flips them within five
   * minutes.
   */
  indexed_in_surfaces?: DealerDetail.IndexedInSurfaces;

  last_active_at?: string | null;

  metadata?: { [key: string]: string };

  nlt_settings?: { [key: string]: unknown } | null;
}

export namespace DealerDetail {
  /**
   * Per-surface AI indexing state. All values may be `false` immediately after
   * provisioning; reconciliation by `azurenet-engine` flips them within five
   * minutes.
   */
  export interface IndexedInSurfaces {
    custom_gpt?: boolean;

    llms_txt?: boolean;

    mcp?: boolean;

    nlweb?: boolean;
  }
}

/**
 * Compact dealer payload used by list endpoints.
 */
export interface DealerSummary {
  business_name: string;

  created_at: string;

  dealer_id: string;

  nlt_enabled: boolean;

  primary_domain: string;

  province_code: string;

  status: 'active' | 'inactive' | 'deleted';

  last_active_at?: string | null;
}

/**
 * Response envelope for `GET /v1/dealers`.
 */
export interface DealerListResponse {
  data: Array<DealerSummary>;

  has_more: boolean;

  next_cursor?: string | null;
}

export interface DealerCreateParams {
  /**
   * Body param
   */
  address: string;

  /**
   * Body param
   */
  business_name: string;

  /**
   * Body param
   */
  city: string;

  /**
   * Body param
   */
  contact_email: string;

  /**
   * Body param
   */
  contact_phone: string;

  /**
   * Body param
   */
  postal_code: string;

  /**
   * Body param
   */
  primary_domain: string;

  /**
   * Body param
   */
  province_code: string;

  /**
   * Body param
   */
  vat_number: string;

  /**
   * Body param
   */
  activate?: boolean;

  /**
   * Body param
   */
  metadata?: { [key: string]: string };

  /**
   * Header param
   */
  'Idempotency-Key'?: string;
}

export interface DealerUpdateParams {
  /**
   * Body param
   */
  address?: string | null;

  /**
   * Body param
   */
  business_name?: string | null;

  /**
   * Body param
   */
  city?: string | null;

  /**
   * Body param
   */
  contact_email?: string | null;

  /**
   * Body param
   */
  contact_phone?: string | null;

  /**
   * Body param
   */
  metadata?: { [key: string]: string } | null;

  /**
   * Body param
   */
  postal_code?: string | null;

  /**
   * Body param
   */
  province_code?: string | null;

  /**
   * Body param
   */
  status?: 'active' | 'inactive' | null;

  /**
   * Header param
   */
  'Idempotency-Key'?: string;
}

export interface DealerListParams {
  cursor?: string | null;

  limit?: number;

  status?: 'active' | 'inactive' | 'all';
}

Dealers.Nlt = Nlt;
Dealers.Vehicles = Vehicles;

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

  export {
    Vehicles as Vehicles,
    type BulkCreateVehiclesResponse as BulkCreateVehiclesResponse,
    type BulkRowOutcome as BulkRowOutcome,
    type VehicleDetail as VehicleDetail,
    type VehicleList as VehicleList,
    type VehicleSummary as VehicleSummary,
    type VehicleCreateParams as VehicleCreateParams,
    type VehicleRetrieveParams as VehicleRetrieveParams,
    type VehicleUpdateParams as VehicleUpdateParams,
    type VehicleListParams as VehicleListParams,
    type VehicleDeleteParams as VehicleDeleteParams,
    type VehicleBulkParams as VehicleBulkParams,
  };
}
