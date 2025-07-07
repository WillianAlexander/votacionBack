import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';

interface GoogleResponse {
  success: boolean;
  score?: number;
  'error-codes'?: string[];
}

@Injectable()
export class RecaptchaService {
  private readonly verifyUrl =
    'https://www.google.com/recaptcha/api/siteverify';

  constructor(
    private readonly http: HttpService,
    private readonly config: ConfigService,
  ) {}

  async verify(token: string): Promise<void> {
    const secret = this.config.get<string>('RECAPTCHA_SECRET');

    if (!secret) {
      throw new Error('RECAPTCHA_SECRET no definido en variables de entorno');
    }

    const params = new URLSearchParams({ secret, response: token });
    const { data } = await firstValueFrom(
      this.http.post<GoogleResponse>(this.verifyUrl, params),
    );

    if (!data.success) {
      throw new HttpException('reCAPTCHA inválido', HttpStatus.FORBIDDEN);
    }

    const minScore = this.config.get<number>('RECAPTCHA_MIN_SCORE', 0.5);
    if (data.score !== undefined && data.score < minScore) {
      throw new HttpException('reCAPTCHA score bajo', HttpStatus.FORBIDDEN);
    }
  }
}
