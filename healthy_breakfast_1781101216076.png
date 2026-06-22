export interface QuizState {
  // Demographic
  edad: string;
  provincia: string;
  situacion: string;

  // Weight History
  tiempoIntentando: string;
  dietasProbadas: string;
  resultadoDietas: string;

  // Insulin Symptoms
  sintomas: string[]; // multi-select

  // Weight Distribution
  acumulaGrasa: string;
  subePrimero: string;

  // Family History
  diabetesFamiliar: string;
  obesidadFamiliar: string;

  // Eating Habits
  desayuno: string;
  comidaProblematica: string;
  comerFuera: string;

  // Activity Level
  ejercicioSemanas: string;
  tipoEjercicio: string;

  // Hormonal Status
  situacionHormonal: string;
  medicacionHormonal: string;
  pesoHormonal: string;

  // Motivation and Goals
  motivacion: string;
  pesoPerder: string;

  // Lead capture
  leadName?: string;
  leadEmail?: string;
  leadWhatsapp?: string;
}

export type ScoreCategory = "ALTA" | "MEDIA" | "BAJA";

export interface CustomDiagnostic {
  category: ScoreCategory;
  score: number;
  title: string;
  subtitle: string;
  description: string;
  percentageText: string;
  colorClass: string;
  badgeClass: string;
  bulletColorClass: string;
}
