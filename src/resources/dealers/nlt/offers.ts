// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

/**
 * Dealer-aware reads of the shared NLT catalog — pricing reflects the dealer's markup and down-payment tiers.
 */
export class Offers extends APIResource {
  /**
   * Returns the full detail of one NLT offer including the 18-quotation matrix (3
   * durations × 6 km/year tiers) with prices computed for each of the dealer's three
   * down-payment tiers — 54 displayed price points total — plus included services,
   * optional accessories, image gallery, and the dealer business card.
   *
   * @example
   * ```ts
   * const offer = await client.dealers.nlt.offers.retrieve(
   *   'offer_id',
   *   { dealer_id: 'dealer_id' },
   * );
   * ```
   */
  retrieve(
    offerID: string,
    params: OfferRetrieveParams,
    options?: RequestOptions,
  ): APIPromise<OfferRetrieveResponse> {
    const { dealer_id } = params;
    return this._client.get(path`/v1/dealers/${dealer_id}/nlt/offers/${offerID}`, options);
  }

  /**
   * Returns a cursor-paginated list of NLT offers available to the specified dealer,
   * with monthly canon already repriced using the dealer's markup and down-payment
   * tiers.
   *
   * @example
   * ```ts
   * const offers = await client.dealers.nlt.offers.list(
   *   'dealer_id',
   * );
   * ```
   */
  list(
    dealerID: string,
    query: OfferListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<OfferListResponse> {
    return this._client.get(path`/v1/dealers/${dealerID}/nlt/offers`, { query, ...options });
  }
}

export interface NltOfferSummary {
  brand: string;

  dealer_id: string;

  /**
   * Duration corresponding to the `monthly_canon_from_eur` quote.
   */
  duration_months: 24 | 36 | 48;

  fuel_type: 'electric' | 'hybrid' | 'plugin_hybrid' | 'petrol' | 'diesel' | 'lpg' | 'methane';

  /**
   * Km/year corresponding to the `monthly_canon_from_eur` quote.
   */
  km_per_year_at_quote: number;

  model: string;

  /**
   * Lowest displayed monthly canon across all duration / km / down-payment
   * combinations for this dealer.
   */
  monthly_canon_from_eur: number;

  offer_id: string;

  segment: 'A' | 'B' | 'C' | 'D' | 'E' | 'SUV' | 'VAN';

  /**
   * Consumer-facing URL on the dealer's public site.
   */
  canonical_url?: string;

  has_promo?: boolean;

  image_url?: string;

  trim?: string | null;
}

export interface OfferRetrieveResponse extends NltOfferSummary {
  included_services: Array<
    'full_insurance' | 'maintenance' | 'road_tax' | 'tires' | 'replacement_vehicle' | 'roadside_assistance'
  >;

  /**
   * All 54 displayed price points (18 base quotations × 3 down-payment tiers).
   */
  quotations: Array<OfferRetrieveResponse.Quotation>;

  specs: OfferRetrieveResponse.Specs;

  dealer_card?: OfferRetrieveResponse.DealerCard;

  image_gallery?: Array<string>;

  optional_accessories?: Array<OfferRetrieveResponse.OptionalAccessory>;
}

export namespace OfferRetrieveResponse {
  export interface Quotation {
    /**
     * Down-payment amount in EUR for this tier (from the dealer's NLT settings).
     */
    down_payment_eur: number;

    down_payment_tier: 'low' | 'medium' | 'high';

    duration_months: 24 | 36 | 48;

    km_per_year: 10000 | 15000 | 20000 | 25000 | 30000 | 40000;

    /**
     * Displayed monthly canon (includes dealer markup + VAT treatment).
     */
    monthly_canon_eur: number;
  }

  export interface Specs {
    co2_g_per_km?: number | null;

    engine_displacement_cc?: number | null;

    height_mm?: number | null;

    length_mm?: number | null;

    power_kw?: number | null;

    transmission?: string | null;

    trunk_litres?: number | null;

    width_mm?: number | null;
  }

  export interface DealerCard {
    business_name?: string;

    city?: string;

    phone?: string | null;

    primary_domain?: string;

    province_code?: string;
  }

  export interface OptionalAccessory {
    label: string;

    monthly_canon_delta_eur: number;
  }
}

export interface OfferListResponse {
  data: Array<NltOfferSummary>;

  has_more: boolean;

  next_cursor?: string | null;
}

export interface OfferRetrieveParams {
  /**
   * Identifier of a dealer owned by the calling partner. Cross-partner access
   * returns 403 forbidden_dealer_not_owned.
   */
  dealer_id: string;
}

export interface OfferListParams {
  /**
   * Filter by brand name, case-insensitive (e.g., `Fiat`).
   */
  brand?: string;

  /**
   * Upper bound on displayed monthly canon (EUR).
   */
  canone_max_eur?: number;

  /**
   * Opaque pagination cursor.
   */
  cursor?: string;

  duration_months?: 24 | 36 | 48;

  fuel_type?: 'electric' | 'hybrid' | 'plugin_hybrid' | 'petrol' | 'diesel' | 'lpg' | 'methane';

  km_per_year?: 10000 | 15000 | 20000 | 25000 | 30000 | 40000;

  limit?: number;

  segment?: 'A' | 'B' | 'C' | 'D' | 'E' | 'SUV' | 'VAN';
}

export declare namespace Offers {
  export {
    type NltOfferSummary as NltOfferSummary,
    type OfferRetrieveResponse as OfferRetrieveResponse,
    type OfferListResponse as OfferListResponse,
    type OfferRetrieveParams as OfferRetrieveParams,
    type OfferListParams as OfferListParams,
  };
}
