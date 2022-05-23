import { Module } from '@nestjs/common';
import { BinController } from './bin.controller';

@Module({
	controllers: [BinController],
})
export class BinModule {}
