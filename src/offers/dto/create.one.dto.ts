export class CreateDto {
  name: string;
  slug: string;
  description: string;
  requirements: string;
  thumbnail: string;
  box_size?: string;
  isDesktop: number;
  isAndroid: number;
  isIos: number;
  offerUrlTemplate: string;
  providerName: string;
  externalOfferId: string;
}
