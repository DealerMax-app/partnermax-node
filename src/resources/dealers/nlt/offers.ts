// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import { APIPromise } from '../../../core/api-promise';
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
   * Strategy:
   *
   * 1. Resolve + ACL the dealer.
   * 2. Pull at most `limit + 1` offers from the catalog after the cursor. The extra
   *    row lets us know if there's a next page without a second COUNT(\*) query.
   * 3. Apply text/enum filters server-side via SQL where possible (brand, segment,
   *    fuel) and the numeric `canone_max_eur` filter in Python after the pricing
   *    pass (the DB has no "displayed canon" column; we synthesize it per dealer).
   * 4. For each surviving offer, price the (duration, km) cells the caller filtered
   *    to (if specified) or all 18, pick the cheapest cell as the headline.
   */
  list(
    dealerID: string,
    query: OfferListParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<OfferListResponse> {
    return this._client.get(path`/v1/dealers/${dealerID}/nlt/offers`, { query, ...options });
  }
}

/**
 * Single row in the offers list. Pricing is dealer-aware.
 *
 * Field names: American English snake_case. Values: Italian raw, apimax-aligned
 * (`fuel_type: "Benzina"`, `segment: "SUV piccoli"`). No enum normalization —
 * apimax labels are surfaced verbatim, exactly as the detail endpoint does, so the
 * partner client sees the same string in both listing and detail.
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
 * Shape mirrors `_tool_get_nlt_offer_details` (apimax MCP) with all field names
 * translated to American English snake_case for the partner SDK contract. VALUES
 * stay Italian raw (apimax-aligned). The dict `technical_details` keeps Italian
 * KEYS because they are `mnet_dettagli` column names (raw DB).
 */
export interface OfferRetrieveResponse {
  found: boolean;

  network_dealer_count: number;

  offer_id: string;

  slug: string;

  title: string;

  vat_included: boolean;

  /**
   * Container for optional add-ons (apimax: `addons_disponibili`).
   */
  available_addons?: OfferRetrieveResponse.AvailableAddons;

  brand?: string | null;

  description_full?: string | null;

  description_short?: string | null;

  /**
   * Three down-payment scenarios in EUR (whole amounts).
   *
   * apimax: `anticipo_scenari_eur` (keys remapped to American English snake_case for
   * partnermax SDK: `zero/medium/standard`).
   */
  down_payment_scenarios_eur?: OfferRetrieveResponse.DownPaymentScenariosEur | null;

  /**
   * Italian labels paired 1:1 with `NltDownPaymentScenariosEur`.
   *
   * apimax: `anticipo_scenari_labels` — used by Custom GPT to render the three
   * options in conversation. Values stay in Italian raw ("Senza anticipo" /
   * "Anticipo 12,5%" / "Anticipo 25%").
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
   * Container for optional add-ons (apimax: `addons_disponibili`).
   */
  export interface AvailableAddons {
    /**
     * Replacement-vehicle add-on lookup (apimax:
     * `addons_disponibili.auto_sostitutiva`).
     *
     * Always category B (utilitaria) per founder decision — the spoken "average
     * customer" segment.
     */
    replacement_vehicle?: AvailableAddons.ReplacementVehicle | null;

    /**
     * Tyre-replacement add-on lookup (apimax: `addons_disponibili.pneumatici`).
     *
     * Populated when `mnet_dettagli.pneumatici_anteriori` matches `R\d+` and a row
     * exists in `nlt_pneumatici` for that diameter. Null otherwise. Replacement rule
     * (founder decision 2026-05-12): 1 set of 4 tyres every 30 000 km, rounded up.
     */
    tires?: AvailableAddons.Tires | null;
  }

  export namespace AvailableAddons {
    /**
     * Replacement-vehicle add-on lookup (apimax:
     * `addons_disponibili.auto_sostitutiva`).
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
     * Tyre-replacement add-on lookup (apimax: `addons_disponibili.pneumatici`).
     *
     * Populated when `mnet_dettagli.pneumatici_anteriori` matches `R\d+` and a row
     * exists in `nlt_pneumatici` for that diameter. Null otherwise. Replacement rule
     * (founder decision 2026-05-12): 1 set of 4 tyres every 30 000 km, rounded up.
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
   * apimax: `anticipo_scenari_eur` (keys remapped to American English snake_case for
   * partnermax SDK: `zero/medium/standard`).
   */
  export interface DownPaymentScenariosEur {
    medium: number;

