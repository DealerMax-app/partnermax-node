// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as ImagesAPI from './images';
import {
  ImageCreateParams,
  ImageDeleteParams,
  ImageListParams,
  Images,
  VehicleImage,
  VehicleImageList,
} from './images';
import { APIPromise } from '../../../core/api-promise';
import { buildHeaders } from '../../../internal/headers';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

/**
 * Used-vehicle stock management for partner-owned dealers. The partner uploads each used vehicle by its canonical Motornet UNI code; DealerMAX joins the partner-provided pricing and stock metadata with the catalog master so the resulting listing is immediately indexed by the AI surfaces (MCP server, ChatGPT Custom GPT, NLWeb /ask, and the SEO/JSON-LD layer).
 */
export class Vehicles extends APIResource {
  images: ImagesAPI.Images = new ImagesAPI.Images(this._client);

  /**
   * Provision a new used vehicle in a dealer's stock.
   *
   * Writes are atomic across `azlease_usatoin` and `azlease_usatoauto` using a
   * `SAVEPOINT` so a UNIQUE plate violation rolls back cleanly. On success the
   * AI-content worker (:mod:`azurenet-engine.app.jobs.usato_ai_content_worker`)
   * picks up the new row within 60 seconds and generates the SEO body + pgvector
   * embedding — at which point the vehicle becomes discoverable on the cross-network
   * MCP / Custom GPT / NLWeb surfaces. The response returns immediately (no
   * synchronous wait on the worker).
   */
  create(dealerID: string, params: VehicleCreateParams, options?: RequestOptions): APIPromise<VehicleDetail> {
    const { 'Idempotency-Key': idempotencyKey, ...body } = params;
    return this._client.post(path`/v1/dealers/${dealerID}/vehicles`, {
      body,
      ...options,
      headers: buildHeaders([
        { ...(idempotencyKey != null ? { 'Idempotency-Key': idempotencyKey } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * Get Vehicle
   */
  retrieve(
    vehicleID: string,
    params: VehicleRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<VehicleDetail> {
    const { dealer_id, ...query } = params;
    return this._client.get(path`/v1/dealers/${dealer_id}/vehicles/${vehicleID}`, { query, ...options });
  }

  /**
   * Partial update of a vehicle.
   *
   * Splits the inbound body across the two physical tables (`azlease_usatoauto` and
   * `azlease_usatoin`) and emits at most one UPDATE per table inside a single
   * transaction. Fields not present in the body are not touched.
   */
  update(
    vehicleID: string,
    params: VehicleUpdateParams,
    options?: RequestOptions,
  ): APIPromise<VehicleDetail> {
    const { dealer_id, 'Idempotency-Key': idempotencyKey, ...body } = params;
    return this._client.patch(path`/v1/dealers/${dealer_id}/vehicles/${vehicleID}`, {
      body,
      ...options,
      headers: buildHeaders([
        { ...(idempotencyKey != null ? { 'Idempotency-Key': idempotencyKey } : undefined) },
        options?.headers,
      ]),
    });
  }

  /**
   * List vehicles in a dealer's stock owned by the calling partner.
   *
   * Cursor pagination is opaque base64url over the last vehicle UUID. Default sort
   * is `i.data_inserimento ASC` so freshly provisioned vehicles surface at the tail.
   * Soft-deleted rows are excluded unless `include_deleted=true` is set explicitly —
   * this preserves the soft-delete semantic across the API contract.
   */
  list(
    dealerID: string,
    query: VehicleListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<VehicleList> {
    return this._client.get(path`/v1/dealers/${dealerID}/vehicles`, { query, ...options });
  }

  /**
   * Withdraw a vehicle from sale without deleting the row.
   *
   * Sets `azlease_usatoin.visibile = FALSE` and stamps `venduto_il = now()`. The
   * plate becomes reusable on the network the moment this returns (the
   * active-uniqueness check excludes rows where `visibile = FALSE` OR
   * `venduto_il IS NOT NULL`).
   *
   * Soft-delete is the canonical "remove this vehicle from sale" surface. The
   * AI-citation consumers (MCP `_tool_search_vehicles`, Custom GPT
   * `search_vehicles_network`, NLWeb `/ask`) each filter their own queries on
   * `i.visibile = TRUE AND i.venduto_il IS NULL` — the shared `v_apimax_listing`
   * view itself does not impose that filter, every consumer adds it. The result on
   * the partner side is the same: a soft-deleted vehicle disappears from every AI
   * surface within the next index cycle.
   *
   * Returns `409 vehicle_already_deleted` if the row is already soft- deleted — same
   * idempotency pattern as the dealers DELETE endpoint.
   */
  delete(vehicleID: string, params: VehicleDeleteParams, options?: RequestOptions): APIPromise<void> {
    const { dealer_id } = params;
    return this._client.delete(path`/v1/dealers/${dealer_id}/vehicles/${vehicleID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }

  /**
   * Provision up to `BULK_MAX_ROWS` vehicles in a single synchronous call.
   *
   * Each row is processed inside its own `SAVEPOINT` so a failure on row N
   * (validation, plate conflict, motornet not in catalogue, race) is isolated — the
   * SAVEPOINT rolls back, the per-row outcome is collected with a structured error
   * code, and the loop continues with row N+1.
   *
   * Successful rows accumulate in the outer transaction and are committed together
   * at the end of the request. Failed rows leave no trace in the database.
   *
   * Returns `207 Multi-Status`. The response carries:
   *
   * - `total`, `succeeded`, `failed` — aggregate counters for quick branch logic on
   *   the partner side.
   * - `results` — array of per-row outcomes, indexed by the position in the request
   *   `vehicles[]` array. Successful rows include the full `VehicleDetail`; failed
   *   rows include `error_code` + `error_message` keyed to the same codes as the
   *   single-POST surface so the partner reuses one error handler for both paths.
   *
   * For imports larger than `BULK_MAX_ROWS` (currently 100), the partner is expected
   * to chunk the array client-side. A 5 000-vehicle initial migration is 50 calls;
   * the partner controls concurrency.
   */
  bulk(
    dealerID: string,
    params: VehicleBulkParams,
    options?: RequestOptions,
  ): APIPromise<BulkCreateVehiclesResponse> {
    const { 'Idempotency-Key': idempotencyKey, ...body } = params;
    return this._client.post(path`/v1/dealers/${dealerID}/vehicles/bulk`, {
      body,
      ...options,
      headers: buildHeaders([
        { ...(idempotencyKey != null ? { 'Idempotency-Key': idempotencyKey } : undefined) },
        options?.headers,
      ]),
    });
  }
}

/**
 * Response of `POST /v1/dealers/{dealer_id}/vehicles/bulk`.
 *
 * HTTP status is `207 Multi-Status` (rather than 201) to make partial success
 * explicit at the protocol level. The aggregate counters at the top let a partner
 * short-circuit when every row succeeded; the `results` array carries per-row
 * detail when not.
 */
export interface BulkCreateVehiclesResponse {
  failed: number;

  results: Array<BulkRowOutcome>;

  succeeded: number;

  /**
   * Number of rows in the request body.
   */
  total: number;
}

/**
 * Per-row result inside `BulkCreateVehiclesResponse`.
 *
 * On success `vehicle` is populated (full `VehicleDetail`) and
 * `error_code`/`error_message` are null. On failure `vehicle` is null and
 * `error_code`/`error_message` carry the same code that the corresponding
 * single-create POST would have raised (e.g. `motornet_code_not_in_catalogue`,
 * `vehicle_plate_already_registered`, `validation_error`).
 */
export interface BulkRowOutcome {
  /**
   * Zero-based index of the row in the request `vehicles[]` array. Stable across
   * retries — the partner can correlate failures back to its own batch by this
   * index.
   */
  row_index: number;

  status: 'succeeded' | 'failed';

  error_code?: string | null;

  error_message?: string | null;

  /**
   * Full vehicle resource. Returned by `GET /v1/dealers/{id}/vehicles/{id}`,
   * `POST /v1/dealers/{id}/vehicles`, and `PATCH /v1/dealers/{id}/vehicles/{id}`.
   *
   * `technical_details` carries the flat Motornet specs dict (Italian column names
   * as keys: `cilindrata`, `kw`, `hp`, `lunghezza`, `consumo_medio`,
   * `emissioni_co2`, etc.). Same shape conventions as `NltOfferDetail`
   * (`feedback_partnermax_field_naming_us_english`: field names are English
   * snake_case, raw catalogue values stay verbatim).
   */
  vehicle?: VehicleDetail | null;
}

/**
 * Full vehicle resource. Returned by `GET /v1/dealers/{id}/vehicles/{id}`,
 * `POST /v1/dealers/{id}/vehicles`, and `PATCH /v1/dealers/{id}/vehicles/{id}`.
 *
 * `technical_details` carries the flat Motornet specs dict (Italian column names
 * as keys: `cilindrata`, `kw`, `hp`, `lunghezza`, `consumo_medio`,
 * `emissioni_co2`, etc.). Same shape conventions as `NltOfferDetail`
 * (`feedback_partnermax_field_naming_us_english`: field names are English
 * snake_case, raw catalogue values stay verbatim).
 */
export interface VehicleDetail {
  certified_km: number;

  cost_price_eur: number;

  created_at: string;

  dealer_id: string;

  description: string;

  extended_warranty_enabled: boolean;

  is_for_sale: boolean;

  is_visible: boolean;

  last_modified_at: string;

  motornet_code: string;

  partner_id: string;

  plate: string;

  registration_year: number;

  sale_price_eur: number;

  vat_displayed: boolean;

  vehicle_damaged: boolean;

  vehicle_id: string;

  alloy_wheel_size?: number | null;

  brand?: string | null;

  color?: string | null;

  extended_warranty_months?: number | null;

  fuel_type?: string | null;

  /**
   * Vehicle photos. Empty in v1 (media upload ships in v1.2).
   */
  image_urls?: Array<string>;

  inspection_expiry_date?: string | null;

  last_service_date?: string | null;

  last_service_km?: number | null;

  last_service_notes?: string | null;

  model?: string | null;

  notes?: string | null;

  previous_owner_count?: number | null;

  previous_ownership_transfer_date?: string | null;

  registration_month?: number | null;

  road_tax_expiry_date?: string | null;

  /**
   * Flat dict of every non-null `mnet_dettagli_usato` column for this
   * `motornet_code`. Keys stay in Italian because they are raw SQL column names;
   * native units preserved (mm, kg, kW, CV, g/km, etc.).
   */
  technical_details?: { [key: string]: unknown };

  trim?: string | null;

  vin?: string | null;
}

/**
 * Cursor-paginated list of vehicle summaries.
 */
export interface VehicleList {
  data: Array<VehicleSummary>;

  has_more: boolean;

  next_cursor?: string | null;
}

/**
 * Compact vehicle payload for list endpoints.
 *
 * Catalogue fields (`brand`, `model`, `trim`, `fuel_type`) are derived from
 * `mnet_dettagli` at read time. Italian raw labels are surfaced verbatim — same
 * convention as NLT (`apimax`-aligned).
 */
export interface VehicleSummary {
  certified_km: number;

  created_at: string;

  dealer_id: string;

  is_for_sale: boolean;

  is_visible: boolean;

  motornet_code: string;

  plate: string;

  registration_year: number;

  sale_price_eur: number;

  vehicle_id: string;

  brand?: string | null;

  color?: string | null;

  fuel_type?: string | null;

  model?: string | null;

  trim?: string | null;
}

export interface VehicleCreateParams {
  /**
   * Body param: Certified odometer reading at intake, in kilometres.
   */
  certified_km: number;

  /**
   * Body param: Cost basis to the dealer in EUR (partner/dealer internal). Not
   * surfaced on consumer-facing AI surfaces; used by dealer reporting and margin
   * analytics only.
   */
  cost_price_eur: number;

  /**
   * Body param: Motornet UNI code identifying the exact vehicle configuration. Must
   * exist in `mnet_dettagli_usato` at submission time; otherwise the call returns
   * 422 `motornet_code_not_in_catalogue`. The partner is expected to source this
   * from its own DMS; partnermax does not expose a plate→code lookup.
   */
  motornet_code: string;

  /**
   * Body param: Italian licence plate. Uppercased server-side. UNIQUE across the
   * network for active vehicles (`visibile=true AND venduto_il IS NULL`); reusable
   * once the previous holder sells/hides the row.
   */
  plate: string;

  /**
   * Body param: Year of first registration. Upper bound is current year + 1.
   */
  registration_year: number;

  /**
   * Body param: Public sale price in EUR. Surfaced on MCP / Custom GPT / NLWeb and
   * on the dealer's site JSON-LD `Offer.price`.
   */
  sale_price_eur: number;

  /**
   * Body param
   */
  alloy_wheel_size?: number | null;

  /**
   * Body param
   */
  color?: string | null;

  /**
   * Body param: Partner-supplied long description. Surfaced on the dealer site
   * detail page.
   */
  description?: string;

  /**
   * Body param
   */
  extended_warranty_enabled?: boolean;

  /**
   * Body param
   */
  extended_warranty_months?: number | null;

  /**
   * Body param
   */
  inspection_expiry_date?: string | null;

  /**
   * Body param: Maps to `azlease_usatoauto.is_vendita_enabled`. When false the row
   * is in stock but not offered for sale.
   */
  is_for_sale?: boolean;

  /**
   * Body param: Soft-publish flag. When false the row exists in stock but is
   * excluded from consumer-facing AI surfaces. Maps to `azlease_usatoin.visibile`.
   */
  is_visible?: boolean;

  /**
   * Body param
   */
  last_service_date?: string | null;

  /**
   * Body param
   */
  last_service_km?: number | null;

  /**
   * Body param
   */
  last_service_notes?: string | null;

  /**
   * Body param: Free-form short notes; surfaced as
   * `mnet_dettagli.precisazioni`-style.
   */
  notes?: string | null;

  /**
   * Body param
   */
  previous_owner_count?: number | null;

  /**
   * Body param: Date of the most recent ownership transfer, if known.
   */
  previous_ownership_transfer_date?: string | null;

  /**
   * Body param: Month of registration (1–12).
   */
  registration_month?: number | null;

  /**
   * Body param
   */
  road_tax_expiry_date?: string | null;

  /**
   * Body param: If true the public price is displayed VAT-exposed (B2B); otherwise
   * VAT-inclusive (B2C).
   */
  vat_displayed?: boolean;

  /**
   * Body param
   */
  vehicle_damaged?: boolean;

  /**
   * Body param: ISO 3779 vehicle identification number. Optional but strongly
   * recommended.
   */
  vin?: string | null;

  /**
   * Header param
   */
  'Idempotency-Key'?: string;
}

export interface VehicleRetrieveParams {
  /**
   * Path param
   */
  dealer_id: string;

  /**
   * Query param: If true, the detail of a soft-deleted vehicle is returned. Default
   * false — soft-deleted rows return 404 to keep behaviour consistent with the list
   * endpoint.
   */
  include_deleted?: boolean;
}

export interface VehicleUpdateParams {
  /**
   * Path param
   */
  dealer_id: string;

  /**
   * Body param
   */
  alloy_wheel_size?: number | null;

  /**
   * Body param
   */
  certified_km?: number | null;

  /**
   * Body param
   */
  color?: string | null;

  /**
   * Body param
   */
  cost_price_eur?: number | null;

  /**
   * Body param
   */
  description?: string | null;

  /**
   * Body param
   */
  extended_warranty_enabled?: boolean | null;

  /**
   * Body param
   */
  extended_warranty_months?: number | null;

  /**
   * Body param
   */
  inspection_expiry_date?: string | null;

  /**
   * Body param
   */
  is_for_sale?: boolean | null;

  /**
   * Body param
   */
  is_visible?: boolean | null;

  /**
   * Body param
   */
  last_service_date?: string | null;

  /**
   * Body param
   */
  last_service_km?: number | null;

  /**
   * Body param
   */
  last_service_notes?: string | null;

  /**
   * Body param
   */
  notes?: string | null;

  /**
   * Body param
   */
  previous_owner_count?: number | null;

  /**
   * Body param
   */
  previous_ownership_transfer_date?: string | null;

  /**
   * Body param
   */
  registration_month?: number | null;

  /**
   * Body param
   */
  road_tax_expiry_date?: string | null;

  /**
   * Body param
   */
  sale_price_eur?: number | null;

  /**
   * Body param
   */
  vat_displayed?: boolean | null;

  /**
   * Body param
   */
  vehicle_damaged?: boolean | null;

  /**
   * Header param
   */
  'Idempotency-Key'?: string;
}

export interface VehicleListParams {
  cursor?: string | null;

  /**
   * If true, soft-deleted rows (`venduto_il` populated) are also returned. Default
   * false — listings hide soft-deleted vehicles.
   */
  include_deleted?: boolean;

  /**
   * Filter on the sale flag.
   */
  is_for_sale?: boolean | null;

  /**
   * Filter on the visibility flag.
   */
  is_visible?: boolean | null;

  limit?: number;
}

export interface VehicleDeleteParams {
  dealer_id: string;
}

export interface VehicleBulkParams {
  /**
   * Body param: Array of vehicles to create. Between 1 and 100 rows per call. For
   * larger imports, the partner is expected to chunk client-side (e.g. 50 calls of
   * 100 rows each for a 5 000-vehicle migration).
   */
  vehicles: Array<VehicleBulkParams.Vehicle>;

  /**
   * Header param
   */
  'Idempotency-Key'?: string;
}

export namespace VehicleBulkParams {
  /**
   * Request body for vehicle provisioning.
   *
   * The partner sends a small, vehicle-specific payload. All technical specs (brand,
   * model, trim, fuel type, displacement, dimensions, CO2, etc.) are derived
   * server-side from `mnet_dettagli` via the `motornet_code` join — the partner
   * never types them. This is the same canonical pattern used by NLT offers and
   * matches the platform rule `feedback_motornet_authoritative`.
   *
   * Fields immutable after creation: `motornet_code`, `plate`, `vin`. Other fields
   * may be updated via PATCH.
   */
  export interface Vehicle {
    /**
     * Certified odometer reading at intake, in kilometres.
     */
    certified_km: number;

    /**
     * Cost basis to the dealer in EUR (partner/dealer internal). Not surfaced on
     * consumer-facing AI surfaces; used by dealer reporting and margin analytics only.
     */
    cost_price_eur: number;

    /**
     * Motornet UNI code identifying the exact vehicle configuration. Must exist in
     * `mnet_dettagli_usato` at submission time; otherwise the call returns 422
     * `motornet_code_not_in_catalogue`. The partner is expected to source this from
     * its own DMS; partnermax does not expose a plate→code lookup.
     */
    motornet_code: string;

    /**
     * Italian licence plate. Uppercased server-side. UNIQUE across the network for
     * active vehicles (`visibile=true AND venduto_il IS NULL`); reusable once the
     * previous holder sells/hides the row.
     */
    plate: string;

    /**
     * Year of first registration. Upper bound is current year + 1.
     */
    registration_year: number;

    /**
     * Public sale price in EUR. Surfaced on MCP / Custom GPT / NLWeb and on the
     * dealer's site JSON-LD `Offer.price`.
     */
    sale_price_eur: number;

    alloy_wheel_size?: number | null;

    color?: string | null;

    /**
     * Partner-supplied long description. Surfaced on the dealer site detail page.
     */
    description?: string;

    extended_warranty_enabled?: boolean;

    extended_warranty_months?: number | null;

    inspection_expiry_date?: string | null;

    /**
     * Maps to `azlease_usatoauto.is_vendita_enabled`. When false the row is in stock
     * but not offered for sale.
     */
    is_for_sale?: boolean;

    /**
     * Soft-publish flag. When false the row exists in stock but is excluded from
     * consumer-facing AI surfaces. Maps to `azlease_usatoin.visibile`.
     */
    is_visible?: boolean;

    last_service_date?: string | null;

    last_service_km?: number | null;

    last_service_notes?: string | null;

    /**
     * Free-form short notes; surfaced as `mnet_dettagli.precisazioni`-style.
     */
    notes?: string | null;

    previous_owner_count?: number | null;

    /**
     * Date of the most recent ownership transfer, if known.
     */
    previous_ownership_transfer_date?: string | null;

    /**
     * Month of registration (1–12).
     */
    registration_month?: number | null;

    road_tax_expiry_date?: string | null;

    /**
     * If true the public price is displayed VAT-exposed (B2B); otherwise VAT-inclusive
     * (B2C).
     */
    vat_displayed?: boolean;

    vehicle_damaged?: boolean;

    /**
     * ISO 3779 vehicle identification number. Optional but strongly recommended.
     */
    vin?: string | null;
  }
}

Vehicles.Images = Images;

export declare namespace Vehicles {
  export {
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

  export {
    Images as Images,
    type VehicleImage as VehicleImage,
    type VehicleImageList as VehicleImageList,
    type ImageCreateParams as ImageCreateParams,
    type ImageListParams as ImageListParams,
    type ImageDeleteParams as ImageDeleteParams,
  };
}
