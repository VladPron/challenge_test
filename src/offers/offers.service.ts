import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Offer } from '../entity/offer.entity';
import { DataSource, Repository } from 'typeorm';
import { payload } from '../../offer1.payload';
import { payload as payloadOther } from '../../offer2.payload';
import { OfferDto, ReadLoadPayloadDto } from './dto/payload.dto';
import { CreateDto } from './dto/create.one.dto';
import { OfferBoxSizeEnum } from 'src/enums/offerBoxSize.enum';
import { ReadLoadPayloadOherDto } from './dto/payload.other.dto';
import { DuplicateUniqueException } from 'src/errors/error.exception';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private readonly offerRepository: Repository<Offer>,
    private readonly dataSource: DataSource,
  ) {}

  async createOffer() {
    const queryRunner = this.dataSource.createQueryRunner();

    const { response: offers }: ReadLoadPayloadDto = payload;
    const newOffers = [];
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      for (const key in Object.keys(offers.offers)) {
        const offer: OfferDto = offers.offers[key];

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

        await queryRunner.manager.save(offerEntity);
        newOffers.push(offerEntity);
      }

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      if (error.code == '23505') {
        throw new DuplicateUniqueException();
      }
      throw error;
    } finally {
      await queryRunner.release();
    }
    return newOffers;
  }

  async createOfferOther() {
    const queryRunner = this.dataSource.createQueryRunner();
    const offers = [];
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      const { data }: ReadLoadPayloadOherDto = payloadOther;

      for (const key of Object.keys(data)) {
        const { Offer: offer, OS: os } = data[key];

        const offerEntity: CreateDto = this.offerRepository.create();
        offerEntity.name = offer.name;
        offerEntity.description = offer.description;
        offerEntity.slug = offer.name.toLowerCase().split(' ').join('');
        offerEntity.requirements = offer.instructions;
        offerEntity.thumbnail = '';
        offerEntity.isDesktop = os.web ? 1 : 0;
        offerEntity.isAndroid = os.android ? 1 : 0;
        offerEntity.isIos = os.ios ? 1 : 0;
        offerEntity.box_size = offer.large;
        offerEntity.offerUrlTemplate = offer.tracking_url;
        offerEntity.providerName = offer.name;
        offerEntity.externalOfferId = offer.campaign_id;

        await queryRunner.manager.save(offerEntity);
        offers.push(offerEntity);
      }
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      if (error.code == '23505') {
        throw new DuplicateUniqueException();
      }
      throw error;
    } finally {
      await queryRunner.release();
    }

    return offers;
  }
}