    standard: number;

    zero: number;
  }

  /**
   * Italian labels paired 1:1 with `NltDownPaymentScenariosEur`.
   *
   * apimax: `anticipo_scenari_labels` — used by Custom GPT to render the three
   * options in conversation. Values stay in Italian raw ("Senza anticipo" /
   * "Anticipo 12,5%" / "Anticipo 25%").
   */
  export interface DownPaymentScenariosLabels {
    medium: string;

    standard: string;

    zero: string;
  }

  /**
   * One Italian Q&A entry derived per-offer.
   *
   * apimax: `build_offer_faqs` in `seo_engine/nlt_faq_builder.py` — generates up to
   * ~11 Q&A pairs (dimensions, fuel, transmission, CO2, monthly canon at preset
   * combo, available durations, VAT inclusion, down-payment tiers, etc.). Partnermax
   * surfaces them all, 1:1.
   */
  export interface Faq {
    answer: string;

    question: string;
  }

  /**
   * One image in the offer gallery (apimax: `gallery[]`).
   */
  export interface Gallery {
    is_cover: boolean;

    url: string;
  }

  /**
   * One accessory bundled with the offer (apimax: `accessori_inclusi[]`).
   */
  export interface IncludedAccessory {
    code: string;

    description: string;

    extra_price_eur: number;
  }

  /**
   * One NLT service normally included in the canone.
   *
   * apimax: `_get_services_included` (`nlt_resolver.py:719`). Source is the global
   * `nlt_services` table (active rows only). Same set of services across the network
   * (Assicurazione RCA / Kasco / Incendio-Furto, Manutenzione, Assistenza Stradale,
   * Bollo, Pneumatici, Veicolo in anticipo, Vettura sostitutiva). Not per-offer.
   */
  export interface IncludedService {
    name: string;

    description?: string | null;
  }

  /**
   * One network dealer's quote for this offer (apimax: `network_offers[]`).
   *
   * Sorted by `min_monthly_canon_eur ASC`. In partnermax this list is scoped to
   * dealers owned by the calling partner (`utenti.parent_id = partner.user_id`) —
   * same shape as the apimax cross-network list, partner-scoped to avoid data
   * leakage.
   */
  export interface NetworkOffer {
    dealer_id: number;

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
   * apimax: `quotazioni[]` entry — `_compute_quotazioni_dealer_aware`
   * (mcp_server.py:180). Reflects the dealer's vetrina formula applied to each
   * (durata, km) combo; cells with implausible canon (<€50) are dropped upstream, so
   * the list may contain fewer than 18 rows.
   */
  export interface Quotation {
    duration_months: number;

    km_per_year: number;

    monthly_canon_eur: number;
  }

  /**
   * Category tag for an offer (apimax: `tags[]`).
   *
   * Populated from `nlt_offerta_tag` ⋈ `nlt_offerte_tag`. Examples in production:
   * "Promo", "Stock pronto", "GreenChoice".
   */
  export interface Tag {
    name: string;

    color?: string | null;

    icon?: string | null;
  }
}

/**
 * Cursor-paginated list of offer summaries.
 */
export interface OfferListResponse {
  data: Array<NltOfferSummary>;

  has_more: boolean;

  next_cursor?: string | null;
}

export interface OfferRetrieveParams {
  dealer_id: string;
}

export interface OfferListParams {
  brand?: string | null;

  canone_max_eur?: number | null;

  cursor?: string | null;

  duration_months?: number | null;

  fuel_type?: string | null;

  km_per_year?: number | null;

  limit?: number;

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
    type OfferListResponse as OfferListResponse,
    type OfferRetrieveParams as OfferRetrieveParams,
    type OfferListParams as OfferListParams,
  };
}
