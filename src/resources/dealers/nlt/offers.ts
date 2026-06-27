// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import { APIPromise } from '../../../core/api-promise';
import { CursorPage, type CursorPageParams, PagePromise } from '../../../core/pagination';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

export class Offers extends APIResource {
  /**
   * Full offer detail. Payload shape mirrors apimax MCP `get_nlt_offer_details`
   * bit-for-bit (mcp_server.py:1546-1606).
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
   * Listing of NLT offers with monthly canon repriced for this dealer.
   *
   * The response is cursor-paginated and dealer-aware: filters are applied to the
   * shared NLT catalogue, then each returned offer is repriced with the dealer's
   * configured mark-up, down-payment tiers, duration, and yearly-km filters. The
   * headline canon is the cheapest eligible priced cell.
   */
  list(
    dealerID: string,
    query: OfferListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<NltOfferSummariesCursorPage, NltOfferSummary> {
    return this._client.getAPIList(path`/v1/dealers/${dealerID}/nlt/offers`, CursorPage<NltOfferSummary>, {
      query,
      ...options,
    });
  }
}

export type NltOfferSummariesCursorPage = CursorPage<NltOfferSummary>;

/**
 * Single row in the offers list. Pricing is dealer-aware.
 *
 * Field names: American English snake_case. Values use DealerMAX's Italian
 * catalogue vocabulary (`fuel_type: "Benzina"`, `segment: "SUV piccoli"`). No enum
 * normalization — labels are surfaced verbatim, exactly as the detail endpoint
 * does, so the partner client sees the same string in both listing and detail.
 */
export interface NltOfferSummary {
  brand: string;

  dealer_id: string;

  duration_months: number;

  km_per_year_at_quote: number;

  model: string;

  monthly_canon_from_eur: number;

  offer_id: string;

  slug: string;

  vat_treatment: 'private' | 'business';

  canonical_url?: string | null;

  fuel_type?: string | null;

  has_promo?: boolean;

  image_url?: string | null;

  segment?: string | null;

  trim?: string | null;

  vehicle_type?: 'auto' | 'vcom';
}

/**
 * Full offer detail.
 *
 * Field names use American-English snake_case for the partner SDK contract. Values
 * stay Italian raw where the underlying automotive catalogue uses Italian labels.
 * The dict `technical_details` keeps Italian domain keys.
 */
export interface OfferRetrieveResponse {
  found: boolean;

  network_dealer_count: number;

  offer_id: string;

  slug: string;

  title: string;

  vat_included: boolean;

  /**
   * Container for optional add-ons.
   */
  available_addons?: OfferRetrieveResponse.AvailableAddons;

  brand?: string | null;

  description_full?: string | null;

  description_short?: string | null;

  /**
   * Three down-payment scenarios in EUR (whole amounts).
   *
   * Keys use American-English snake_case for the partnermax SDK: `zero`, `medium`,
   * `standard`.
   */
  down_payment_scenarios_eur?: OfferRetrieveResponse.DownPaymentScenariosEur | null;

  /**
   * Italian labels paired 1:1 with `NltDownPaymentScenariosEur`.
   *
   * Values stay in Italian raw ("Senza anticipo" / "Anticipo 12,5%" / "Anticipo
   * 25%") so partner UIs match DealerMAX consumer-facing copy.
   */
  down_payment_scenarios_labels?: OfferRetrieveResponse.DownPaymentScenariosLabels | null;

  faqs?: Array<OfferRetrieveResponse.Faq>;

  fuel_type?: string | null;

  gallery?: Array<OfferRetrieveResponse.Gallery>;

  image_url?: string | null;

  included_accessories?: Array<OfferRetrieveResponse.IncludedAccessory>;

  included_services?: Array<OfferRetrieveResponse.IncludedService>;

  last_modified?: string | null;

  min_monthly_canon_eur?: number | null;

  model?: string | null;

  network_offers?: Array<OfferRetrieveResponse.NetworkOffer>;

  primary_dealer_city?: string | null;

  primary_dealer_name?: string | null;

  primary_dealer_province?: string | null;

  private_only?: boolean | null;

  quotations?: Array<OfferRetrieveResponse.Quotation>;

  schema_org?: { [key: string]: unknown } | null;

  segment?: string | null;

  standard_equipment?: Array<string>;

  tags?: Array<OfferRetrieveResponse.Tag>;

  technical_details?: { [key: string]: unknown };

  total_price_eur?: number | null;

  transmission?: string | null;

  trim?: string | null;

  vehicle_type?: 'auto' | 'vcom';
}

export namespace OfferRetrieveResponse {
  /**
   * Container for optional add-ons.
   */
  export interface AvailableAddons {
    /**
     * Replacement-vehicle add-on lookup.
     *
     * Always category B (utilitaria) per founder decision — the spoken "average
     * customer" segment.
     */
    replacement_vehicle?: AvailableAddons.ReplacementVehicle | null;

