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

  /**
   * Dealer id (prefixed `dlr_<n>`).
   */
  dealer_id: string;

  /**
   * Duration corresponding to the `monthly_canon_from_eur` quote.
   */
  duration_months: 36 | 48 | 60;

  /**
   * Km/year corresponding to the `monthly_canon_from_eur` quote.
   */
  km_per_year_at_quote: 10000 | 15000 | 20000 | 25000 | 30000 | 40000;

  model: string;

  /**
   * Lowest displayed monthly canon across all duration / km / down-payment
   * combinations for this dealer.
   */
  monthly_canon_from_eur: number;

  /**
   * Numeric `nlt_offerte.id_offerta` as string. Use as the path parameter for the
   * detail endpoint.
   */
  offer_id: string;

  /**
   * Offer slug used in canonical URLs (`/noleggio-lungo-termine/{slug}`).
   */
  slug: string;

  /**
   * VAT treatment of this offer (not the dealer). `private` →
   * `monthly_canon_from_eur` is VAT-inclusive (×1.22). `business` → VAT-exclusive.
   * Sourced from `nlt_offerte.solo_privati`.
   */
  vat_treatment: 'private' | 'business';

  /**
   * Consumer-facing URL on the dealer's public site:
   * `https://{primary_domain}/noleggio-lungo-termine/{slug}`. Null when the dealer
   * has no site row.
   */
  canonical_url?: string;

  /**
   * Raw Italian label from `nlt_offerte.alimentazione` (e.g. "Benzina", "Ibrido
   * diesel"). Apimax-aligned, no enum normalization.
   */
  fuel_type?: string | null;

  has_promo?: boolean;

  image_url?: string;

  /**
   * Raw Italian label from `nlt_offerte.segmento` (e.g. "SUV piccoli", "Superiori").
   * Apimax-aligned, no enum normalization.
   */
  segment?: string | null;

  trim?: string | null;
}

/**
 * Full offer detail. Field names: American English snake_case (Stripe-style SDK
 * contract). Values: raw Italian, apimax-aligned. Shape mirrors apimax MCP
 * `get_nlt_offer_details`
 * (`apimax/app/api/mcp_server.py::_tool_get_nlt_offer_details`).
 */
export interface OfferRetrieveResponse {
  found: boolean;

  network_dealer_count: number;

  /**
   * Numeric `nlt_offerte.id_offerta` as string. Same value returned by the listing
   * endpoint.
   */
  offer_id: string;

  /**
   * Offer slug (stable identifier shared with apimax surfaces and used in canonical
   * URLs).
   */
  slug: string;

  title: string;

  /**
   * True when canon is VAT-inclusive (i.e. `private_only=true`).
   */
  vat_included: boolean;

  available_addons?: OfferRetrieveResponse.AvailableAddons;

  brand?: string | null;

  /**
   * AI-generated long-form description.
   */
  description_full?: string | null;

  description_short?: string | null;

  down_payment_scenarios_eur?: OfferRetrieveResponse.DownPaymentScenariosEur | null;

  down_payment_scenarios_labels?: OfferRetrieveResponse.DownPaymentScenariosLabels | null;

  /**
   * Italian FAQ for this offer — apimax `build_offer_faqs`
   * (`seo_engine/nlt_faq_builder.py:63`), no cap. Derived from offer payload +
   * Motornet specs (dimensioni, bagagliaio, CO2, motore, posti/porte, prestazioni,
   * canone preset 48/15k, canone minimo, durate, IVA, anticipi).
   */
  faqs?: Array<OfferRetrieveResponse.Faq>;

  /**
   * Raw Italian label from `nlt_offerte.alimentazione` (e.g. "Benzina", "Ibrido
   * diesel").
   */
  fuel_type?: string | null;

  gallery?: Array<OfferRetrieveResponse.Gallery>;

  image_url?: string;

  included_accessories?: Array<OfferRetrieveResponse.IncludedAccessory>;

  /**
   * Services normally included in the canone. apimax: `_get_services_included`
   * (`nlt_resolver.py:719`) reads global `nlt_services` is_active table.
   */
  included_services?: Array<OfferRetrieveResponse.IncludedService>;

  last_modified?: string;

  /**
   * Lowest canon across the partner network for this offer (primary dealer's price).
   */
  min_monthly_canon_eur?: number | null;

  model?: string | null;

  /**
   * All the partner's dealers that can fulfil this offer, sorted by canon ASC.
   */
  network_offers?: Array<OfferRetrieveResponse.NetworkOffer>;

  primary_dealer_city?: string | null;

  primary_dealer_name?: string | null;

  primary_dealer_province?: string | null;

  /**
   * Per-offer VAT scope: true → consumer-facing (B2C, VAT-inclusive). false →
   * business (B2B, VAT-exclusive). Sourced from `nlt_offerte.solo_privati`.
   */
  private_only?: boolean | null;

  quotations?: Array<OfferRetrieveResponse.Quotation>;

