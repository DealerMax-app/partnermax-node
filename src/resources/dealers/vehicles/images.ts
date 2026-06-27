// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import { APIPromise } from '../../../core/api-promise';
import { type Uploadable } from '../../../core/uploads';
import { buildHeaders } from '../../../internal/headers';
import { RequestOptions } from '../../../internal/request-options';
import { multipartFormRequestOptions } from '../../../internal/uploads';
import { path } from '../../../internal/utils/path';

/**
 * Used-vehicle stock management for partner-owned dealers. The partner uploads each used vehicle by its canonical Motornet UNI code; DealerMAX joins the partner-provided pricing and stock metadata with the catalog master so the resulting listing is immediately indexed by the AI surfaces (MCP server, ChatGPT Custom GPT, NLWeb /ask, and the SEO/JSON-LD layer).
 */
export class Images extends APIResource {
  /**
   * Attach a photo to a used vehicle.
   *
   * The partner posts photos one at a time, in the desired display order. The first
   * photo becomes the cover (`position=1`, `is_cover=true`) automatically;
   * subsequent photos get the next `position`. There is intentionally no separate
   * "set cover" endpoint — order is the contract. To re-order, DELETE and re-POST.
   *
   * Up to `20` photos per vehicle. Bigger payloads return `413`; unsupported formats
   * return `415`; missing storage credentials return `503 storage_not_configured`.
   *
   * The uploaded photo is visible on every AI surface (MCP `search_vehicles`, Custom
   * GPT `search-vehicles-network`, the dealer site SEO/JSON-LD, NLWeb `/ask`) within
   * the next apimax cache TTL (≤ 5 min).
   */
  create(vehicleID: string, params: ImageCreateParams, options?: RequestOptions): APIPromise<VehicleImage> {
    const { dealer_id, ...body } = params;
    return this._client.post(
      path`/v1/dealers/${dealer_id}/vehicles/${vehicleID}/images`,
      multipartFormRequestOptions({ body, ...options }, this._client),
    );
  }

  /**
   * List every photo attached to a vehicle, ordered by `position`.
   *
   * No pagination — a vehicle is capped at 20 photos so the full list always fits in
   * a single response. `position=1` is the cover. There is no single-image
   * retrieve/update route in v1: retrieve through this list and replace/re-order by
   * deleting and re-posting the affected images.
   */
  list(vehicleID: string, params: ImageListParams, options?: RequestOptions): APIPromise<VehicleImageList> {
    const { dealer_id } = params;
    return this._client.get(path`/v1/dealers/${dealer_id}/vehicles/${vehicleID}/images`, options);
  }

  /**
   * Remove a photo from a vehicle.
   *
   * If the deleted photo was the cover (`position=1`), the next photo in order is
   * promoted to cover automatically — partnermax re-ranks every remaining photo to
   * contiguous 1..N so the partner never has to reason about gaps in the ordinal
   * sequence.
   *
   * Returns `404 vehicle_image_not_found` if the image id is unknown or belongs to a
   * different vehicle (cross-partner enumeration is blocked by the dealer + vehicle
   * ACL chain).
   */
  delete(imageID: string, params: ImageDeleteParams, options?: RequestOptions): APIPromise<void> {
    const { dealer_id, vehicle_id } = params;
    return this._client.delete(path`/v1/dealers/${dealer_id}/vehicles/${vehicle_id}/images/${imageID}`, {
      ...options,
      headers: buildHeaders([{ Accept: '*/*' }, options?.headers]),
    });
  }
}

/**
 * A single photo attached to a used vehicle.
 *
 * Returned by `POST .../images` (single upload) and as elements of
 * `VehicleImageList.data` (list endpoint). `position == 1` is the cover photo by
 * convention; `is_cover` mirrors it for readability.
 *
 * The `image_url` is the raw Supabase public URL. The cross-network AI surfaces
 * (MCP search_vehicles, Custom GPT, NLWeb) embed a CDN AVIF-transformed variant;
 * partners that render this URL themselves can apply Supabase's render-service
 * query parameters (`?format=avif&quality=70&resize=contain`) for the same
 * treatment.
 */
export interface VehicleImage {
  created_at: string;

  /**
   * Opaque image identifier in the form `img_<uuid>`. Use as the path parameter on
   * `DELETE` to remove the photo.
   */
  image_id: string;

  /**
   * Public Supabase Storage URL of the original upload. Stable for the lifetime of
   * the photo.
   */
  image_url: string;

  /**
   * True when `position == 1`. Surfaced as a separate field so partners can branch
   * on cover handling without doing integer arithmetic on positions.
   */
  is_cover: boolean;

  /**
   * 1-based ordinal among this vehicle's photos. `position=1` is the cover that
   * appears on every AI surface; subsequent positions are gallery photos shown on
   * the dealer site detail page.
   */
  position: number;
}

/**
 * All photos attached to a single vehicle, ordered by `position`.
 *
 * No pagination — a vehicle is capped at `VEHICLE_IMAGE_MAX_PER_VEHICLE` photos by
 * contract, so the full list always fits in one response.
 */
export interface VehicleImageList {
  data: Array<VehicleImage>;
}

export interface ImageCreateParams {
  /**
   * Path param
   */
  dealer_id: string;

  /**
   * Body param: The photo file. JPEG, PNG, or WebP, up to 15 MB. WebP is converted
   * to PNG server-side.
   */
  file: Uploadable;
}

export interface ImageListParams {
  dealer_id: string;
}

export interface ImageDeleteParams {
  dealer_id: string;

  vehicle_id: string;
}

export declare namespace Images {
  export {
    type VehicleImage as VehicleImage,
    type VehicleImageList as VehicleImageList,
    type ImageCreateParams as ImageCreateParams,
    type ImageListParams as ImageListParams,
    type ImageDeleteParams as ImageDeleteParams,
  };
}
