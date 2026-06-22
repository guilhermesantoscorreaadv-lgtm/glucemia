import React from "react";
import { ChevronRight, ChevronLeft, Sparkles, CheckSquare, Square, Info } from "lucide-react";
import { PROVINCIAS_ESPANOLAS } from "../data/provincias";
import { QuizState } from "../types";
import healthyBreakfastPath from "../assets/images/healthy_breakfast_1781101216076.png";

interface QuestionBoxProps {
  currentStep: number;
  totalSteps: number;
  state: QuizState;
  onChange: (updates: Partial<QuizState>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function QuestionBox({
  currentStep,
  totalSteps,
  state,
  onChange,
  onNext,
  onPrev,
}: QuestionBoxProps) {
  // Check validation for current step to enable next button
  const isStepValid = (): boolean => {
    switch (currentStep) {
      case 1:
        return !!state.edad && !!state.provincia && !!state.situacion;
      case 2:
        return !!state.tiempoIntentando && !!state.dietasProbadas && !!state.resultadoDietas;
      case 3:
        // Multi-select sintomas doesn't strictly require > 0 because someone might claim 0,
        // but let's allow proceeding anyway, though typically users select at least one.
        return true;
      case 4:
        return !!state.acumulaGrasa && !!state.subePrimero;
      case 5:
        return !!state.diabetesFamiliar && !!state.obesidadFamiliar;
      case 6:
        return !!state.desayuno && !!state.comidaProblematica && !!state.comerFuera;
      case 7:
        return !!state.ejercicioSemanas && !!state.tipoEjercicio;
      case 8:
        return !!state.situacionHormonal && !!state.medicacionHormonal && !!state.pesoHormonal;
      case 9:
        return !!state.motivacion && !!state.pesoPerder;
      default:
        return false;
    }
  };

  // Helper for rendering custom styled radio cards
  const renderRadioField = (
    label: string,
    field: keyof QuizState,
    options: string[],
    helpText?: string
  ) => {
    const value = state[field] as string;
    return (
      <div className="space-y-3" id={`field-${field}`}>
        <label className="block text-md font-sans font-semibold text-neutral-900 leading-tight">
          {label} {helpText && <span className="text-xs font-normal text-neutral-500 block mt-1">{helpText}</span>}
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {options.map((opt) => {
            const isSelected = value === opt;
            return (
              <button
                key={opt}
                type="button"
                onClick={() => onChange({ [field]: opt })}
                id={`opt-${field}-${opt.replace(/\s+/g, "-")}`}
                className={`text-left p-4 rounded-2xl border-2 font-sans font-semibold text-sm transition-all duration-150 flex items-center justify-between cursor-pointer w-full ${
                  isSelected
                    ? "border-emerald-600 bg-emerald-50 text-emerald-950 shadow-sm"
                    : "border-neutral-200 bg-white text-neutral-700 hover:border-emerald-600 hover:bg-emerald-50/10"
                }`}
              >
                <span>{opt}</span>
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ml-3 transition-colors ${
                    isSelected ? "border-emerald-600 bg-emerald-600 text-white" : "border-neutral-300 bg-white"
                  }`}
                >
                  {isSelected && <div className="w-2 h-2 rounded-full bg-white"></div>}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  // Helper text logic for Sidebar
  const getSidebarFact = () => {
    switch (currentStep) {
      case 1:
        return {
          title: "Prevalencia Femenina",
          fact: "La resistencia a la insulina es el doble de frecuente en mujeres a partir de los 35 años debido a variaciones y declives paulatinos en la producción de estrógenos.",
          tag: "Dato Clínico"
        };
      case 2:
        return {
          title: "Efecto Rebote Tiroideo",
          fact: "Hacer dietas hipocalóricas estrictas de forma continuada deprime la función tiroidea y dispara el cortisol, aumentando la acumulación de grasa abdominal.",
          tag: "Bioquímica Femenina"
        };
      case 3:
        return {
          title: "Señales de Alerta",
          fact: "El cansancio extremo tras comer de forma regular es un indicador primario de que las células musculares bloquean selectivamente la entrada de glucosa.",
          tag: "Diagnóstico Clínico"
        };
      case 4:
        return {
          title: "Grasa Visceral",
          fact: "La grasa acumulada en la zona abdominal posee mayor densidad de receptores de glucocorticoides, respondiendo intensamente a las subidas de cortisol e insulina.",
          tag: "Anatomía Metabólica"
        };
      case 5:
        return {
          title: "Predisposición Genética",
          fact: "Aunque los antecedentes familiares directos crean una tendencia heredada, la epigenética actual demuestra que tus platos diarios determinan el 80% de su expresión.",
          tag: "Epigenética"
        };
      case 6:
        return {
          title: "Desayunos e Insulina",
          fact: "Comenzar el día con harinas o azúcar refinado establece una montaña rusa de insulina de fondo, forzándote a picar dulce a mitad de la tarde.",
          tag: "Patrones Diarios"
        };
      case 7:
        return {
          title: "El Músculo como Filtro",
          fact: "La masa muscular es tu mayor aliada. Las contracciones de fuerza permiten absorber glucosa de la sangre directamente por una vía alternativa sin requerir insulina.",
          tag: "Medicina del Deporte"
        };
      case 8:
        return {
          title: "Transición Hormonal",
          fact: "Durante la menopausia y perimenopausia, la disminución natural de estrógeno debilita la sensibilidad celular a la insulina de forma involuntaria.",
          tag: "Ginecología Médica"
        };
      case 9:
        return {
          title: "Metas de Peso Saludables",
          fact: "Ajustar la glucemia ayuda a restablecer el 'set-point' o punto de equilibrio ponderal en tu hipotálamo, impidiendo el rebote al finalizar tu plan metabólico.",
          tag: "Neuroendocrinología"
        };
      default:
        return {
          title: "Factor Glucémico",
          fact: "Pequeños cambios estratégicos en el orden de tus alimentos reducen los picos de glucosa tras comidas españolas tradicionales.",
          tag: "Consejo Clave"
        };
    }
  };

  const sidebarData = getSidebarFact();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-6xl mx-auto py-2 px-4" id="quiz-bento-layout">
      
      {/* LEFT: MAIN QUIZ BOX (Spans 8 cols on desktop) */}
      <div className="bento-card lg:col-span-8 shadow-sm flex flex-col justify-between min-h-[560px]" id="quiz-question-container">
        <div>
          {/* Step Indicator & Header */}
          <div className="border-b border-neutral-100 pb-5 mb-6" id="quiz-question-header">
            <div className="flex justify-between items-center text-xs font-mono text-neutral-500 mb-2">
              <span className="font-bold tracking-wider">PREGUNTA {currentStep} DE {totalSteps}</span>
              <span className="text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100/50">
                ⏱️ {Math.max(1, 10 - currentStep)} min restantes
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-display font-bold text-black leading-tight">
              {currentStep === 1 && "Para personalizar tus resultados, cuéntanos sobre ti:"}
              {currentStep === 2 && "Cuéntanos sobre tu relación con el peso:"}
              {currentStep === 3 && "¿Experimentas alguno de estos síntomas regularmente?"}
              {currentStep === 4 && "¿Dónde notas más la acumulación o aumento de peso?"}
              {currentStep === 5 && "Antecedentes familiares relevantes:"}
              {currentStep === 6 && "Describe tus patrones de alimentación diarios:"}
              {currentStep === 7 && "Por favor, descríbenos tu rutina de ejercicio actual:"}
              {currentStep === 8 && "Estado o equilibros hormonales actuales:"}
              {currentStep === 9 && "Tu motivación y objetivos principales para cambiar:"}
            </h2>
          </div>

          {/* Motivational Banner, dynamically shown between sections */}
          {currentStep === 2 && (
            <div className="mb-6 p-4 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-800 text-sm flex items-start gap-3" id="motivation-step-2">
              <Sparkles className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <p className="font-sans font-medium">
                <strong>¡Perfecto!</strong> Estamos analizando la respuesta de tu glucosa para aislar las causas celulares que sabotean las dietas clásicas.
              </p>
            </div>
          )}

          {currentStep === 6 && (
            <div className="mb-6 p-4 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-800 text-sm flex items-start gap-3" id="motivation-step-6">
              <Sparkles className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <p className="font-sans font-medium">
                <strong>Excelente ritmo.</strong> Tus pautas alimenticias nos indican el grado de inflamación de fondo y picos de cortisol diarios.
              </p>
            </div>
          )}

          {currentStep === 9 && (
            <div className="mb-6 p-4 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-800 text-sm flex items-start gap-3" id="motivation-step-9">
              <Sparkles className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <p className="font-sans font-medium">
                <strong>Último paso metabólico.</strong> Has completado una anamnesis de salud rigurosa para confeccionar tu plan Glucemia A Medida.
              </p>
            </div>
          )}

          {/* Input Controls wrapper */}
          <div className="space-y-6 py-1" id="quiz-question-fields">
            {/* STEP 1: DEMOGRAPHICS */}
            {currentStep === 1 && (
              <>
                {renderRadioField("¿Cuál es tu edad?", "edad", [
                  "25-34 años",
                  "35-44 años",
                  "45-54 años",
                  "55+ años",
                ])}

                <div className="space-y-3" id="field-provincia">
                  <label className="block text-md font-sans font-semibold text-neutral-900">
                    ¿En qué provincia de España vives?
                  </label>
                  <div className="relative">
                    <select
                      value={state.provincia}
                      onChange={(e) => onChange({ provincia: e.target.value })}
                      className="w-full p-4 rounded-2xl border-2 border-neutral-200 bg-white text-neutral-850 font-sans font-semibold text-sm outline-none cursor-pointer focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600/20"
                    >
                      <option value="">Selecciona tu provincia...</option>
                      {PROVINCIAS_ESPANOLAS.map((prov) => (
                        <option key={prov} value={prov}>
                          {prov}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-neutral-400">
                      <ChevronRight className="w-5 h-5 rotate-90" />
                    </div>
                  </div>
                </div>

                {renderRadioField("¿Cuál es tu situación actual?", "situacion", [
                  "Soltera",
                  "En pareja",
                  "Casada",
                  "Divorciada/Separada",
                ])}
              </>
            )}

            {/* STEP 2: WEIGHT HISTORY */}
            {currentStep === 2 && (
              <>
                {renderRadioField(
                  "¿Cuánto tiempo llevas intentando bajar de peso?",
                  "tiempoIntentando",
                  ["Menos de 6 meses", "6 meses a 1 año", "1-3 años", "Más de 3 años"]
                )}

                {renderRadioField(
                  "¿Cuántas dietas has probado en los últimos 2 años?",
                  "dietasProbadas",
                  ["Ninguna", "1-2 dietas", "3-5 dietas", "Más de 5 dietas"]
                )}

                {renderRadioField(
                  "Cuando haces dieta, ¿qué suele pasar?",
                  "resultadoDietas",
                  [
                    "Bajo peso rápidamente y lo mantengo",
                    "Bajo peso pero lo recupero pronto",
                    "Me cuesta mucho bajar peso",
                    "No consigo bajar nada de peso",
                  ]
                )}
              </>
            )}

            {/* STEP 3: INSULIN RESISTANCE SYMPTOMS (MULTISELECT) */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <p className="text-sm font-medium text-neutral-700 bg-neutral-50 p-4 rounded-xl flex items-center gap-2.5 border border-neutral-100" id="symp-info-box">
                  <Info className="w-4 h-4 text-emerald-600 shrink-0" />
                  Puedes marcar múltiples síntomas si los experimentas de manera continuada:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: "S1", label: "Ansiedad por dulces entre 16:00-18:00h" },
                    { id: "S2", label: "Cansancio extremo después de comer" },
                    { id: "S3", label: "Dificultad para concentrarte por las tardes" },
                    { id: "S4", label: "Ganas frecuentes de picar entre comidas" },
                    { id: "S5", label: "Sueño irregular o insomnio" },
                    { id: "S6", label: "Retención de líquidos/hinchazón" },
                    { id: "S7", label: "Cambios de humor relacionados con la comida" },
                  ].map((symptom) => {
                    const isChecked = state.sintomas.includes(symptom.label);
                    const handleToggle = () => {
                      if (isChecked) {
                        onChange({
                          sintomas: state.sintomas.filter((s) => s !== symptom.label),
                        });
                      } else {
                        onChange({
                          sintomas: [...state.sintomas, symptom.label],
                        });
                      }
                    };

                    return (
                      <button
                        key={symptom.id}
                        type="button"
                        onClick={handleToggle}
                        className={`w-full text-left p-4 rounded-2xl border-2 font-sans font-semibold text-sm transition-all duration-150 flex items-center justify-between cursor-pointer ${
                          isChecked
                            ? "border-emerald-600 bg-emerald-50 text-emerald-950 shadow-sm"
                            : "border-neutral-200 bg-white text-neutral-700 hover:border-emerald-600 hover:bg-emerald-50/10"
                        }`}
                      >
                        <span className="flex-1 pr-4">{symptom.label}</span>
                        <div className="shrink-0">
                          {isChecked ? (
                            <CheckSquare className="w-6 h-6 text-emerald-600" />
                          ) : (
                            <Square className="w-6 h-6 text-neutral-300" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 4: WEIGHT DISTRIBUTION */}
            {currentStep === 4 && (
              <>
                {renderRadioField(
                  "¿Dónde acumulas más grasa corporal?",
                  "acumulaGrasa",
                  [
                    "Principalmente en el abdomen/barriga",
                    "Caderas y muslos (tipo pera)",
                    "Brazos y espalda",
                    "De manera uniforme por todo el cuerpo",
                    "Principalmente en la cintura",
                  ]
                )}

                {renderRadioField(
                  "Cuando subes de peso, ¿dónde se nota primero?",
                  "subePrimero",
                  ["En la cara", "En el abdomen", "En las caderas", "En los brazos"]
                )}
              </>
            )}

            {/* STEP 5: FAMILY HISTORY */}
            {currentStep === 5 && (
              <>
                {renderRadioField(
                  "¿Algún familiar directo tiene diabetes tipo 2?",
                  "diabetesFamiliar",
                  ["Sí, padre/madre", "Sí, hermanos/hermanas", "Sí, abuelos", "No tengo antecedentes"]
                )}

                {renderRadioField(
                  "¿Hay casos de obesidad en tu familia?",
                  "obesidadFamiliar",
                  ["Sí, varios familiares", "Sí, algún familiar", "No hay casos"]
                )}
              </>
            )}

            {/* STEP 6: DIET & HABITS */}
            {currentStep === 6 && (
              <>
                {renderRadioField(
                  "¿Cómo es tu desayuno habitual?",
                  "desayuno",
                  [
                    "No desayuno",
                    "Café y algo dulce (galletas, magdalena)",
                    "Tostada con mermelada/mantequilla",
                    "Fruta y yogur",
                    "Desayuno completo (proteína + carbohidratos)",
                  ]
                )}

                {renderRadioField(
                  "¿Cuál es tu comida problemática del día?",
                  "comidaProblematica",
                  ["Desayuno", "Media mañana", "Comida", "Merienda", "Cena", "Después de cenar"]
                )}

                {renderRadioField(
                  "¿Con qué frecuencia comes fuera de casa?",
                  "comerFuera",
                  ["Todos los días", "3-4 veces por semana", "1-2 veces por semana", "Casi nunca"]
                )}
              </>
            )}

            {/* STEP 7: ACTIVITY LEVEL */}
            {currentStep === 7 && (
              <>
                {renderRadioField(
                  "¿Cuántas veces haces ejercicio por semana?",
                  "ejercicioSemanas",
                  ["No hago ejercicio", "1-2 veces", "3-4 veces", "Más de 4 veces"]
                )}

                {renderRadioField(
                  "¿Qué tipo de ejercicio prefieres?",
                  "tipoEjercicio",
                  ["Caminar", "Gimnasio/pesas", "Clases grupales (pilates, yoga)", "Running/cardio", "Deportes en equipo"]
                )}
              </>
            )}

            {/* STEP 8: HORMONAL STATUS */}
            {currentStep === 8 && (
              <>
                {renderRadioField(
                  "¿Estás en alguna de estas situaciones?",
                  "situacionHormonal",
                  [
                    "Ciclos menstruales regulares",
                    "Perimenopausia (cambios en el ciclo)",
                    "Menopausia",
                    "Postmenopausia",
                  ]
                )}

                {renderRadioField(
                  "¿Tomas algún tipo de medicación hormonal?",
                  "medicacionHormonal",
                  ["Anticonceptivos orales", "Terapia hormonal sustitutiva", "Ninguna medicación hormonal"]
                )}

                {renderRadioField(
                  "¿Has notado cambios en tu peso relacionados con tu ciclo hormonal?",
                  "pesoHormonal",
                  ["Sí, aumento antes de la regla", "Sí, durante la menopausia", "No he notado relación"]
                )}
              </>
            )}

            {/* STEP 9: MOTIVATION & OBJECTIVES */}
            {currentStep === 9 && (
              <>
                {renderRadioField(
                  "¿Cuál es tu principal motivación para controlar tu peso?",
                  "motivacion",
                  [
                    "Sentirme mejor conmigo misma",
                    "Mejorar mi salud",
                    "Tener más energía",
                    "Estar mejor físicamente",
                    "Prevenir problemas de salud futuros",
                    "Sentirme atractiva para mi pareja",
                  ]
                )}

                {renderRadioField(
                  "¿Cuánto peso te gustaría perder?",
                  "pesoPerder",
                  ["3-5 kg", "6-10 kg", "11-15 kg", "Más de 15 kg"]
                )}
              </>
            )}
          </div>
        </div>

        {/* Navigation Buttons Row */}
        <div className="flex items-center justify-between pt-8 mt-8 border-t border-neutral-150" id="quiz-navigation-footer">
          {currentStep > 1 ? (
            <button
              onClick={onPrev}
              id="btn-quiz-prev"
              className="px-5 py-3 border-2 border-neutral-200 text-neutral-600 hover:text-black hover:border-neutral-400 font-sans font-bold text-sm rounded-xl transition-all duration-150 flex items-center gap-1.5 cursor-pointer bg-white"
            >
              <ChevronLeft className="w-4 h-4" />
              Volver
            </button>
          ) : (
            <span /> // Spacer placeholder
          )}

          <button
            onClick={onNext}
            disabled={!isStepValid()}
            id="btn-quiz-next"
            className={`px-7 py-3.5 font-sans font-black text-sm rounded-xl shadow-sm flex items-center gap-2 cursor-pointer transition-all duration-155 ${
              isStepValid()
                ? "bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-md cursor-pointer"
                : "bg-neutral-100 text-neutral-400 cursor-not-allowed border border-neutral-200"
            }`}
          >
            {currentStep === totalSteps ? "Siguiente: Diagnóstico" : "SIGUIENTE PREGUNTA"}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* RIGHT: BENTO SIDEBAR (Spans 4 cols on desktop) */}
      <div className="lg:col-span-4 flex flex-col gap-5 justify-start" id="quiz-bento-sidebar">
        
        {/* Conditional high-craft minimalist photo card when asking about meals */}
        {currentStep === 6 && (
          <div className="bento-card p-0 overflow-hidden relative min-h-[240px] shadow-sm border border-neutral-200 group flex flex-col justify-between" id="sidebar-food-photo-card">
            <div className="h-40 w-full overflow-hidden relative">
              <img
                src={healthyBreakfastPath}
                alt="Ejemplo de desayuno saludable Glucemia A Medida"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-2.5 left-2.5 bg-emerald-500 text-white font-mono uppercase text-[8px] font-bold px-2 py-0.5 rounded-full border border-emerald-400/20 shadow-sm">
                Desayuno Amigo
              </div>
            </div>
            <div className="p-4 bg-white">
              <span className="text-[9px] uppercase tracking-widest font-mono font-bold text-emerald-700 block mb-1">
                🍳 Regla de Oro en Ayunas
              </span>
              <h4 className="text-xs font-bold font-display text-black mb-1 leading-tight">
                Proteínas y Grasas Inteligentes
              </h4>
              <p className="text-[11px] text-neutral-500 leading-normal font-sans">
                Los huevos y el aguacate evitan la liberación brusca de glucosa, apagando por completo la ansiedad por el dulce de las tardes.
              </p>
            </div>
          </div>
        )}

        {/* Sidebar Info - Did you know? (Dark Theme Bento Item) */}
        <div className="bento-card-dark flex flex-col justify-between shadow-sm min-h-[220px]" id="sidebar-fact-box">
          <div className="space-y-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/15 flex items-center justify-center border border-emerald-500/20">
              <span className="text-xl">💡</span>
            </div>
            
            <span className="text-[10px] text-emerald-400 uppercase tracking-widest font-mono font-bold block">
              {sidebarData.tag}
            </span>
            
            <h3 className="text-md font-bold font-display text-white">
              ¿Sabías que...?
            </h3>
            
            <p className="text-xs text-neutral-400 leading-relaxed font-sans font-light">
              {sidebarData.fact}
            </p>
          </div>
        </div>

        {/* Sidebar Trust & Statistics (Light Green Bento Box) */}
        <div className="bento-card-green flex flex-col justify-between shadow-sm min-h-[180px]" id="sidebar-proof-box">
          <div className="space-y-3.5">
            <div className="flex items-center gap-1.5" id="sidebar-social-avatars">
              <div className="flex -space-x-1.5">
                {[5, 6, 7].map((num) => (
                  <img
                    key={num}
                    src={`https://picsum.photos/seed/face${num}/80/80`}
                    className="w-5 h-5 rounded-full border border-white object-cover"
                    alt="Usuaria española"
                    referrerPolicy="no-referrer"
                  />
                ))}
              </div>
              <span className="text-[10px] uppercase font-mono font-bold text-emerald-800 tracking-wide">
                +15.000 Mujeres españolas
              </span>
            </div>

            <p className="text-xs italic text-emerald-950 font-sans font-medium leading-relaxed">
              {currentStep <= 4 
                ? '"Comprender mi cuerpo facilitó desinflamar la barriga en dos semanas sin matarme de hambre."'
                : '"Las pautas glucémicas adaptadas me han devuelto la vitalidad por completo tras las comidas."'}
            </p>
          </div>
          
          <span className="text-[10px] font-bold text-emerald-800 block pt-3 border-t border-emerald-200/50 mt-2">
            {currentStep <= 4 ? "— Laura, 41 años (Madrid)" : "— Isabel, 44 años (Barcelona)"}
          </span>
        </div>
      </div>

    </div>
  );
}