  /**
   * Raw Italian label from `nlt_offerte.segmento` (e.g. "SUV piccoli", "Superiori").
   */
  segment?: string | null;

  /**
   * Standard equipment list (one entry per item). Sourced from
   * `mnet_dettagli.equipaggiamento` split on newlines/semicolons. Currently empty on
   * every live offer (upstream column unpopulated); will auto-fill when the data
   * flows in.
   */
  standard_equipment?: Array<string>;

  tags?: Array<OfferRetrieveResponse.Tag>;

  /**
   * Full Motornet technical sheet — apimax: `_get_dettagli_motornet`
   * (`nlt_resolver.py:752`). Every non-null `mnet_dettagli` column for this
   * `codice_motornet_uni` flattened into a plain dict (~30-40 keys typically
   * populated out of 90 columns). KEYS stay Italian because they are raw SQL column
   * names: cilindrata (cc), kw, hp, coppia, accelerazione (s), velocita (km/h),
   * lunghezza/larghezza/altezza/passo (cm), peso (kg), bagagliaio (L, free-text),
   * emissioni_co2 (g/km, free-text), pneumatici_anteriori ("205/55 R17"), trazione,
   * alimentazione, cambio, euro, autonomia_media, capacita_nominale_batteria, etc.
   * Native units preserved; values are int/float/bool/string (timestamps
   * ISO-formatted).
   */
  technical_details?: { [key: string]: unknown };

  /**
   * List price IVA-inclusive (vehicle + accessories + MSS).
   */
  total_price_eur?: number | null;

  /**
   * Raw Italian label from `nlt_offerte.cambio` (e.g. "Automatico sequenziale").
   */
  transmission?: string | null;

  trim?: string | null;
}

export namespace OfferRetrieveResponse {
  export interface AvailableAddons {
    replacement_vehicle?: AvailableAddons.ReplacementVehicle | null;

    tires?: AvailableAddons.Tires | null;
  }

  export namespace AvailableAddons {
    export interface ReplacementVehicle {
      category_description: string;

      /**
       * Replacement vehicle category (B fixed).
       */
      default_category: string;

      monthly_cost_eur: number;
    }

    export interface Tires {
      /**
       * Tyre diameter in inches.
       */
      diameter_in: number;

      /**
       * Replacement rule (e.g. one set every 30 000 km, rounded up).
       */
      replacement_rule: string;

      /**
       * Cost of one set of 4 tyres, EUR.
       */
      set_cost_eur: number;
    }
  }

  export interface DownPaymentScenariosEur {
    /**
     * 12.5% down-payment scenario, whole EUR.
     */
    medium: number;

    /**
     * 25% down-payment scenario, whole EUR (matches vetrina canon).
     */
    standard: number;

    /**
     * Zero down-payment scenario, whole EUR.
     */
    zero: number;
  }

  export interface DownPaymentScenariosLabels {
    medium: string;

    standard: string;

    zero: string;
  }

  export interface Faq {
    /**
     * Italian answer (no placeholders — values from the offer payload + Motornet
     * specs).
     */
    answer: string;

    /**
     * Italian question.
     */
    question: string;
  }

  export interface Gallery {
    is_cover: boolean;

    url: string;
  }

  export interface IncludedAccessory {
    code: string;

    description: string;

    extra_price_eur: number;
  }

  export interface IncludedService {
    /**
     * Service name (e.g. "Assicurazione RCA", "Manutenzione").
     */
    name: string;

    /**
     * Short human description (e.g. "Responsabilità Civile Auto").
     */
    description?: string | null;
  }

  export interface NetworkOffer {
    dealer_id: number;

    dealer_name: string;

    min_monthly_canon_eur: number;

    city?: string | null;

    contact_url?: string;

    google_maps_url?: string;

    phone?: string | null;

    province?: string | null;

    rating_value?: number | null;

    review_count?: number | null;
  }

  export interface Quotation {
    duration_months: 36 | 48 | 60;

    km_per_year: 10000 | 15000 | 20000 | 25000 | 30000 | 40000;

    /**
     * Displayed monthly canon for this (duration, km) cell. Computed by
     * `calcola_canone_vetrina` for the primary dealer of the partner network;
     * VAT-inclusive when `private_only=true`.
     */
    monthly_canon_eur: number;
  }

  export interface Tag {
    name: string;

    /**
     * Hex color for tag chip.
     */
    color?: string | null;

    /**
     * FontAwesome icon class.
     */
    icon?: string | null;
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

  /**
   * Raw Italian label (case-insensitive ILIKE match). Examples: "Benzina", "Diesel",
   * "Ibrido benzina", "Ibrido diesel", "Elettrica", "GPL", "Metano".
   */
  fuel_type?: string;

  km_per_year?: 10000 | 15000 | 20000 | 25000 | 30000 | 40000;

  limit?: number;

  /**
   * Raw Italian label (case-insensitive ILIKE substring match). Examples: "SUV
   * piccoli", "SUV medi", "Superiori", "Medie", "Utilitarie".
   */
  segment?: string;
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
