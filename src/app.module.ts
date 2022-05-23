import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MaterialModule } from './material/material.module';
import { BinModule } from './bin/bin.module';
import { TypeModule } from './type/type.module';

@Module({
  imports: [AuthModule, MaterialModule, BinModule, TypeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
