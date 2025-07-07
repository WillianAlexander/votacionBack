import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';

export interface Socio {
  IDENTIFICACION: string;
  APELLIDOSYNOMBRES: string;
  RECINTO: string;
  JUNTA: number | string;
  DIRECCION: string;
  PROVINCIA: string;
  CANTON: string;
  [key: string]: unknown;
}

@Injectable()
export class SociosService {
  private readonly sociosDict: Record<string, Socio>;

  constructor() {
    const filePath = join(__dirname, '..', 'assets', 'socios.json');
    const data = JSON.parse(readFileSync(filePath, 'utf-8')) as Socio[];
    this.sociosDict = Object.fromEntries(
      data.map((s) => [String(s.IDENTIFICACION), s]),
    );
  }

  findByCedula(cedula: string): Socio | undefined {
    return this.sociosDict[cedula.trim()];
  }
}
