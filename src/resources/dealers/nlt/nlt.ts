// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as OffersAPI from './offers';
import {
  NltOfferSummary,
  OfferListParams,
  OfferListResponse,
  OfferRetrieveParams,
  OfferRetrieveResponse,
  Offers,
} from './offers';

export class Nlt extends APIResource {
  offers: OffersAPI.Offers = new OffersAPI.Offers(this._client);
}

Nlt.Offers = Offers;

export declare namespace Nlt {
  export {
    Offers as Offers,
    type NltOfferSummary as NltOfferSummary,
    type OfferRetrieveResponse as OfferRetrieveResponse,
    type OfferListResponse as OfferListResponse,
    type OfferRetrieveParams as OfferRetrieveParams,
    type OfferListParams as OfferListParams,
  };
}