    /**
     * Tyre-replacement add-on lookup.
     *
     * Populated when the catalogue carries a parseable tyre diameter and a
     * DealerMAX-managed tyre package exists for that diameter. Null otherwise.
     * Replacement rule: 1 set of 4 tyres every 30 000 km, rounded up.
     */
    tires?: AvailableAddons.Tires | null;
  }

  export namespace AvailableAddons {
    /**
     * Replacement-vehicle add-on lookup.
     *
     * Always category B (utilitaria) per founder decision — the spoken "average
     * customer" segment.
     */
    export interface ReplacementVehicle {
      category_description: string;

      default_category: string;

      monthly_cost_eur: number;
    }

    /**
     * Tyre-replacement add-on lookup.
     *
     * Populated when the catalogue carries a parseable tyre diameter and a
     * DealerMAX-managed tyre package exists for that diameter. Null otherwise.
     * Replacement rule: 1 set of 4 tyres every 30 000 km, rounded up.
     */
    export interface Tires {
      diameter_in: number;

      replacement_rule: string;

      set_cost_eur: number;
    }
  }

  /**
   * Three down-payment scenarios in EUR (whole amounts).
   *
   * Keys use American-English snake_case for the partnermax SDK: `zero`, `medium`,
   * `standard`.
   */
  export interface DownPaymentScenariosEur {
    medium: number;

    standard: number;

    zero: number;
  }

  /**
   * Italian labels paired 1:1 with `NltDownPaymentScenariosEur`.
   *
   * Values stay in Italian raw ("Senza anticipo" / "Anticipo 12,5%" / "Anticipo
   * 25%") so partner UIs match DealerMAX consumer-facing copy.
   */
  export interface DownPaymentScenariosLabels {
    medium: string;

    standard: string;

    zero: string;
  }

  /**
   * One Italian Q&A entry derived per-offer.
   *
   * Generated from the same grounded offer payload used by DealerMAX consumer-facing
   * surfaces: dimensions, fuel, transmission, CO2, monthly canon, available
   * durations, VAT inclusion, down-payment tiers, etc.
   */
  export interface Faq {
    answer: string;

    question: string;
  }

  /**
   * One image in the offer gallery.
   */
  export interface Gallery {
    is_cover: boolean;

    url: string;
  }

  /**
   * One accessory bundled with the offer.
   */
  export interface IncludedAccessory {
    code: string;

    description: string;

    extra_price_eur: number;
  }

  /**
   * One NLT service normally included in the canone.
   *
   * Same set of services across the network (Assicurazione RCA / Kasco /
   * Incendio-Furto, Manutenzione, Assistenza Stradale, Bollo, Pneumatici, Veicolo in
   * anticipo, Vettura sostitutiva). Not per-offer.
   */
  export interface IncludedService {
    name: string;

    description?: string | null;
  }

  /**
   * One network dealer's quote for this offer.
   *
   * Sorted by `min_monthly_canon_eur ASC`. In PartnerMAX this list is scoped to the
   * calling partner's `partner_dealers` rows and returns the partner-owned
   * `external_dealer_id`. Legacy `dlr_<id>` values remain only for compatibility
   * callers.
   */
  export interface NetworkOffer {
    dealer_id: string;

    dealer_name: string;

    min_monthly_canon_eur: number;

    city?: string | null;

    contact_url?: string | null;

    google_maps_url?: string | null;

    phone?: string | null;

    province?: string | null;

    rating_value?: number | null;

    review_count?: number | null;
  }

  /**
   * One priced cell of the 18-combination matrix.
   *
   * Reflects the dealer-aware pricing formula applied to each (duration, yearly-km)
   * combination. Cells with implausible canons are filtered upstream, so the list
   * may contain fewer than 18 rows.
   */
  export interface Quotation {
    duration_months: number;

    km_per_year: number;

    monthly_canon_eur: number;
  }

  /**
   * Category tag for an offer.
   *
   * Examples in production: "Promo", "Stock pronto", "GreenChoice".
   */
  export interface Tag {
    name: string;

    color?: string | null;

    icon?: string | null;
  }
}

export interface OfferRetrieveParams {
  dealer_id: string;
}

export interface OfferListParams extends CursorPageParams {
  brand?: string | null;

  canone_max_eur?: number | null;

  duration_months?: number | null;

  fuel_type?: string | null;

  km_per_year?: number | null;

  segment?: string | null;

  /**
   * Macro discriminator: 'auto' (passenger vehicles) or 'vcom' (light commercial ≤35
   * q.li: vans, panel trucks, multispace, pickups, minibuses). Omit to return the
   * mixed catalog.
   */
  vehicle_type?: string | null;
}

export declare namespace Offers {
  export {
    type NltOfferSummary as NltOfferSummary,
    type OfferRetrieveResponse as OfferRetrieveResponse,
    type NltOfferSummariesCursorPage as NltOfferSummariesCursorPage,
    type OfferRetrieveParams as OfferRetrieveParams,
    type OfferListParams as OfferListParams,
  };
}
