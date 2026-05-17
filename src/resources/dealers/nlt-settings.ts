// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { path } from '../../internal/utils/path';

/**
 * Per-dealer NLT economics: agency markup percent and three down-payment tiers.
 */
export class NltSettings extends APIResource {
  /**
   * Get current NLT economics for a dealer
   *
   * @example
   * ```ts
   * const nltSettings =
   *   await client.dealers.nltSettings.retrieve('dealer_id');
   * ```
   */
  retrieve(dealerID: string, options?: RequestOptions): APIPromise<NltSettings> {
    return this._client.get(path`/v1/dealers/${dealerID}/nlt-settings`, options);
  }

  /**
   * Sets the dealer's agency markup percent (0–10) and three down-payment tiers (low
   * / medium / high). Each tier carries `percent_of_list (0–100)` +
   * `fixed_eur (≥0)`; the final EUR per tier is offer-dependent
   * (`listino_imponibile * pct + eur`). Changes propagate to the cross-network AI
   * surfaces within five minutes.
   *
   * The displayed monthly canon for an offer is computed as:
   *
   * ```
   * listino_imponibile = prezzo_listino / 1.22
   * provvigione = listino_imponibile × (agency_markup_percent / 100)
   * anticipo_tier_eur = listino_imponibile × (tier.percent_of_list / 100) + tier.fixed_eur
   * canon = base_canon + provvigione / duration_months − anticipo_tier_eur / duration_months
   * if offer.private_only: canon *= 1.22
   * ```
   *
   * VAT treatment is a property of each offer (`NltOfferDetail.private_only` /
   * `NltOfferSummary.vat_treatment`), not of the dealer.
   *
   * @example
   * ```ts
   * const nltSettings = await client.dealers.nltSettings.update(
   *   'dealer_id',
   *   {
   *     agency_markup_percent: 3.5,
   *     down_payment_tiers: {
   *       low: { percent_of_list: 0, fixed_eur: 0 },
   *       medium: { percent_of_list: 12.5, fixed_eur: 0 },
   *       high: { percent_of_list: 25, fixed_eur: 0 },
   *     },
   *     image_mode: 'branded',
   *   },
   * );
   * ```
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
 * Three down-payment scenarios (basso / medio / alto). Each tier carries
 * `{percent_of_list (0–100), fixed_eur (≥0)}`. No strict-ascending check — the
 * final EUR per tier is offer-dependent (`listino_imponibile * pct + eur`).
 */
export interface DownPaymentTiers {
  /**
   * One down-payment tier —
   * `final_eur = listino_imponibile * (percent_of_list / 100) + fixed_eur`.
   * Persisted in apimax shape `{"pct": <0..1>, "eur": <int>}` on
   * `dealer_public.nlt_anticipi_config`.
   */
  high: DownPaymentTiers.High;

  /**
   * One down-payment tier —
   * `final_eur = listino_imponibile * (percent_of_list / 100) + fixed_eur`.
   * Persisted in apimax shape `{"pct": <0..1>, "eur": <int>}` on
   * `dealer_public.nlt_anticipi_config`.
   */
  low: DownPaymentTiers.Low;

  /**
   * One down-payment tier —
   * `final_eur = listino_imponibile * (percent_of_list / 100) + fixed_eur`.
   * Persisted in apimax shape `{"pct": <0..1>, "eur": <int>}` on
   * `dealer_public.nlt_anticipi_config`.
   */
  medium: DownPaymentTiers.Medium;
}

export namespace DownPaymentTiers {
  /**
   * One down-payment tier —
   * `final_eur = listino_imponibile * (percent_of_list / 100) + fixed_eur`.
   * Persisted in apimax shape `{"pct": <0..1>, "eur": <int>}` on
   * `dealer_public.nlt_anticipi_config`.
   */
  export interface High {
    /**
     * Flat EUR component added on top of the percentage (e.g. promo
     * `0% + 500€ fissi`). Whole euros only.
     */
    fixed_eur: number;

