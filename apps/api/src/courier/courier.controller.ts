import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { CourierService } from './courier.service';

@Controller('courier')
export class CourierController {
  constructor(private readonly courierService: CourierService) {}

  @Get('shipments/:consignmentId')
  trackShipment(@Param('consignmentId') consignmentId: string) {
    const shipment = this.courierService.trackShipment(consignmentId);
    if (!shipment) {
      throw new NotFoundException('Shipment not found');
    }
    return shipment;
  }

  @Post('shipments/track')
  bulkTrackShipments(@Body('consignmentIds') consignmentIds: string[]) {
    return this.courierService.bulkTrackShipments(consignmentIds ?? []);
  }
}
