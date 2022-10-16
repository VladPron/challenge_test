class OfferDto {
  campaign_id: number;
  store_id: number | null;
  tracking_type: string;
  campaign_vertical: string;
  currency_name_singular: string;
  currency_name_plural: string;
  network_epc: string;
  icon: string;
  name: string;
  tracking_url: string;
  instructions: string;
  disclaimer: null;
  description: string;
  short_description: string;
  offer_sticker_text_1: string;
  offer_sticker_text_2: null;
  offer_sticker_text_3: null;
  offer_sticker_color_1: string;
  offer_sticker_color_2: string;
  offer_sticker_color_3: string;
  sort_order_setting: null;
  category_1: string;
  category_2: null;
  amount: number;
  payout_usd: number;
  start_datetime: string;
  end_datetime: string;
  is_multi_reward: boolean;
}

class CountyDto {
  include: {
    [key: string]: {
      id: number;
      code: string;
      name: string;
    };
  };
  exclude: [];
}

export class ReadLoadPayloadOherDto {
  readonly status: string;
  readonly data: {
    [key: symbol]: {
      Offer: OfferDto;
      Country: CountyDto;
      State: {
        include: never[];
        exclude: never[];
      };
      City: {
        include: never[];
        exclude: never[];
      };
      Connection_Type: {
        cellular: boolean;
        wifi: boolean;
      };
      Device: {
        include: never[];
        exclude: never[];
      };
      OS: {
        android: boolean;
        ios: boolean;
        web: boolean;
        min_ios: number | null;
        max_ios: number | null;
        min_android: number | null;
        max_android: number | null;
      };
    };
  };
}
