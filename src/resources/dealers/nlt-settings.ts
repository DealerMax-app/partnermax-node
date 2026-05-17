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
   * / medium / high). Down-payment tiers MUST be in strictly ascending order.
   * Changes propagate to the cross-network AI surfaces within five minutes.
   *
   * The displayed monthly canon for an offer is computed as:
   *
   * ```
   * listino_imponibile = prezzo_listino / 1.22
   * provvigione = listino_imponibile × (agency_markup_percent / 100)
   * canon = base_canon + provvigione / duration_months - down_payment_eur / duration_months
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
   *       low_eur: 0,
   *       medium_eur: 3000,
   *       high_eur: 6000,
   *     },
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
 * Three down-payment scenarios shown to consumers, in strictly ascending order
 * (low < medium < high).
 */
export interface DownPaymentTiers {
  /**
   * Highest down-payment scenario.
   */
  high_eur: number;

  /**
   * Lowest down-payment scenario, in whole EUR.
   */
  low_eur: number;

  /**
   * Middle down-payment scenario.
   */
  medium_eur: number;
}

/**
 * Dealer-level NLT economics. VAT treatment is NOT a dealer-level field — it is a
 * property of the offer (see `NltOfferSummary.vat_treatment`).
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
   * Three down-payment scenarios shown to consumers, in strictly ascending order
   * (low < medium < high).
   */
  down_payment_tiers: DownPaymentTiers;

  effective_from: string;
}

export interface NltSettingUpdateParams {
  /**
   * Body param
   */
  agency_markup_percent: number;

  /**
   * Body param: Three down-payment scenarios shown to consumers, in strictly
   * ascending order (low < medium < high).
   */
  down_payment_tiers: DownPaymentTiers;

  /**
   * Body param
   */
  currency?: 'EUR';

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
