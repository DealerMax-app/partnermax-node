// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';
import { path } from '../../../internal/utils/path';

/**
 * Used-vehicle stock management for dealers registered under a partner. Every vehicle request is scoped by dealer_id; the partner uploads each used vehicle by its canonical Motornet UNI code; DealerMAX joins the partner-provided pricing and stock metadata with the catalog master so the resulting listing is immediately indexed by the AI surfaces (MCP server, ChatGPT Custom GPT, NLWeb /ask, and the SEO/JSON-LD layer).
 */
export class Accessories extends APIResource {
  /**
   * Set Vehicle Accessories
   */
  update(
    vehicleID: string,
    params: AccessoryUpdateParams,
    options?: RequestOptions,
  ): APIPromise<VehicleAccessoriesCatalog> {
    const { dealer_id, ...body } = params;
    return this._client.put(path`/v1/dealers/${dealer_id}/vehicles/${vehicleID}/accessories`, {
      body,
      ...options,
    });
  }

  /**
   * Refresh Vehicle Accessories Catalog
   */
  refreshCatalog(
    vehicleID: string,
    params: AccessoryRefreshCatalogParams,
    options?: RequestOptions,
  ): APIPromise<VehicleAccessoriesCatalog> {
    const { dealer_id } = params;
    return this._client.post(
      path`/v1/dealers/${dealer_id}/vehicles/${vehicleID}/accessories/catalog/refresh`,
      options,
    );
  }

  /**
   * Get Vehicle Accessories Catalog
   */
  retrieveCatalog(
    vehicleID: string,
    params: AccessoryRetrieveCatalogParams,
    options?: RequestOptions,
  ): APIPromise<VehicleAccessoriesCatalog> {
    const { dealer_id } = params;
    return this._client.get(
      path`/v1/dealers/${dealer_id}/vehicles/${vehicleID}/accessories/catalog`,
      options,
    );
  }
}

/**
 * Per-vehicle accessories catalog plus current selections.
 */
export interface VehicleAccessoriesCatalog {
  alloy_wheel_size?: number | null;

  equipment?: Array<VehicleAccessoryItem>;

  optionals?: Array<VehicleAccessoryItem>;

  packages?: Array<VehicleAccessoryItem>;

  series?: Array<VehicleAccessoryItem>;
}

/**
 * Single accessory/equipment row available for a used vehicle.
 */
export interface VehicleAccessoryItem {
  id: string;

  description: string;

  category?: string | null;

  code?: string | null;

  group?: string | null;

  price_eur?: number | null;

  selected?: boolean;
}

export interface AccessoryUpdateParams {
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
  equipment_ids?: Array<string>;

  /**
   * Body param
   */
  optional_ids?: Array<string>;

  /**
   * Body param
   */
  package_ids?: Array<string>;
}

export interface AccessoryRefreshCatalogParams {
  dealer_id: string;
}

export interface AccessoryRetrieveCatalogParams {
  dealer_id: string;
}

export declare namespace Accessories {
  export {
    type VehicleAccessoriesCatalog as VehicleAccessoriesCatalog,
    type VehicleAccessoryItem as VehicleAccessoryItem,
    type AccessoryUpdateParams as AccessoryUpdateParams,
    type AccessoryRefreshCatalogParams as AccessoryRefreshCatalogParams,
    type AccessoryRetrieveCatalogParams as AccessoryRetrieveCatalogParams,
  };
}
