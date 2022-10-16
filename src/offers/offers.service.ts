import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Offer } from '../entity/offer.entity';
import { Repository } from 'typeorm';
import { payload } from '../../offer1.payload';
import { payload as payloadOther } from '../../offer2.payload';
import { OfferDto, ReadLoadPayloadDto } from './dto/payload.dto';
import { CreateDto } from './dto/create.one.dto';
import { OfferBoxSizeEnum } from 'src/enums/offerBoxSize.enum';
import { ReadLoadPayloadOherDto } from './dto/payload.other.dto';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private readonly offerRepository: Repository<Offer>,
  ) {}

  async createOffer() {
    const data: ReadLoadPayloadDto = payload;

    return await Promise.all(
      data.response.offers.map(async (offer: OfferDto) => {
        const offerEntity: CreateDto = this.offerRepository.create();
        offerEntity.name = offer.offer_name;
        offerEntity.description = offer.offer_desc;
        offerEntity.slug = offer.offer_name.toLowerCase().split(' ').join('');
        offerEntity.requirements = offer.call_to_action;
        offerEntity.thumbnail = offer.image_url;
        offerEntity.isDesktop = offer.device == 'desktop' ? 1 : 0;
        offerEntity.isAndroid = offer.device == 'android' ? 1 : 0;
        offerEntity.isIos = offer.device == 'iphone_ipad' ? 1 : 0;
        offerEntity.box_size = OfferBoxSizeEnum.large;
        offerEntity.offerUrlTemplate = offer.offer_url;
        offerEntity.providerName = offer.offer_name;
        offerEntity.externalOfferId = offer.offer_id;
        try {
          return await this.offerRepository.save(offerEntity);
        } catch (error) {
          return error.message;
        }
      }),
    );
  }

  async createOfferOther() {
    const { data }: ReadLoadPayloadOherDto = payloadOther;
    const offers = [];
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const { Offer, OS } = data[key];

        const offerEntity: CreateDto = this.offerRepository.create();
        offerEntity.name = Offer.name;
        offerEntity.description = Offer.description;
        offerEntity.slug = Offer.name.toLowerCase().split(' ').join('');
        offerEntity.requirements = Offer.instructions;
        offerEntity.thumbnail = '';
        offerEntity.isDesktop = OS.web ? 1 : 0;
        offerEntity.isAndroid = OS.android ? 1 : 0;
        offerEntity.isIos = OS.ios ? 1 : 0;
        offerEntity.box_size = OfferBoxSizeEnum.large;
        offerEntity.offerUrlTemplate = Offer.tracking_url;
        offerEntity.providerName = Offer.name;
        offerEntity.externalOfferId = Offer.campaign_id;

        try {
          offers.push(await this.offerRepository.save(offerEntity));
        } catch (error) {
          console.log(error.message);
        }
      }
    }
    return offers;
  }
}
