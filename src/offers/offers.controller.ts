import { Controller, Post } from '@nestjs/common';
import { OffersService } from './offers.service';

@Controller('offers')
export class OffersController {
  constructor(private readonly offerService: OffersService) {}

  @Post()
  async create() {
    return await this.offerService.createOffer();
  }

  @Post('/other')
  async createOther() {
    return await this.offerService.createOfferOther();
  }
}
