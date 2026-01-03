export interface PermitData {
  overflight?: boolean;
  landing?: boolean;
  other?: string[];
  handling?: {
    code: string;
    name: string;
  }[];
  coordinates: [number, number]; // [longitude, latitude]
}

export const permitsData: Record<string, PermitData> = {
  PAN: {
    overflight: true,
    landing: true,
    coordinates: [-80.7821, 8.5380]
  },
  CUB: {
    overflight: true,
    coordinates: [-79.5, 21.5]
  },
  ECU: {
    overflight: true,
    landing: true,
    coordinates: [-78.1834, -1.8312]
  },
  PER: {
    overflight: true,
    landing: true,
    handling: [
      { code: 'SPJC', name: 'Lima' }
    ],
    coordinates: [-75.0152, -9.1900]
  },
  BRA: {
    overflight: true,
    landing: true,
    coordinates: [-51.9253, -14.2350]
  },
  COL: {
    overflight: true,
    other: ['Permiso de permanencia'],
    handling: [
      { code: 'SKBO', name: 'Bogotá El Dorado' },
      { code: 'SKCG', name: 'Cartagena' },
      { code: 'SKRG', name: 'Rionegro' },
      { code: 'SKCL', name: 'Cali' },
      { code: 'SKBQ', name: 'Barranquilla' }
    ],
    coordinates: [-74.2973, 4.5709]
  },
  NIC: {
    overflight: true,
    coordinates: [-85.2072, 12.8654]
  },
  CHL: {
    overflight: true,
    landing: true,
    coordinates: [-71.5430, -35.6751]
  },
  GTM: {
    overflight: true,
    landing: true,
    handling: [
      { code: 'MGGT', name: 'Guatemala' },
      { code: 'MGMM', name: 'Mundo Maya' }
    ],
    coordinates: [-90.2308, 15.7835]
  },
  BOL: {
    overflight: true,
    landing: true,
    coordinates: [-63.5887, -16.2902]
  },
  SLV: {
    landing: true,
    handling: [
      { code: 'MSLP', name: 'San Salvador' },
      { code: 'MSSS', name: 'Ilopango' }
    ],
    coordinates: [-88.8965, 13.7942]
  },
  USA: {
    other: ['Eapis USA'],
    coordinates: [-95.7129, 37.0902]
  },
  MEX: {
    other: ['Eapis Mexico', 'Permiso internacion'],
    handling: [
      { code: 'MMTP', name: 'Tapachula' },
      { code: 'MMCZ', name: 'Cozumel' }
    ],
    coordinates: [-102.5528, 23.6345]
  },
  CUW: {
    overflight: true,
    coordinates: [-68.9900, 12.1696]
  }
};

export const countryNames: Record<string, string> = {
  PAN: 'Panamá',
  CUB: 'Cuba',
  ECU: 'Ecuador',
  PER: 'Perú',
  BRA: 'Brasil',
  COL: 'Colombia',
  NIC: 'Nicaragua',
  CHL: 'Chile',
  GTM: 'Guatemala',
  BOL: 'Bolivia',
  SLV: 'El Salvador',
  USA: 'Estados Unidos',
  MEX: 'México',
  CUW: 'Curazao'
};

export const regionalPermits = [
  { name: 'CENAMER', type: 'Overflight', description: 'Central America Airspace' }
];
