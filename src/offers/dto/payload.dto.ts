class VerticalsDto {
  readonly vertical_id: string;
  readonly vertical_name: string;
}

export class OfferDto {
  readonly offer_id: string;
  readonly offer_name: string;
  readonly offer_desc: string;
  readonly call_to_action: string;
  readonly disclaimer: string;
  readonly offer_url: string;
  readonly offer_url_easy: string;
  readonly payout: number;
  readonly payout_type: string;
  readonly amount: number;
  readonly image_url: string;
  readonly image_url_220x124: string;
  readonly countries: string[];
  readonly platform: string;
  readonly device: string;
  readonly category: object;
  readonly last_modified: number;
  readonly preview_url: string;
  readonly package_id: string;
  readonly verticals: VerticalsDto[];
}

class Query {
  readonly pubid: string;
  readonly appid: number;
  readonly country: string;
  readonly platform: string;
}

export class ReadLoadPayloadDto {
  readonly query: Query;
  readonly response: {
    readonly currency_name: string;
    readonly offers_count: number;
    readonly offers: OfferDto[];
  };
}
