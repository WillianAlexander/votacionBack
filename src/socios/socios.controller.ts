import { Controller, Post, Body } from '@nestjs/common';
import { RecaptchaService } from '../recaptcha/recaptcha.service';
import { SociosService } from './socios.service';

@Controller('socios')
export class SociosController {
  constructor(
    private readonly recaptcha: RecaptchaService,
    private readonly socios: SociosService,
  ) {}

  @Post('consulta')
  async consultar(@Body() body: { cedula: string; token: string }) {
    await this.recaptcha.verify(body.token);

    const socio = this.socios.findByCedula(body.cedula);
    if (!socio) {
      return {
        ESTADO: false,
        MENSAJE: 'Socio no encontrado',
      };
    }

    return {
      ESTADO: true,
      NOMBRE: socio.APELLIDOSYNOMBRES,
      CEDULA: socio.IDENTIFICACION,
      RECINTO: socio.RECINTO,
      JUNTA: String(socio.JUNTA),
      DIRECCION: socio.DIRECCION,
      PROVINCIA: socio.PROVINCIA,
      CANTON: socio.CANTON,
    };
  }
}
