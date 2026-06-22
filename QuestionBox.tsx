import React, { useState } from "react";
import { Heart, ShieldCheck, Sparkles } from "lucide-react";
import { QuizState } from "./types";
import WelcomeScreen from "./components/WelcomeScreen";
import QuestionBox from "./components/QuestionBox";
import ResultsScreen from "./components/ResultsScreen";

const INITIAL_STATE: QuizState = {
  edad: "",
  provincia: "",
  situacion: "",
  tiempoIntentando: "",
  dietasProbadas: "",
  resultadoDietas: "",
  sintomas: [],
  acumulaGrasa: "",
  subePrimero: "",
  diabetesFamiliar: "",
  obesidadFamiliar: "",
  desayuno: "",
  comidaProblematica: "",
  comerFuera: "",
  ejercicioSemanas: "",
  tipoEjercicio: "",
  situacionHormonal: "",
  medicacionHormonal: "",
  pesoHormonal: "",
  motivacion: "",
  pesoPerder: "",
  leadName: "",
  leadEmail: "",
  leadWhatsapp: "",
};

export default function App() {
  const [view, setView] = useState<"welcome" | "quiz" | "results">("welcome");
  const [currentStep, setCurrentStep] = useState(1);
  const [state, setState] = useState<QuizState>(INITIAL_STATE);

  const TOTAL_STEPS = 9;

  // Facebook Pixel tracking for each stage / step of the quiz
  React.useEffect(() => {
    if (typeof window === "undefined") return;

    let path = "/";
    let stepName = "";

    if (view === "welcome") {
      path = "/welcome";
      stepName = "WelcomeView";
    } else if (view === "quiz") {
      path = `/quiz/step-${currentStep}`;
      const stepNames = [
        "Step1_Demographics",
        "Step2_WeightHistory",
        "Step3_Symptoms",
        "Step4_WeightDistribution",
        "Step5_FamilyHistory",
        "Step6_EatingHabits",
        "Step7_ActivityLevel",
        "Step8_HormonalStatus",
        "Step9_MotivationAndGoals",
      ];
      stepName = stepNames[currentStep - 1] || `Step${currentStep}`;
    } else if (view === "results") {
      path = "/results";
      stepName = "ResultsView";
    }

    // Safely update the browser address bar with the current virtual path so that
    // browser url-based and custom-conversion based rules trigger perfectly.
    try {
      const urlParams = new URLSearchParams(window.location.search);
      if (view === "quiz") {
        urlParams.set("step", currentStep.toString());
      } else {
        urlParams.set("step", view);
      }
      const newUrl = window.location.pathname + "?" + urlParams.toString();
      window.history.pushState({ path: newUrl }, "", newUrl);
    } catch (e) {
      console.warn("Failed to pushState for pixel virtual URL:", e);
    }

    // Trigger Facebook Pixel events
    if ((window as any).fbq) {
      // Fire standard PageView with the new virtual URL
      (window as any).fbq("track", "PageView");

      // Fire a Custom Event representing each specific stage
      (window as any).fbq("trackCustom", stepName, {
        step: currentStep,
        view: view,
        timestamp: new Date().toISOString()
      });

      // Track a standard or custom interaction event for optimization
      (window as any).fbq("trackCustom", "QuizInteraction", {
        quizView: view,
        quizStep: view === "quiz" ? currentStep : null,
      });
    }
  }, [view, currentStep]);

  const handleStart = () => {
    setView("quiz");
    setCurrentStep(1);
  };

  const handleUpdate = (updates: Partial<QuizState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Facebook Pixel 'Lead' event
      if (typeof window !== "undefined" && (window as any).fbq) {
        (window as any).fbq("track", "Lead", {
          content_name: "Registro de Diagnóstico de Resistencia a la Insulina",
          value: 0.0,
          currency: "EUR"
        });
      }
      setView("results");
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans flex flex-col justify-between selection:bg-emerald-100 selection:text-emerald-900" id="app-root">
      
      {/* Dynamic Progress Bar at the very top of the browser when in quiz mode */}
      {view === "quiz" && (
        <div className="w-full h-1.5 bg-neutral-100 sticky top-0 z-50 overflow-hidden" id="sticky-top-progress-container">
          <div
            className="h-full bg-emerald-500 transition-all duration-300 ease-out"
            style={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
            id="sticky-top-progress-bar"
          ></div>
        </div>
      )}

      {/* HEADER SECTION */}
      <header className="border-b border-neutral-100 py-4 bg-white/90 backdrop-blur-sm sticky top-0 z-40" id="main-header">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView("welcome")} id="brand-logo-wrapper">
            <div className="p-1 px-2.5 bg-emerald-500 text-white rounded-lg font-display font-black text-sm tracking-wide">
              G
            </div>
            <span className="font-display font-medium text-lg leading-none select-none tracking-tight">
              Glucemia <span className="text-emerald-500 font-bold">A Medida</span>
            </span>
          </div>

          <div className="flex items-center gap-2" id="header-guarantees">
            <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" />
            <span className="text-[11px] sm:text-xs text-neutral-500 font-mono tracking-tight uppercase hidden sm:inline">
              Autodiagnóstico Clínico Oficial
            </span>
          </div>
        </div>
      </header>

      {/* MAIN DYNAMIC VIEWPORT */}
      <main className="flex-1 flex items-center justify-center py-6 sm:py-10" id="main-content-area">
        <div className="w-full max-w-6xl mx-auto px-4">
          
          {/* Welcome view */}
          {view === "welcome" && (
            <WelcomeScreen onStart={handleStart} />
          )}

          {/* Quiz stepping */}
          {view === "quiz" && (
            <div className="space-y-6" id="quiz-stepper-view">
              <QuestionBox
                currentStep={currentStep}
                totalSteps={TOTAL_STEPS}
                state={state}
                onChange={handleUpdate}
                onNext={handleNext}
                onPrev={handlePrev}
              />
            </div>
          )}

          {/* Diagnosis results screen */}
          {view === "results" && (
            <ResultsScreen state={state} />
          )}

        </div>
      </main>

      {/* FOOTER SECTION */}
      <footer className="border-t border-neutral-100 py-6 bg-neutral-50 text-neutral-500 text-xs text-center" id="main-footer">
        <div className="max-w-6xl mx-auto px-4 space-y-3">
          <p>© 2026 Glucemia A Medida. Todos los derechos reservados.</p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-[10px] text-neutral-400">
            <span className="cursor-pointer hover:text-emerald-500 underline">Aviso Legal</span>
            <span>•</span>
            <span className="cursor-pointer hover:text-emerald-500 underline">Política de Privacidad (RGPD)</span>
            <span>•</span>
            <span className="cursor-pointer hover:text-emerald-500 underline">Condiciones de Contratación</span>
            <span>•</span>
            <span className="cursor-pointer hover:text-emerald-500 underline">Contacto</span>
          </div>
          <p className="text-[9px] text-neutral-400 max-w-2xl mx-auto leading-relaxed pt-1">
            Exención de responsabilidad: Este test es una herramienta de orientación y autoevaluación informativa. En ningún momento sustituye el diagnóstico, consejo o tratamiento de un profesional médico colegiado.
          </p>
        </div>
      </footer>

    </div>
  );
}
