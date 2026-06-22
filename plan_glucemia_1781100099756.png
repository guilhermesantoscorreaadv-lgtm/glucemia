import React from "react";
import { Play, CheckCircle, ShieldCheck } from "lucide-react";
import mujerBienvenidaPath from "../assets/images/mujer_bienvenida_1781100090821.png";
import mediterraneanIngredientsPath from "../assets/images/mediterranean_ingredients_1781101243312.png";

interface WelcomeScreenProps {
  onStart: () => void;
}

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-5 py-4 md:py-8 max-w-6xl mx-auto px-4" id="welcome-bento-grid">
      
      {/* CARD 1: MAIN HERO TEXT BLOCK (Spans 8 cols on desktop) */}
      <div className="bento-card md:col-span-8 flex flex-col justify-between min-h-[360px] shadow-sm hover:shadow-md transition-shadow" id="welcome-card-hero">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-100" id="badge-clínico">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
            Test de Autoevaluación Regulado
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black tracking-tight text-black leading-tight" id="welcome-title">
            ¿Tu <span className="text-emerald-500 underline decoration-wavy decoration-emerald-200">Resistencia a la Insulina</span> Te Impide Adelgazar?
          </h1>

          <p className="text-sm sm:text-base text-neutral-600 font-sans font-normal leading-relaxed" id="welcome-subtitle">
            Descubre en <span className="font-semibold text-black">3 minutos</span> por qué tu metabolismo sabotea tus esfuerzos y conoce la relación exacta entre tu glucemia y tu peso femenino.
          </p>
        </div>

        {/* CTA section inside the same primary card */}
        <div className="pt-6 border-t border-neutral-100 mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4" id="welcome-hero-cta-section">
          <button
            onClick={onStart}
            id="btn-iniciar-test"
            className="w-full sm:w-auto px-7 py-3.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-sans font-bold text-md rounded-xl transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer shadow-md hover:shadow-lg"
          >
            INICIAR TEST GRATUITO
            <Play className="w-4 h-4 fill-white group-hover:translate-x-1 transition-transform" />
          </button>
          
          <div className="flex flex-col gap-1 text-[11px] text-neutral-400 font-mono" id="welcome-sec-info">
            <span className="flex items-center gap-1">⏱️ Duración: 2-3 minutos</span>
            <span className="flex items-center gap-1">📋 Análisis de 9 dimensiones metabólicas</span>
          </div>
        </div>
      </div>

      {/* CARD 2: IMAGE PORTRAIT BLOCK (Spans 4 cols on desktop) */}
      <div className="bento-card md:col-span-4 p-0 overflow-hidden relative min-h-[300px] shadow-sm hover:shadow-md transition-shadow group" id="welcome-card-image">
        <img
          src={mujerBienvenidaPath}
          alt="Mujer española saludable sobre los 35 sonriente"
          className="w-full h-full object-cover absolute inset-0 transition-transform duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
          id="img-mujer-bienvenida"
        />
        {/* Subtle high contrast bottom panel inside the portrait overlay */}
        <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-3 rounded-2xl border border-neutral-100 shadow-md flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0"></div>
          <p className="text-[11px] text-neutral-800 font-medium leading-tight">
            "Mi peso se estabilizó cuando regulé mi glucemia." - Laura, 41 años (Madrid)
          </p>
        </div>
      </div>

      {/* CARD 3: SOCIAL PROOF BLOCK with Green background (Spans 4 cols) */}
      <div className="bento-card-green md:col-span-4 flex flex-col justify-between shadow-sm hover:shadow-md h-full" id="welcome-card-proof">
        <div className="space-y-3">
          <div className="flex items-center gap-2" id="welcome-counter-wrapper">
            <div className="flex -space-x-1.5">
              {[1, 2, 3].map((num) => (
                <img
                  key={num}
                  src={`https://picsum.photos/seed/face${num}/80/80`}
                  className="w-6 h-6 rounded-full border border-white object-cover shadow-sm"
                  alt="Usuario de España"
                  referrerPolicy="no-referrer"
                />
              ))}
            </div>
            <span className="text-xs font-bold text-emerald-800">MÁS DE 15.000 MUJERES</span>
          </div>

          <p className="text-xs italic text-emerald-900 leading-relaxed font-sans font-medium">
            "Por fin entiendo por qué ninguna dieta me funcionaba. No era falta de fuerza de voluntad, era un bloqueo metabólico real por picos de insulina."
          </p>
        </div>

        <span className="text-[11px] font-bold text-emerald-800 block pt-4 mt-2 border-t border-emerald-200/50">
          — Maria, 42 años (Murcia)
        </span>
      </div>

      {/* CARD 4: CLINICAL KEY INGREDIENTS FOCUS (Spans 4 cols on desktop) - REAL FOOD PHOTO */}
      <div className="bento-card md:col-span-4 p-0 overflow-hidden relative min-h-[300px] shadow-sm border border-neutral-200 group flex flex-col justify-between" id="welcome-card-fact">
        <div className="h-44 w-full overflow-hidden relative">
          <img
            src={mediterraneanIngredientsPath}
            alt="Ingredientes mediterráneos saludables en Glucemia A Medida"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            referrerPolicy="no-referrer"
            id="img-mediterranean-ingredients"
          />
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full border border-neutral-200/50 shadow-sm flex items-center gap-1 text-[9px] font-bold text-neutral-800 uppercase tracking-wider font-mono">
            <span>🥗 Alimentos Aliados</span>
          </div>
        </div>
        <div className="p-4 flex-1 flex flex-col justify-between bg-white">
          <div className="space-y-1.5">
            <h3 className="text-xs font-bold font-display uppercase tracking-wider text-emerald-700">Ingredientes de Reversión</h3>
            <p className="text-[11px] text-neutral-500 leading-normal font-sans">
              Combina alimentos reales (aguacate, aceite de oliva virgen extra y vegetales de hoja) para estabilizar la curva de insulina de forma inmediata.
            </p>
          </div>
        </div>
      </div>

      {/* CARD 5: PRIVACY & DIGITAL SAFETY BLOCK (Spans 4 cols) */}
      <div className="bento-card md:col-span-4 flex flex-col justify-between shadow-sm hover:shadow-md" id="welcome-card-security">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-emerald-600 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            Privacidad Española
          </div>
          <h3 className="text-sm font-semibold font-display text-neutral-900">100% Confidencial</h3>
          <p className="text-[11.5px] text-neutral-500 leading-relaxed font-sans">
            Tus datos médicos y respuestas están totalmente protegidos de conformidad con el estricto Reglamento de Privacidad RGPD de la Unión Europea.
          </p>
        </div>

        <span className="text-[10px] font-mono text-neutral-400 block pt-4">
          🔒 Conexión Encriptada SSL
        </span>
      </div>

    </div>
  );
}

