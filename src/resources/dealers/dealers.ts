// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as NltSettingsAPI from './nlt-settings';
import { DownPaymentTiers, NltSettingUpdateParams, NltSettings } from './nlt-settings';
import * as NltAPI from './nlt/nlt';
import { Nlt } from './nlt/nlt';
import * as VehiclesAPI from './vehicles/vehicles';
import {
  AIContent,
  BulkCreateVehiclesResponse,
  BulkRowOutcome,
  VehicleBulkParams,
  VehicleCreateParams,
  VehicleDeleteParams,
  VehicleDetail,
  VehicleList,
  VehicleListParams,
  VehicleRetrieveParams,
  VehicleSummariesCursorPage,
  VehicleSummary,
  VehicleUpdateParams,
  Vehicles,
} from './vehicles/vehicles';
import { APIPromise } from '../../core/api-promise';
import { CursorPage, type CursorPageParams, PagePromise } from '../../core/pagination';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Register, update, deactivate, and list dealer references registered for the calling partner.
 */
export class Dealers extends APIResource {
  nltSettings: NltSettingsAPI.NltSettings = new NltSettingsAPI.NltSettings(this._client);
  nlt: NltAPI.Nlt = new NltAPI.Nlt(this._client);
  vehicles: VehiclesAPI.Vehicles = new VehiclesAPI.Vehicles(this._client);

  /**
   * Register an opaque dealer reference for this partner. SDK users call
   * `client.dealers.create(...)`; the generated client sends this request to the
   * core-owned `/api/partner/dealers` route.
   */
  create(params: DealerCreateParams, options?: RequestOptions): APIPromise<PartnerDealerResponse> {
    const { 'Idempotency-Key': idempotencyKey, ...body } = params;
    return this._client.post('/api/partner/dealers', {
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
   * List dealer references registered for the calling partner. Cursor-paginated.
   */
  list(
    query: DealerListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<DealerSummariesCursorPage, DealerSummary> {
    return this._client.getAPIList('/v1/dealers', CursorPage<DealerSummary>, { query, ...options });
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

export type DealerSummariesCursorPage = CursorPage<DealerSummary>;

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
 * Partner dealer registry response. Use dealer_id as the path parameter for
 * vehicle and NLT SDK calls.
 */
export interface PartnerDealerResponse {
  created_at: string;

  /**
   * The partner-supplied external dealer id.
   */
  dealer_id: string;

  partner_id: string;

  public_surfaces_enabled: boolean;

  status: 'active' | 'suspended' | 'revoked';

  updated_at: string;

  /**
   * True only when this request inserted the registry row.
   */
  created?: boolean;
}

export interface DealerCreateParams {
  /**
   * Body param: Partner-supplied opaque dealer id. This becomes the dealer_id used
   * by vehicle and NLT SDK calls.
   */
  external_dealer_id: string;

  /**
   * Body param: When true, the dealer can immediately receive vehicle/NLT
   * operations. When false, create the registry row but keep it suspended until
   * activated.
   */
  activate?: boolean;

  /**
   * Body param: Optional scalar partner-side correlation metadata.
   */
  metadata?: { [key: string]: string | number | boolean | null };

  /**
   * Header param: Recommended stable key per logical dealer provisioning operation.
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

export interface DealerListParams extends CursorPageParams {
  status?: 'active' | 'inactive' | 'all';
}

Dealers.Nlt = Nlt;
Dealers.Vehicles = Vehicles;

export declare namespace Dealers {
  export {
    type DealerDetail as DealerDetail,
    type DealerSummary as DealerSummary,
    type PartnerDealerResponse as PartnerDealerResponse,
    type DealerSummariesCursorPage as DealerSummariesCursorPage,
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
    type AIContent as AIContent,
    type BulkCreateVehiclesResponse as BulkCreateVehiclesResponse,
    type BulkRowOutcome as BulkRowOutcome,
    type VehicleDetail as VehicleDetail,
    type VehicleList as VehicleList,
    type VehicleSummary as VehicleSummary,
    type VehicleSummariesCursorPage as VehicleSummariesCursorPage,
    type VehicleCreateParams as VehicleCreateParams,
    type VehicleRetrieveParams as VehicleRetrieveParams,
    type VehicleUpdateParams as VehicleUpdateParams,
    type VehicleListParams as VehicleListParams,
    type VehicleDeleteParams as VehicleDeleteParams,
    type VehicleBulkParams as VehicleBulkParams,
  };
}
