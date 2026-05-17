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
   * VAT treatment of this offer (not the dealer). `private` →
   * `monthly_canon_from_eur` is VAT-inclusive (×1.22). `business` → VAT-exclusive.
   * Sourced from `nlt_offerte.solo_privati`.
   */
  vat_treatment: 'private' | 'business';

  /**
   * Consumer-facing URL on the dealer's public site.
   */
  canonical_url?: string;

  has_promo?: boolean;

  image_url?: string;

  trim?: string | null;
}

/**
 * Full offer detail. Shape mirrors apimax MCP `get_nlt_offer_details`
 * (`apimax/app/api/mcp_server.py::_tool_get_nlt_offer_details`) bit-for-bit so
 * partnermax SDK consumers stay aligned with the Custom GPT / MCP clients on the
 * DealerMAX network.
 */
export interface OfferRetrieveResponse {
  found: boolean;

  /**
   * True when canon is VAT-inclusive (i.e. `solo_privati=true`).
   */
  iva_inclusa: boolean;

  network_dealer_count: number;

  /**
   * Offer slug (stable identifier shared with apimax surfaces).
   */
  slug: string;

  title: string;

  /**
   * Standard equipment list (one entry per item). Sourced from
   * `mnet_dettagli.equipaggiamento` split on newlines/semicolons. Currently empty on
   * every live offer (upstream column unpopulated); will auto-fill when the data
   * flows in.
   */
  accessori_di_serie?: Array<string>;

  accessori_inclusi?: Array<OfferRetrieveResponse.AccessoriInclusi>;

  addons_disponibili?: OfferRetrieveResponse.AddonsDisponibili;

  anticipo_scenari_eur?: OfferRetrieveResponse.AnticipoScenariEur | null;

  anticipo_scenari_labels?: OfferRetrieveResponse.AnticipoScenariLabels | null;

  /**
   * Lowest canon across the partner network for this offer (primary dealer's price).
   */
  canone_mensile_min_eur?: number | null;

  /**
   * AI-generated long-form description.
   */
  description_full?: string | null;

  description_short?: string | null;

  /**
   * Full Motornet technical sheet — apimax: `_get_dettagli_motornet`
   * (`nlt_resolver.py:752`). Every non-null `mnet_dettagli` column for this
   * `codice_motornet_uni` flattened into a plain dict (~30-40 keys typically
   * populated out of 90 columns). Native units preserved: cilindrata (cc), kw, hp,
   * coppia, accelerazione (s), velocita (km/h), lunghezza/larghezza/altezza/passo
   * (cm), peso (kg), bagagliaio (L, free-text), emissioni_co2 (g/km, free-text),
   * pneumatici_anteriori ("205/55 R17"), trazione, alimentazione, cambio, euro,
   * autonomia_media, capacita_nominale_batteria, etc. Keys are stable across offers;
   * values are int/float/bool/string (timestamps ISO-formatted).
   */
  dettagli_tecnici?: { [key: string]: unknown };

  /**
   * Raw Italian label from `nlt_offerte.alimentazione` (e.g. "Benzina", "Ibrida").
   */
  fuel_type?: string | null;

  gallery?: Array<OfferRetrieveResponse.Gallery>;

  image_url?: string;

  last_modified?: string;

  marca?: string | null;

  modello?: string | null;

  /**
   * All the partner's dealers that can fulfil this offer, sorted by canon ASC.
   */
  network_offers?: Array<OfferRetrieveResponse.NetworkOffer>;

  /**
   * List price IVA-inclusive (vehicle + accessories + MSS).
   */
  prezzo_totale_eur?: number | null;

  primary_dealer_city?: string | null;

  primary_dealer_name?: string | null;

  primary_dealer_province?: string | null;

  quotazioni?: Array<OfferRetrieveResponse.Quotazioni>;

  segmento?: string | null;

  /**
   * Services normally included in the canone. apimax: `_get_services_included`
   * (`nlt_resolver.py:719`) reads global `nlt_services` is_active table — same 8
   * services across the network (Assicurazione RCA / Kasco / Incendio-Furto,
   * Manutenzione, Assistenza Stradale, Bollo, Pneumatici, Veicolo in anticipo). Not
   * per-offer.
   */
  servizi_inclusi?: Array<OfferRetrieveResponse.ServiziInclusi>;

  /**
   * Per-offer VAT scope: true → consumer-facing (B2C, VAT-inclusive). false →
   * business (B2B, VAT-exclusive).
   */
  solo_privati?: boolean | null;

  tags?: Array<OfferRetrieveResponse.Tag>;

  /**
   * Raw Italian label from `nlt_offerte.cambio`.
   */
  transmission?: string | null;

  versione?: string | null;
}

export namespace OfferRetrieveResponse {
  export interface AccessoriInclusi {
    codice: string;

    descrizione: string;

    prezzo_extra_eur: number;
  }

  export interface AddonsDisponibili {
    auto_sostitutiva?: AddonsDisponibili.AutoSostitutiva | null;

    pneumatici?: AddonsDisponibili.Pneumatici | null;
  }

  export namespace AddonsDisponibili {
    export interface AutoSostitutiva {
      /**
       * Replacement vehicle category (B fixed).
       */
      categoria_default: string;

      categoria_descrizione: string;

      costo_mensile_eur: number;
    }

    export interface Pneumatici {
      /**
       * Cost of one set of 4 tyres, EUR.
       */
      costo_treno_eur: number;

      /**
       * Tyre diameter in inches.
       */
      diametro_in: number;

      /**
       * Replacement rule (e.g. one set every 30 000 km, rounded up).
       */
      regola_cambio: string;
    }
  }

  export interface AnticipoScenariEur {
    /**
     * 12.5% down-payment scenario, whole EUR.
     */
    anticipo_medio: number;

    /**
     * 25% down-payment scenario, whole EUR (matches vetrina canon).
     */
    anticipo_standard: number;

    /**
     * Zero down-payment scenario, whole EUR.
     */
    anticipo_zero: number;
  }

  export interface AnticipoScenariLabels {
    anticipo_medio: string;

    anticipo_standard: string;

    anticipo_zero: string;
  }

  export interface Gallery {
    is_cover: boolean;

    url: string;
  }

  export interface NetworkOffer {
    canone_mensile_min_eur: number;

    dealer_id: number;

    dealer_name: string;

    city?: string | null;

    contact_url?: string;

    google_maps_url?: string;

    phone?: string | null;

    province?: string | null;

    rating_value?: number | null;

    review_count?: number | null;
  }

  export interface Quotazioni {
    /**
     * Displayed monthly canon for this (durata, km) cell. Computed by
     * `calcola_canone_vetrina` for the primary dealer of the partner network;
     * VAT-inclusive when `solo_privati=true`.
     */
    canone_mensile_eur: number;

    durata_mesi: 36 | 48 | 60;

    km_inclusi_anno: 10000 | 15000 | 20000 | 25000 | 30000 | 40000;
  }

  export interface ServiziInclusi {
    /**
     * Service name (e.g. "Assicurazione RCA", "Manutenzione").
     */
    name: string;

    /**
     * Short human description (e.g. "Responsabilità Civile Auto").
     */
    description?: string | null;
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
