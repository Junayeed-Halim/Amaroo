import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CourierService } from './courier.service';

@Controller('courier')
export class CourierController {
  constructor(private readonly courierService: CourierService) {}

  @Get('shipments/:consignmentId')
  trackShipment(@Param('consignmentId') consignmentId: string) {
    return this.courierService.trackShipment(consignmentId);
  }

  @Post('shipments/track')
  bulkTrackShipments(@Body('consignmentIds') consignmentIds: string[]) {
    return this.courierService.bulkTrackShipments(consignmentIds ?? []);
  }
}
