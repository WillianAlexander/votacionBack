import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecaptchaService } from './recaptcha/recaptcha.service';
import { SociosService } from './socios/socios.service';
import { SociosController } from './socios/socios.controller';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), HttpModule],
  controllers: [AppController, SociosController],
  providers: [AppService, RecaptchaService, SociosService],
})
export class AppModule {}