    /**
     * Percent of the IVA-excluded list price applied as down payment for this tier.
     * Range 0–100. Typical defaults: 0 (low), 12.5 (medium), 25 (high).
     */
    percent_of_list: number;
  }

  /**
   * One down-payment tier —
   * `final_eur = listino_imponibile * (percent_of_list / 100) + fixed_eur`.
   * Persisted in apimax shape `{"pct": <0..1>, "eur": <int>}` on
   * `dealer_public.nlt_anticipi_config`.
   */
  export interface Low {
    /**
     * Flat EUR component added on top of the percentage (e.g. promo
     * `0% + 500€ fissi`). Whole euros only.
     */
    fixed_eur: number;

    /**
     * Percent of the IVA-excluded list price applied as down payment for this tier.
     * Range 0–100. Typical defaults: 0 (low), 12.5 (medium), 25 (high).
     */
    percent_of_list: number;
  }

  /**
   * One down-payment tier —
   * `final_eur = listino_imponibile * (percent_of_list / 100) + fixed_eur`.
   * Persisted in apimax shape `{"pct": <0..1>, "eur": <int>}` on
   * `dealer_public.nlt_anticipi_config`.
   */
  export interface Medium {
    /**
     * Flat EUR component added on top of the percentage (e.g. promo
     * `0% + 500€ fissi`). Whole euros only.
     */
    fixed_eur: number;

    /**
     * Percent of the IVA-excluded list price applied as down payment for this tier.
     * Range 0–100. Typical defaults: 0 (low), 12.5 (medium), 25 (high).
     */
    percent_of_list: number;
  }
}

/**
 * Dealer-level NLT economics + image rendering preferences. VAT treatment is NOT a
 * dealer-level field — it is a property of the offer (see
 * `NltOfferSummary.vat_treatment`).
 */
export interface NltSettings {
  /**
   * Markup applied on top of the network base canon, in percent. Hard cap at 10%.
   */
  agency_markup_percent: number;

  /**
   * Only EUR supported in v1.
   */
  currency: 'EUR';

  dealer_id: string;

  /**
   * Three down-payment scenarios (basso / medio / alto). Each tier carries
   * `{percent_of_list (0–100), fixed_eur (≥0)}`. No strict-ascending check — the
   * final EUR per tier is offer-dependent (`listino_imponibile * pct + eur`).
   */
  down_payment_tiers: DownPaymentTiers;

  effective_from: string;

  /**
   * How NLT offer cover images are rendered for this dealer (apimax:
   * `nlt_image_mode`). `branded` (default): per-dealer composite. `scenario_locked`:
   * single AI scenario fixed by the dealer. `scenario_seasonal`: AI scenario
   * auto-rotated by Italian season.
   */
  image_mode: 'branded' | 'scenario_locked' | 'scenario_seasonal';

  /**
   * Only set when `image_mode='scenario_locked'`. One of the four AI scenarios
   * available on `mnet_modelli_ai_foto.scenario`.
   */
  image_scenario_locked?: 'mediterraneo' | 'cortina' | 'milano' | 'showroom' | null;
}

export interface NltSettingUpdateParams {
  /**
   * Body param
   */
  agency_markup_percent: number;

  /**
   * Body param: Three down-payment scenarios (basso / medio / alto). Each tier
   * carries `{percent_of_list (0–100), fixed_eur (≥0)}`. No strict-ascending check —
   * the final EUR per tier is offer-dependent (`listino_imponibile * pct + eur`).
   */
  down_payment_tiers: DownPaymentTiers;

  /**
   * Body param
   */
  image_mode: 'branded' | 'scenario_locked' | 'scenario_seasonal';

  /**
   * Body param
   */
  currency?: 'EUR';

  /**
   * Body param: Required when `image_mode='scenario_locked'`; must be null
   * otherwise.
   */
  image_scenario_locked?: 'mediterraneo' | 'cortina' | 'milano' | 'showroom' | null;

  /**
   * Header param: Stripe-style idempotency key. Replaying the same request with the
   * same key within 24 hours returns the original response without re-executing.
   * Strongly recommended on all POST, PATCH, and DELETE requests.
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
