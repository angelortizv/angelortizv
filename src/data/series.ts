export const SERIES_META = {
  pdp: {
    title: 'PDP 2024',
    description:
      'Notas del Programa de Desarrollo Profesional del Centro Universitario Miravalles.',
  },
  rlhf: {
    title: 'RLHF',
    description:
      'Aprendizaje por refuerzo con retroalimentación humana en modelos de lenguaje.',
  },
} as const;

export type SeriesSlug = keyof typeof SERIES_META;
