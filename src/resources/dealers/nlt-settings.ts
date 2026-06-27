// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

export class NltSettings extends APIResource {
  /**
   * Return current NLT economics for the dealer.
   */
  retrieve(dealerID: string, options?: RequestOptions): APIPromise<NltSettings> {
    return this._client.get(path`/v1/dealers/${dealerID}/nlt-settings`, options);
  }

  /**
   * Set markup percent (0-10), three down-payment tiers, and image mode.
   *
   * Validation:
   *
   * - `agency_markup_percent` ∈ [0, 10] (Pydantic).
   * - `down_payment_tiers.{low,medium,high}` each
   *   `{percent_of_list (0–100), fixed_eur (≥0)}`. No strict-ascending check — the
   *   final EUR per tier is offer-dependent (`listino_imponibile * pct + eur`).
   *
   * The stored economics are immediately used by DealerMAX's dealer-aware NLT
   * calculator. There is NO `vat_treatment` field: VAT is per-offer, not per-dealer.
   * The offer detail endpoint surfaces it per row instead.
   *
   * `Idempotency-Key` replay uses the shared endpoint helper; a re-applied identical
   * PATCH is also a row-level no-op by construction.
   */
  update(
    dealerID: string,
    params: NltSettingUpdateParams,
    options?: RequestOptions,
  ): APIPromise<NltSettings> {
    const { 'Idempotency-Key': idempotencyKey, ...body } = params;
    return this._client.patch(path`/v1/dealers/${dealerID}/nlt-settings`, {
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
 * Three down-payment scenarios (basso / medio / alto).
 *
 * No strict-ascending validation: the final EUR amount depends on the offer's list
 * price (`tier.percent_of_list / 100 * listino_imponibile + tier.fixed_eur`), so a
 * tier that looks larger by % can produce a smaller EUR on cheap vehicles. Label
 * semantics (low/medium/high) are advisory — DealerMAX UI treats the 3 positions
 * as opaque slots ordered by intent.
 */
export interface DownPaymentTiers {
  /**
   * One down-payment tier — percent of list price + flat EUR.
   *
   * Partnermax API exposes `percent_of_list` as a 0–100 number (UI-friendly: write
   * `12.5`, not `0.125`). The final EUR applied to a deal is computed from the
   * offer's IVA-excluded list price plus the flat component.
   */
  high: DownPaymentTiers.High;

  /**
   * One down-payment tier — percent of list price + flat EUR.
   *
   * Partnermax API exposes `percent_of_list` as a 0–100 number (UI-friendly: write
   * `12.5`, not `0.125`). The final EUR applied to a deal is computed from the
   * offer's IVA-excluded list price plus the flat component.
   */
  low: DownPaymentTiers.Low;

  /**
   * One down-payment tier — percent of list price + flat EUR.
   *
   * Partnermax API exposes `percent_of_list` as a 0–100 number (UI-friendly: write
   * `12.5`, not `0.125`). The final EUR applied to a deal is computed from the
   * offer's IVA-excluded list price plus the flat component.
   */
  medium: DownPaymentTiers.Medium;
}

export namespace DownPaymentTiers {
  /**
   * One down-payment tier — percent of list price + flat EUR.
   *
   * Partnermax API exposes `percent_of_list` as a 0–100 number (UI-friendly: write
   * `12.5`, not `0.125`). The final EUR applied to a deal is computed from the
   * offer's IVA-excluded list price plus the flat component.
   */
  export interface High {
    /**
     * Flat EUR component added on top of the percentage (e.g. promo
     * `0% + 500 EUR fissi`). Whole euros only.
     */
    fixed_eur: number;

    /**
     * Percentage of the IVA-excluded list price applied as down payment for this tier.
     * Range 0–100. Typical defaults: 0 (low), 12.5 (medium), 25 (high).
     */
    percent_of_list: number;
  }

  /**
   * One down-payment tier — percent of list price + flat EUR.
   *
   * Partnermax API exposes `percent_of_list` as a 0–100 number (UI-friendly: write
   * `12.5`, not `0.125`). The final EUR applied to a deal is computed from the
   * offer's IVA-excluded list price plus the flat component.
   */
  export interface Low {
    /**
     * Flat EUR component added on top of the percentage (e.g. promo
     * `0% + 500 EUR fissi`). Whole euros only.
     */
    fixed_eur: number;

    /**
     * Percentage of the IVA-excluded list price applied as down payment for this tier.
     * Range 0–100. Typical defaults: 0 (low), 12.5 (medium), 25 (high).
     */
    percent_of_list: number;
  }

  /**
   * One down-payment tier — percent of list price + flat EUR.
   *
   * Partnermax API exposes `percent_of_list` as a 0–100 number (UI-friendly: write
   * `12.5`, not `0.125`). The final EUR applied to a deal is computed from the
   * offer's IVA-excluded list price plus the flat component.
   */
  export interface Medium {
    /**
     * Flat EUR component added on top of the percentage (e.g. promo
     * `0% + 500 EUR fissi`). Whole euros only.
     */
    fixed_eur: number;

    /**
     * Percentage of the IVA-excluded list price applied as down payment for this tier.
     * Range 0–100. Typical defaults: 0 (low), 12.5 (medium), 25 (high).
     */
    percent_of_list: number;
  }
}

/**
 * Response model for GET / PATCH /v1/dealers/{id}/nlt-settings.
 *
 * Note: there is no `vat_treatment` field — VAT is a property of the offer, not of
 * the dealer. The offer detail returns the VAT treatment per row instead.
 */
export interface NltSettings {
  agency_markup_percent: number;

  dealer_id: string;

  /**
   * Three down-payment scenarios (basso / medio / alto).
   *
   * No strict-ascending validation: the final EUR amount depends on the offer's list
   * price (`tier.percent_of_list / 100 * listino_imponibile + tier.fixed_eur`), so a
   * tier that looks larger by % can produce a smaller EUR on cheap vehicles. Label
   * semantics (low/medium/high) are advisory — DealerMAX UI treats the 3 positions
   * as opaque slots ordered by intent.
   */
  down_payment_tiers: DownPaymentTiers;

  effective_from: string;

  currency?: 'EUR';

  image_mode?: 'branded' | 'scenario_locked' | 'scenario_seasonal';

  image_scenario_locked?: 'mediterraneo' | 'cortina' | 'milano' | 'showroom' | 'building' | null;
}

export interface NltSettingUpdateParams {
  /**
   * Body param
   */
  agency_markup_percent: number;

  /**
   * Body param: Three down-payment scenarios (basso / medio / alto).
   *
   * No strict-ascending validation: the final EUR amount depends on the offer's list
   * price (`tier.percent_of_list / 100 * listino_imponibile + tier.fixed_eur`), so a
   * tier that looks larger by % can produce a smaller EUR on cheap vehicles. Label
   * semantics (low/medium/high) are advisory — DealerMAX UI treats the 3 positions
   * as opaque slots ordered by intent.
   */
  down_payment_tiers: DownPaymentTiers;

  /**
   * Body param
   */
  currency?: 'EUR';

  /**
   * Body param
   */
  image_mode?: 'branded' | 'scenario_locked' | 'scenario_seasonal';

  /**
   * Body param
   */
  image_scenario_locked?: 'mediterraneo' | 'cortina' | 'milano' | 'showroom' | 'building' | null;

  /**
   * Header param
   */
  'Idempotency-Key'?: string;
}

export declare namespace NltSettings {
  export {
    type DownPaymentTiers as DownPaymentTiers,
    type NltSettings as NltSettings,
    type NltSettingUpdateParams as NltSettingUpdateParams,
  };
}
