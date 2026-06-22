import React, { useState } from "react";
import { CheckCircle, AlertTriangle, ArrowRight, ShieldCheck, Heart, Sparkles, BookOpen, CreditCard, Award, ShoppingBag, FileText } from "lucide-react";
import planGlucemiaPath from "../assets/images/plan_glucemia_1781100099756.png";
import gourmetSalmonPlatePath from "../assets/images/gourmet_salmon_plate_1781101230607.png";
import CountdownTimer from "./CountdownTimer";
import { QuizState, ScoreCategory } from "../types";

interface ResultsScreenProps {
  state: QuizState;
}

export default function ResultsScreen({ state }: ResultsScreenProps) {
  const [showCheckout, setShowCheckout] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Track page view event using Facebook pixel when results screen loads
  React.useEffect(() => {
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "ViewContent", {
        content_name: "Informe Resistencia a la Insulina",
        content_category: "Diagnosis",
        value: 0.0,
        currency: "EUR"
      });
    }
  }, []);

  const handleHotmartRedirect = () => {
    setIsRedirecting(true);
    setShowCheckout(true);

    // Track Facebook pixel InitiateCheckout event
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "InitiateCheckout", {
        content_name: "Método Glucemia A Medida",
        content_category: "Plan de Hábitos",
        value: 9.00,
        currency: "EUR"
      });
    }

    // Redirect to Hotmart Checkout
    setTimeout(() => {
      window.location.href = "https://pay.hotmart.com/T106287207P?bid=1781235479887";
    }, 1500);
  };

  // Calculate score based on user responses
  const getMetabolicAnalysis = () => {
    let score = 0;

    // Age risk factor
    if (state.edad !== "25-34 años") {
      score += 1;
    }

    // Weight history risk factor
    if (state.tiempoIntentando === "Más de 3 años" || state.tiempoIntentando === "1-3 años") {
      score += 2;
    }
    if (state.dietasProbadas === "Más de 5 dietas" || state.dietasProbadas === "3-5 dietas") {
      score += 2;
    }
    if (state.resultadoDietas === "No consigo bajar nada de peso" || state.resultadoDietas === "Me cuesta mucho bajar peso") {
      score += 3;
    } else if (state.resultadoDietas === "Bajo peso pero lo recupero pronto") {
      score += 1;
    }

    // Symptoms check
    score += state.sintomas.length * 1.5;

    // Weight distribution
    if (state.acumulaGrasa === "Principalmente en el abdomen/barriga" || state.acumulaGrasa === "Principalmente en la cintura") {
      score += 2;
    }
    if (state.subePrimero === "En el abdomen") {
      score += 2;
    }

    // Family history
    if (state.diabetesFamiliar && state.diabetesFamiliar !== "No tengo antecedentes") {
      score += 2;
    }
    if (state.obesidadFamiliar === "Sí, varios familiares") {
      score += 2;
    } else if (state.obesidadFamiliar === "Sí, algún familiar") {
      score += 1;
    }

    // Eating habits
    if (state.desayuno.includes("dulce") || state.desayuno.includes("mermelada")) {
      score += 1;
    }
    if (state.comidaProblematica === "Merienda" || state.comidaProblematica === "Después de cenar" || state.comidaProblematica === "Media mañana") {
      score += 1;
    }

    // Exercise
    if (state.ejercicioSemanas === "No hago ejercicio") {
      score += 2;
    } else if (state.ejercicioSemanas === "1-2 veces") {
      score += 1;
    }

    // Hormonal
    if (state.situacionHormonal === "Perimenopausia (cambios en el ciclo)" || state.situacionHormonal === "Menopausia") {
      score += 1.5;
    }
    if (state.pesoHormonal && state.pesoHormonal !== "No he notado relación") {
      score += 1;
    }

    let category: ScoreCategory = "BAJA";
    if (score >= 12) {
      category = "ALTA";
    } else if (score >= 6) {
      category = "MEDIA";
    }

    return { score, category };
  };

  const { score, category } = getMetabolicAnalysis();

  // Redirection handled by handleHotmartRedirect

  return (
    <div className="max-w-6xl mx-auto py-4 px-4 sm:px-6 space-y-6" id="results-wrapper">
      
      {/* 1. REPORT HEADER - Bento styled header card */}
      <div className="bento-card shadow-sm text-center space-y-3" id="results-header-section">
        <span className="text-[10px] uppercase tracking-widest font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-100/50 px-3 py-1 rounded-full inline-block">
          🔬 Informe de Diagnóstico Clínico Privado
        </span>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-black text-black leading-tight">
          Perfil de Vulnerabilidad Metabólica de {state.leadName || "Autoevaluación"}
        </h1>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-neutral-500 font-mono">
          <span>Edad: <strong>{state.edad || "35+ años"}</strong></span>
          <span>•</span>
          <span>Ubicación: <strong>{state.provincia || "España"}</strong></span>
          <span>•</span>
          <span>Ciclo Hormonal: <strong>{state.situacionHormonal || "General"}</strong></span>
        </div>
      </div>

      {/* 2. MAIN BENTO GRID: SCORE & DIAGNOSIS (12-column Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch" id="results-score-grid">
        
        {/* Left score panel (Spans 4 columns on desktop) */}
        <div className="bento-card lg:col-span-4 flex flex-col justify-between min-h-[250px] shadow-sm" id="score-meter-panel">
          <div>
            <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-widest block mb-1">Escala Celular</span>
            <h3 className="text-md font-semibold font-display text-neutral-900">Índice HOMA Estimado</h3>
            
            <div className="text-5xl font-display font-black text-black my-5" id="score-text">
              {Math.min(98, Math.round(score * 3.8))}
              <span className="text-lg text-neutral-400 font-normal">/100</span>
            </div>
            
            <p className="text-xs text-neutral-500 leading-relaxed font-sans">
              Grado estimado de resistencia periférica a la insulina según la combinación de tu somatotipo, síntomas vespertinos y línea genética familiar.
            </p>
          </div>

          <div className="space-y-2.5 pt-6 border-t border-neutral-100 mt-4">
            <div className="flex justify-between text-[11px] font-bold text-neutral-500 font-mono">
              <span className="text-emerald-600">BAJA</span>
              <span className="text-amber-600">MEDIA</span>
              <span className="text-red-600">ALTA</span>
            </div>
            <div className="h-3 rounded-full bg-neutral-100 overflow-hidden relative border border-neutral-200/50">
              <div 
                className={`h-full absolute left-0 top-0 transition-all duration-1000 rounded-full ${
                  category === "ALTA" ? "bg-red-500" : category === "MEDIA" ? "bg-amber-500" : "bg-emerald-500"
                }`}
                style={{ width: `${Math.min(100, Math.round(score * 3.8))}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Right outcome explanation (Spans 8 columns on desktop) */}
        <div className="lg:col-span-8 p-6 sm:p-8 rounded-[24px] border-2 transition-all duration-300 flex flex-col justify-between shadow-sm" id="diagnostico-feedback-panel"
             style={{
               borderColor: category === "ALTA" ? "rgba(239, 68, 68, 0.25)" : category === "MEDIA" ? "rgba(245, 158, 11, 0.25)" : "rgba(22, 163, 74, 0.25)",
               backgroundColor: category === "ALTA" ? "#fef2f2" : category === "MEDIA" ? "#fffbeb" : "#f0fdf4"
             }}>
          
          <div className="space-y-4">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-mono tracking-wider ${
               category === "ALTA" ? "bg-red-100 text-red-800 border border-red-200/50" : category === "MEDIA" ? "bg-amber-100 text-amber-800 border border-amber-200/50" : "bg-emerald-100 text-emerald-800 border border-emerald-200/50"
            }`}>
              {category === "ALTA" && <AlertTriangle className="w-3.5 h-3.5 text-red-700" />}
              {category === "MEDIA" && <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />}
              {category === "BAJA" && <CheckCircle className="w-3.5 h-3.5 text-emerald-700" />}
              {category === "ALTA" && "DIAGNÓSTICO: ALTO BLOQUEO METABÓLICO"}
              {category === "MEDIA" && "DIAGNÓSTICO: SENSIBILIDAD REDUCIDA"}
              {category === "BAJA" && "DIAGNÓSTICO: RESPUESTA GLUCÉMICA EFICIENTE"}
            </span>
 
            {category === "ALTA" && (
              <div className="space-y-3">
                <h2 className="text-2xl font-display font-black text-red-950 tracking-tight leading-tight">
                  Bloqueo Activo por Picos de Insulina
                </h2>
                <p className="text-neutral-800 leading-relaxed font-sans text-xs sm:text-sm font-medium animate-fade-in">
                  Hola {state.leadName || "paciente"}, tus respuestas detallan una clara saturación en tus receptores insulínicos periféricos. Esto significa que la mayor parte de lo que comes se desvía directamente a tus reservorios de grasa visceral (abdomen y cintura), mientras tus músculos sufren de falta de energía constante (provocando tu cansancio de tarde). Las dietas convencionales de restricción calorica severa solo deprimirán tu metabolismo.
                </p>
              </div>
            )}

            {category === "MEDIA" && (
              <div className="space-y-3">
                <h2 className="text-2xl font-display font-black text-amber-950 tracking-tight leading-tight">
                  Sensibilidad Celular en Declive Silencioso
                </h2>
                <p className="text-neutral-800 leading-relaxed font-sans text-xs sm:text-sm font-medium animate-fade-in">
                  Hola {state.leadName || "paciente"}, estás experimentando fluctuaciones importantes de glucemia posprandial. Aunque tu páncreas aún compensa fabricando más cantidad, tu cuerpo ya acusa fatiga por las tardes e inflamación líquida localizada. Estás en la ventana de reversión óptima: modificar el orden y ordenamiento de tus platos resolverá este bloqueo sin esfuerzo.
                </p>
              </div>
            )}

            {category === "BAJA" && (
              <div className="space-y-3">
                <h2 className="text-2xl font-display font-black text-emerald-950 tracking-tight leading-tight">
                  Buen Control Glucémico de Base
                </h2>
                <p className="text-neutral-800 leading-relaxed font-sans text-xs sm:text-sm font-medium animate-fade-in">
                  ¡Excelente, {state.leadName}! Tus respuestas clínicas muestran una respuesta idónea a los estímulos de glucosa corporales. Dado que tienes más de 35 años, adoptar pautas preventivas e inteligentes mantendrá la flexibilidad de tus células receptoras, evitando picos silenciosos que inducen a la ganancia lenta de volumen corporal con los años.
                </p>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-dashed mt-6 text-xs text-neutral-500" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
            {category === "ALTA" && (
              <p>
                <strong>Estudio epidemiológico de España:</strong> Un <strong>73% de mujeres españolas de más de 35 años</strong> logran romper este bloqueo de forma natural en los primeros 14 días al sustituir desayunos a base de harinas por proteínas saciantes, sin alterar sus comidas principales.
              </p>
            )}
            {category === "MEDIA" && (
              <p>
                Un <strong>68% de las pacientes españolas</strong> reajustan de inmediato su cortisol y recuperan la saciedad plena al aplicar técnicas sencillas de ordenamiento de alimentos (verdura/fibra primero, proteína después, carbohidrato al final).
              </p>
            )}
            {category === "BAJA" && (
              <p>
                Mantener este nivel de eficiencia glucémica ralentiza los síntomas hormonales del envejecimiento ovárico, promoviendo un peso estable y un descanso de alta calidad.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* NEW SECTION: MINIMALIST RECIPE VISUALIZER - REAL WELL-BALANCED MEAL PHOTO */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center bento-card border border-neutral-200 bg-white" id="recipe-preview-section">
        <div className="space-y-4" id="recipe-preview-left">
          <span className="text-[9px] uppercase tracking-widest font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-100/50 px-2.5 py-1 rounded-full inline-block">
            🥘 Vista Previa del Plan de Menús
          </span>
          <h3 className="text-xl sm:text-2xl font-display font-bold text-black leading-tight">
            Platos Diseñados Sin Restricciones Ni Hambre
          </h3>
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-sans">
            Tu plan recopila combinaciones deliciosas que protegen tu salud. Mira este ejemplo de <strong>Salmón Glucémico Activo</strong>: excelente aporte de ácidos grasos Omega-3 de cadena larga, huevos de granja ricos en colina y aguacate entero que modula la velocidad de absorción.
          </p>
          <ul className="text-xs text-neutral-500 space-y-2 pt-2">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0"></span>
              <span><strong>Fácil y Rápido:</strong> Listo en menos de 15 minutos con ingredientes básicos</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0"></span>
              <span><strong>Familia Compatible:</strong> Alimentos típicos de {state.provincia || "España"} aptos para toda la mesa</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0"></span>
              <span><strong>0% Ansiedad:</strong> Densidad nutricional que apaga antojos de azúcar</span>
            </li>
          </ul>
        </div>
        
        <div className="relative group overflow-hidden rounded-2xl border border-neutral-200 shadow-sm" id="recipe-preview-right">
          <img
            src={gourmetSalmonPlatePath}
            alt="Ejemplo de plato para la resistencia a la insulina"
            className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-neutral-200/50 shadow-sm text-[9px] text-neutral-800 font-semibold leading-tight">
            Proporción: 50% Vegetales y Grasas Limpias, 35% Proteína, 15% Carbohidratos Complejos
          </div>
        </div>
      </div>

      {/* 3. INTERACTIVE BENTO BLOCKS FOR USER SPECIFIC SENSITIVITY FACTORS */}
      <div className="bento-card shadow-sm space-y-5" id="symptoms-feedback-section">
        <h3 className="text-md sm:text-lg font-display font-bold text-black flex items-center gap-2">
          <Heart className="w-4.5 h-4.5 text-emerald-600 fill-emerald-100" />
          Anatomía de tus Factores de Vulnerabilidad Identificados:
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" id="symptoms-badges-container">
          {state.sintomas.length > 0 ? (
            state.sintomas.map((sym, idx) => (
              <div key={idx} className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200/50 flex items-start gap-3" id={`badge-sym-${idx}`}>
                <span className="text-red-500 font-extrabold text-xs bg-red-50 w-5 h-5 rounded-full flex items-center justify-center border border-red-150 shrink-0 mt-0.5">✗</span>
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-neutral-900 block font-display leading-snug">{sym}</span>
                  <span className="text-[11px] text-neutral-500 block leading-tight">Síntoma de desequilibrio metabólico.</span>
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100 flex items-start gap-3 col-span-1 sm:col-span-2 lg:col-span-3">
              <span className="text-emerald-600 font-bold text-md mt-0.5 shrink-0">✓</span>
              <span className="text-xs text-emerald-900 font-medium">No se han registrado síntomas celulares de picos glucémicos en tus hábitos.</span>
            </div>
          )}

          {/* Grasa Visceral specific bento card */}
          {state.acumulaGrasa.includes("abdomen") || state.acumulaGrasa.includes("cintura") ? (
            <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200/50 flex items-start gap-3" id="derived-indicator-grasa">
              <span className="text-red-500 font-extrabold text-xs bg-red-50 w-5 h-5 rounded-full flex items-center justify-center border border-red-150 shrink-0 mt-0.5">✗</span>
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-neutral-900 block font-display leading-snug">Grasa Abdominal Dominante</span>
                <span className="text-[11px] text-neutral-500 block leading-tight">Zona altamente sensible a depósitos por activación de lipogénesis de insulina.</span>
              </div>
            </div>
          ) : null}

          {/* Metabolic block card */}
          {state.resultadoDietas === "No consigo bajar nada de peso" || state.resultadoDietas === "Me cuesta mucho bajar peso" ? (
            <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200/50 flex items-start gap-3" id="derived-indicator-bloqueo">
              <span className="text-red-500 font-extrabold text-xs bg-red-50 w-5 h-5 rounded-full flex items-center justify-center border border-red-150 shrink-0 mt-0.5">✗</span>
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-neutral-900 block font-display leading-snug">Bloqueo Lipolítico Activo</span>
                <span className="text-[11px] text-neutral-500 block leading-tight">Tus células grasas tienen inhibida temporalmente la liberación de ácidos grasos.</span>
              </div>
            </div>
          ) : null}

          {/* Genetics card */}
          {state.diabetesFamiliar && state.diabetesFamiliar !== "No tengo antecedentes" ? (
            <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200/50 flex items-start gap-3" id="derived-indicator-genetics">
              <span className="text-amber-500 font-extrabold text-xs bg-amber-50 w-5 h-5 rounded-full flex items-center justify-center border border-amber-150 shrink-0 mt-0.5">⚠</span>
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-neutral-900 block font-display leading-snug">Predisposición Familiar Directa</span>
                <span className="text-[11px] text-neutral-500 block leading-tight">Antecedente directo familiar que disminuye la tolerancia natural a carbohidratos simples.</span>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {/* 4. PREMIUM OFFER BENTO PANEL: "GLUCEMIA A MEDIDA" CO-DESIGN (Black Theme Full Bento Card) */}
      <div className="bento-card-dark relative overflow-hidden flex flex-col lg:flex-row items-center gap-8 shadow-md animate-fade-in" id="sales-pitch-box">
        {/* Subtle decorative green aura glow under bento card styling */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500 rounded-full blur-3xl opacity-15 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-700 rounded-full blur-3xl opacity-10 pointer-events-none"></div>

        <div className="flex-1 space-y-6 z-10 text-left" id="sales-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-semibold rounded-full border border-emerald-500/20 uppercase font-mono" id="sales-cta-tag">
            <Sparkles className="w-3.5 h-3.5 fill-current animate-pulse" />
            Plan de Hábitos de Reversión Celular
          </div>

          <h2 className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight leading-none">
            Método "Glucemia A Medida"
          </h2>

          <p className="text-sm text-neutral-300 font-sans font-normal leading-relaxed">
            Hemos convertido tu anamnesis médica en una guía paso a paso sumamente fácil de integrar. Olvídate de pesar porciones o sufrir hambre: aprende a combinar los alimentos típicos de nuestro país para domar para siempre tus picos insulínicos.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" id="sales-features-grid">
            <div className="flex items-center gap-2.5 text-xs text-neutral-200">
              <div className="w-4 h-4 rounded-full bg-emerald-500/10 border border-emerald-400/30 flex items-center justify-center text-emerald-400 shrink-0 font-bold">✓</div>
              <span><strong>Pautas de Desayunos:</strong> Desactiva la ansiedad de las 17:00h</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-neutral-200">
              <div className="w-4 h-4 rounded-full bg-emerald-500/10 border border-emerald-400/30 flex items-center justify-center text-emerald-400 shrink-0 font-bold">✓</div>
              <span><strong>Menús con ingredientes de Mercadona</strong> y tiendas habituales</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-neutral-200">
              <div className="w-4 h-4 rounded-full bg-emerald-500/10 border border-emerald-400/30 flex items-center justify-center text-emerald-400 shrink-0 font-bold">✓</div>
              <span><strong>Trucos sencillos</strong> para neutralizar postres y cenas de tapas</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-neutral-200">
              <div className="w-4 h-4 rounded-full bg-emerald-500/10 border border-emerald-400/30 flex items-center justify-center text-emerald-400 shrink-0 font-bold">✓</div>
              <span><strong>Guía Hormonal</strong> específica para {state.edad || "35+ años"}</span>
            </div>
          </div>

          {/* Price highlight */}
          <div className="flex items-center gap-4 pt-4 border-t border-neutral-850" id="sales-pricing">
            <div className="text-2xl font-mono text-neutral-500 line-through font-bold">47€</div>
            <div className="text-4xl sm:text-5xl font-display font-black text-emerald-400 flex items-baseline">
              9€
              <span className="text-xs font-mono text-neutral-400 font-normal ml-2">pago único</span>
            </div>
            <span className="bg-emerald-500/15 text-emerald-400 text-[10px] font-mono font-bold px-2 py-0.5 rounded border border-emerald-500/30 animate-pulse">
              OFFER 80%
            </span>
          </div>

          {/* Trigger button & Countdown Timer */}
          <div className="space-y-4 pt-2">
            <button
              onClick={handleHotmartRedirect}
              disabled={isRedirecting}
              id="btn-buy-plan"
              className="w-full sm:w-auto px-7 py-3.5 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-sans font-black text-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider animate-bounce-subtle disabled:opacity-85 disabled:cursor-wait"
            >
              {isRedirecting ? "Redirigiendo a Hotmart..." : "OBTENER MI INFORME + PLAN POR 9€"}
              <ArrowRight className="w-4 h-4" />
            </button>
            
            <div className="bg-white/5 inline-block px-4 py-2 rounded-xl border border-white/10" id="results-count-timer">
              <CountdownTimer />
            </div>
          </div>
        </div>

        {/* Ebook Mockup Image (Spans layout) */}
        <div className="flex-1 w-full max-w-xs shrink-0 relative mt-4 lg:mt-0" id="sales-right">
          <div className="relative group overflow-hidden rounded-2xl">
            <div className="absolute -inset-1 bg-emerald-500/10 rounded-2xl blur-md"></div>
            <img
              src={planGlucemiaPath}
              alt="Ebook Glucemia a Medida"
              className="relative rounded-2xl border border-neutral-800/80 w-full object-cover shadow-2xl transition-transform duration-500 group-hover:scale-[1.03]"
              referrerPolicy="no-referrer"
              id="img-plan-cover"
            />
          </div>
        </div>
      </div>

      {/* 5. SECURE CHECKOUT REDIRECT */}
      {showCheckout && (
        <div className="fixed inset-0 bg-neutral-900/75 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in" id="checkout-modal-backdrop">
          <div className="bg-white rounded-[24px] overflow-hidden w-full max-w-md shadow-2xl border border-neutral-200 flex flex-col p-6 text-center space-y-6" id="checkout-modal">
            
            {/* Elegant Loading Animation */}
            <div className="flex flex-col items-center justify-center pt-4" id="redirect-visual">
              <div className="relative flex items-center justify-center w-20 h-20">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-20"></span>
                <div className="relative p-5 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100">
                  <ShoppingBag className="w-8 h-8 animate-pulse" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-emerald-700 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full inline-block">
                Conexión Segura Encriptada
              </span>
              <h3 className="text-xl font-display font-black text-black leading-tight">
                Cargando Pasarela de Hotmart...
              </h3>
              <p className="text-neutral-500 text-xs leading-relaxed max-w-sm mx-auto p-1 bg-neutral-50/50 rounded-xl">
                Te estamos redirigiendo de forma segura a la pasarela de pago oficial de Hotmart para que puedas completar la descarga de tu plan personalizado.
              </p>
            </div>

            {/* Simulated progress indicator */}
            <div className="w-full h-1.5 bg-neutral-100 rounded-full overflow-hidden" id="redirect-bar-container">
              <div className="h-full bg-emerald-500 animate-pulse" style={{ width: '100%' }}></div>
            </div>

            <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200/60 text-left space-y-1.5 text-xs text-neutral-600">
              <div className="flex justify-between">
                <span className="font-medium text-neutral-500">Producto:</span>
                <span className="font-bold text-neutral-900">Método Glucemia A Medida</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-neutral-500">Precio Especial:</span>
                <span className="font-bold text-emerald-600 underline">9,00 € (Pago único)</span>
              </div>
              {state.leadEmail && (
                <div className="flex justify-between border-t border-neutral-200/50 pt-1.5 mt-1.5">
                  <span className="font-medium text-neutral-500">Email Asociado:</span>
                  <span className="font-mono text-[11px] text-neutral-800 font-bold">{state.leadEmail}</span>
                </div>
              )}
            </div>

            <div className="flex flex-col items-center gap-3 pt-2">
              <a
                href="https://pay.hotmart.com/T106287207P?bid=1781235479887"
                onClick={() => {
                  if (typeof window !== "undefined" && (window as any).fbq) {
                    (window as any).fbq("track", "InitiateCheckout", {
                      content_name: "Método Glucemia A Medida",
                      value: 9.00,
                      currency: "EUR"
                    });
                  }
                }}
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-sans font-black text-xs sm:text-sm rounded-xl shadow-md transition-colors text-center uppercase tracking-wider"
              >
                ¿No has sido redirigido? Clic aquí
              </a>
              <button
                onClick={() => setShowCheckout(false)}
                className="text-xs text-neutral-400 hover:text-neutral-600 underline cursor-pointer"
              >
                Volver al diagnóstico
              </button>
            </div>

            {/* Trust logos */}
            <div className="flex justify-center items-center gap-4 text-[9px] text-neutral-400 pt-2 border-t border-neutral-100">
              <span className="flex items-center gap-1">🛡️ SSL Encriptado</span>
              <span className="flex items-center gap-1">✅ Pago 100% Seguro</span>
              <span className="flex items-center gap-1">🔒 Conexión Segura</span>
            </div>
          </div>
        </div>
      )}

      {/* 6. GUARANTEE / BADGES SECTION - grid of beautiful white bento cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4" id="results-guarantees">
        <div className="bento-card hover:shadow-md text-center space-y-2" id="guarantee-award">
          <Award className="w-8 h-8 text-emerald-600 mx-auto" strokeWidth={1.5} />
          <h4 className="text-sm font-bold font-display text-black">Garantía de Satisfacción 100%</h4>
          <p className="text-xs text-neutral-500 leading-relaxed">
            Si en 14 días no experimentas un incremento drástico en tu vitalidad o una bajada de apetito por las tardes, te devolvemos tus 9€ sin preguntas.
          </p>
        </div>
        <div className="bento-card hover:shadow-md text-center space-y-2" id="guarantee-supermarket">
          <BookOpen className="w-8 h-8 text-emerald-600 mx-auto" strokeWidth={1.5} />
          <h4 className="text-sm font-bold font-display text-black">Recetario 100% Realista</h4>
          <p className="text-xs text-neutral-500 leading-relaxed">
            Recetas basadas exclusivamente en productos fáciles de encontrar en Mercadona, Dia, Carrefour o cualquier frutería tradicional de {state.provincia || "España"}.
          </p>
        </div>
        <div className="bento-card hover:shadow-md text-center space-y-2" id="guarantee-payment">
          <ShieldCheck className="w-8 h-8 text-emerald-600 mx-auto" strokeWidth={1.5} />
          <h4 className="text-sm font-bold font-display text-black">Pago Único Sin Cargos Ocultos</h4>
          <p className="text-xs text-neutral-500 leading-relaxed">
            Un único desembolso total de 9€. Olvídate de suscripciones periódicas encubiertas, renovaciones automáticas o costes añadidos.
          </p>
        </div>
      </div>
    </div>
  );
}
