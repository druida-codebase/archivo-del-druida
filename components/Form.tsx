'use client';

import {
    acidezData, amargorData, astringenciaData, clasificadoresData,
    corteData, cuerpoData, manufacturaData, permanenciaData,
    saborData, sequedadData, simetriaData, tactoData, tecnicaData
} from '@/components/mapping';
import {
    AnalysisSchema, InfusionSchema, ReportSchema,
    ReportType, emptyInfusion, regionesOptions, tiposOptions
} from '@/components/schemas';
import { GeneratePDF } from '@/components/pdf';
import { patchInfusion, patchNested } from '@/components/utils';
import { useRef, useState } from 'react';
import { AromaSelector } from './AromaSelector';
import { OrigenSelector } from './OrigenSelector';
import { TiposSelector } from './TipoSelector';
type FormProps = {
    draft: ReportType;
    setDraft: React.Dispatch<React.SetStateAction<ReportType>>;
}

const fieldLabels: Record<string, string> = {
    'fecha': 'Fecha de la cata',
    'reviewer': 'Cata realizada por',
    'analisis.nombre': 'Nombre del té',
    'analisis.corte': 'Tipo de corte',
    'analisis.formaHierba': 'Forma de la hebra',
    'analisis.granulometria': 'Granulometría',
    'analisis.tipo': 'Variedad de té',
    'analisis.aromaHebra': 'Aroma en seco',
    'analisis.sequedadHebra': 'Grado de sequedad',
    'analisis.metodo': 'Método de preparación',
    'analisis.maestrias': 'Maestrías/Procesos',
    'analisis.region': 'Origen / Región',
    'analisis.colorHebra': 'Color de la hebra',
    'analisis.manufactura': 'Tipo de manufactura',
    'analisis.cantidad': 'Cantidad de hojas (g)',
    'infusiones.aroma': 'Perfil aromático',
    'infusiones.aromaPersonalizado': 'Notas aromáticas propias',
    'infusiones.tiempo': 'Tiempo de infusión',
    'infusiones.colorAro': 'Color del aro',
    'infusiones.sabor': 'Perfil de sabor',
    'infusiones.terroir': 'Notas de terroir',
    'infusiones.boca': 'Sensación en boca',
    'infusiones.estructura': 'Estructura del licor',
    'infusiones.temperatura': 'Temperatura del agua',
    'infusiones.colorLicor': 'Color del licor',
    'infusiones.pureza': 'Claridad / Pureza',
    'infusiones.score': 'Puntaje de infusión',
    'infusiones.amargor': 'Nivel de amargor',
    'infusiones.acidez': 'Nivel de acidez',
    'infusiones.sensacion': 'Impresión general',
    'infusiones.permanencia': 'Retrogusto / Persistencia',
    'infusiones.astringencia': 'Nivel de astringencia',
    'infusiones.cuerpo': 'Cuerpo del té',
    'postinfusion.tacto': 'Textura de la hoja',
    'postinfusion.simetria': 'Simetría foliar',
    'postinfusion.aromaFondo': 'Aroma en cuenco vacío',
    'postinfusion.maridaje': 'Sugerencia de maridaje',
    'postinfusion.observaciones': 'Notas adicionales'
};

const formatErrors = (issues: any[]) => {
    return issues.map(issue => {
        const [root, indexOrField, field] = issue.path;
        if (root === 'infusiones' && typeof indexOrField === 'number') {
            const label = fieldLabels[`infusiones.${String(field)}`] ?? String(field);
            return `Infusión ${indexOrField + 1}: ${label}`;
        }
        const label = fieldLabels[issue.path.join('.')] ?? issue.path.join('.');
        return label;
    });
};

const inputClass = "bg-bg-surface border border-border-subtle text-primary-text p-3 rounded-lg mb-4 w-full";
const selectClass = "bg-bg-surface border border-border-subtle text-primary-text p-3 rounded-lg mb-4 w-full";

const L = ({ children }: { children: React.ReactNode }) => (
    <label className="text-secondary-text text-xs font-bold uppercase mb-1 tracking-wider block">
        {children}
    </label>
);

export default function Form({ draft, setDraft }: FormProps) {
    const [step, setStep] = useState(0);
    const [currentInfusion, setCurrentInfusion] = useState(0);
    const scrollRef = useRef<HTMLDivElement>(null);

    const scrollTop = () => scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });

    const handleSave = async () => {
        const result = ReportSchema.safeParse(draft);
        if (!result.success) {
            const messages = formatErrors(result.error.issues);
            alert(`Campos incompletos\n${messages.join('\n')}`);
            return;
        }
        await GeneratePDF(result.data);
    };

    const addInfusion = () => {
        setDraft(prev => ({ ...prev, infusiones: [...prev.infusiones, emptyInfusion] }));
    };

    const removeInfusion = (index: number) => {
        setDraft(prev => ({ ...prev, infusiones: prev.infusiones.filter((_, i) => i !== index) }));
        setCurrentInfusion(prev => Math.max(0, prev - 1));
    };

    const validateStep = (step: number): boolean => {
        if (step === 1) {
            const result = AnalysisSchema.safeParse(draft.analisis);
            if (!result.success) {
                alert(`Campos incompletos\n${formatErrors(result.error.issues).join('\n')}`);
                return false;
            }
        }
        if (step === 2) {
            const result = InfusionSchema.safeParse(draft.infusiones[currentInfusion]);
            if (!result.success) {
                alert(`Campos incompletos\n${formatErrors(result.error.issues).join('\n')}`);
                return false;
            }
        }
        return true;
    };

    const validateAllInfusions = (): boolean => {
        for (let i = 0; i < draft.infusiones.length; i++) {
            const result = InfusionSchema.safeParse(draft.infusiones[i]);
            if (!result.success) {
                alert(`Infusión ${i + 1} incompleta\n${formatErrors(result.error.issues).join('\n')}`);
                setCurrentInfusion(i);
                return false;
            }
        }
        return true;
    };

    return (
        <div ref={scrollRef} className="flex-1 bg-bg-main overflow-y-auto pb-10">

            {/* STEP 0 - INTRO */}
            {step === 0 && (
                <div className="m-4 p-4 rounded-xl bg-bg-surface/40 border border-border-subtle">
                    <span className="text-accent font-bold mb-4 block">Paso {step + 1}</span>

                    <L>Hecho por:</L>
                    <input className={inputClass} value={draft.reviewer}
                        onChange={e => setDraft(prev => ({ ...prev, reviewer: e.target.value }))} />

                    <p className="text-xl font-serif text-accent-soft mb-6">Análisis sensorial</p>

                    <L>Nombre del té:</L>
                    <input className={inputClass} value={draft.analisis.nombre}
                        onChange={e => patchNested(setDraft, 'analisis', { nombre: e.target.value })} />

                    <L>Procedencia:</L>
                    <div className="mb-4">
                        <OrigenSelector
                            selected={draft.analisis.region}
                            onChange={value => patchNested(setDraft, 'analisis', { region: value as typeof regionesOptions[number] })}
                        />
                    </div>

                    <L>Tipo de té:</L>
                    <div className="mb-4">
                        <TiposSelector
                            selected={draft.analisis.tipo}
                            onChange={value => patchNested(setDraft, 'analisis', { tipo: value as typeof tiposOptions[number] })}
                        />
                    </div>

                    <L>Corte:</L>
                    <select className={selectClass} value={draft.analisis.corte}
                        onChange={e => patchNested(setDraft, 'analisis', { corte: e.target.value })}>
                        <option value="">Seleccionar corte...</option>
                        {corteData.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>

                    <L>Manufactura:</L>
                    <select className={selectClass} value={draft.analisis.manufactura}
                        onChange={e => patchNested(setDraft, 'analisis', { manufactura: e.target.value })}>
                        <option value="">Seleccionar manufactura...</option>
                        {manufacturaData.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                </div>
            )}

            {/* STEP 1 - PREINFUSION */}
            {step === 1 && (
                <div className="m-4 p-4 rounded-xl bg-bg-surface/40 border border-border-subtle">
                    <span className="text-accent font-bold mb-2 block">Paso {step + 1}</span>
                    <p className="text-xl font-serif text-accent-soft mb-6">Preinfusión</p>

                    <L>Forma y textura de la hebra:</L>
                    <input className={inputClass} value={draft.analisis.formaHierba}
                        onChange={e => patchNested(setDraft, 'analisis', { formaHierba: e.target.value })} />

                    <L>Cantidad de té:</L>
                    <input className={inputClass} type="number" value={draft.analisis.cantidad}
                        onChange={e => patchNested(setDraft, 'analisis', { cantidad: Number(e.target.value) })} />

                    <L>Granulometría:</L>
                    <input className={inputClass} value={draft.analisis.granulometria}
                        onChange={e => patchNested(setDraft, 'analisis', { granulometria: e.target.value })} />

                    <L>Color de la hebra:</L>
                    <input className={inputClass} value={draft.analisis.colorHebra}
                        onChange={e => patchNested(setDraft, 'analisis', { colorHebra: e.target.value })} />

                    <L>Sequedad de la hebra:</L>
                    <select className={selectClass} value={draft.analisis.sequedadHebra}
                        onChange={e => patchNested(setDraft, 'analisis', { sequedadHebra: e.target.value })}>
                        <option value="">Elige una...</option>
                        {sequedadData.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>

                    <L>Aroma de la hebra:</L>
                    <AromaSelector
                        selected={draft.analisis.aromaHebra}
                        onChange={values => patchNested(setDraft, 'analisis', { aromaHebra: values })}
                    />

                    <L>Técnica de infusión:</L>
                    <select className={selectClass} value={draft.analisis.metodo}
                        onChange={e => patchNested(setDraft, 'analisis', { metodo: e.target.value })}>
                        <option value="">Elige una...</option>
                        {tecnicaData.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                </div>
            )}

            {/* STEP 2 - INFUSIONES */}
            {step === 2 && (
                <div className="m-4">
                    <span className="text-accent font-bold mb-2 block">Paso {step + 1}</span>
                    {draft.infusiones.map((infusion, index) => index === currentInfusion && (
                        <div key={index}>
                            <p className="text-xl font-serif text-accent-soft mb-6 uppercase tracking-widest text-center">
                                Infusión {index + 1}
                            </p>

                            <div className="flex gap-4 p-4 rounded-xl bg-bg-surface border border-border-subtle mb-6">
                                <div className="flex-1">
                                    <L>Temp (°C):</L>
                                    <input className={inputClass} type="number" value={infusion.temperatura || ''}
                                        onChange={e => patchInfusion(setDraft, index, { temperatura: Number(e.target.value) })} />
                                </div>
                                <div className="flex-1">
                                    <L>Tiempo (s):</L>
                                    <input className={inputClass} type="number" value={infusion.tiempo || ''}
                                        onChange={e => patchInfusion(setDraft, index, { tiempo: Number(e.target.value) })} />
                                </div>
                            </div>

                            <L>Color del licor:</L>
                            <input className={inputClass} value={infusion.colorLicor}
                                onChange={e => patchInfusion(setDraft, index, { colorLicor: e.target.value })} />

                            <L>Color del aro:</L>
                            <input className={inputClass} value={infusion.colorAro}
                                onChange={e => patchInfusion(setDraft, index, { colorAro: e.target.value })} />

                            <L>Aroma:</L>
                            <div className="mb-4">
                                <AromaSelector
                                    selected={infusion.aroma}
                                    onChange={items => patchInfusion(setDraft, index, { aroma: items })}
                                />
                            </div>

                            <input
                                className={inputClass}
                                placeholder="Otros aromas (separados por coma)..."
                                value={infusion.aromaPersonalizado.join(', ')}
                                onChange={e => {
                                    const customArray = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                                    patchInfusion(setDraft, index, { aromaPersonalizado: customArray });
                                }}
                            />

                            <L>Sabor base:</L>
                            <select className={selectClass} value={infusion.sabor[0]}
                                onChange={e => patchInfusion(setDraft, index, { sabor: [e.target.value, ...infusion.sabor.slice(1)] })}>
                                <option value="">Elige uno...</option>
                                {saborData.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                            </select>

                            <L>Matices de sabor:</L>
                            <AromaSelector
                                selected={infusion.sabor.slice(1)}
                                onChange={values => patchInfusion(setDraft, index, { sabor: [infusion.sabor[0], ...values] })}
                            />

                            {([ 
                                ['amargor', amargorData, 'Amargor'],
                                ['acidez', acidezData, 'Acidez'],
                                ['astringencia', astringenciaData, 'Astringencia'],
                                ['cuerpo', cuerpoData, 'Cuerpo'],
                                ['permanencia', permanenciaData, 'Permanencia'],
                            ] as const).map(([field, data, label]) => (
                                <div key={field}>
                                    <L>{label}:</L>
                                    <select className={selectClass}
                                        value={(infusion as any)[field]}
                                        onChange={e => patchInfusion(setDraft, index, { [field]: e.target.value })}>
                                        <option value="">Elige uno...</option>
                                        {data.map((o: any) => <option key={o.value} value={o.value}>{o.label}</option>)}
                                    </select>
                                </div>
                            ))}

                            <L>Sensación:</L>
                            <input className={inputClass} value={infusion.sensacion}
                                onChange={e => patchInfusion(setDraft, index, { sensacion: e.target.value })} />

                            <L>Calificación (0-5):</L>
                            <input className={inputClass} type="number" min={0} max={5} step={0.1}
                                value={infusion.score}
                                onChange={e => patchInfusion(setDraft, index, { score: Math.min(5, Math.max(0, Number(e.target.value))) })} />
                        </div>
                    ))}
                </div>
            )}

            {step === 2 && (
                <div className="px-4 flex flex-col gap-y-3">
                    {currentInfusion > 0 && (
                        <button className="p-4 border border-border-subtle rounded-xl text-secondary-text"
                            onClick={() => { setCurrentInfusion(currentInfusion - 1); scrollTop(); }}>
                            Infusión anterior
                        </button>
                    )}
                    {currentInfusion < draft.infusiones.length - 1 && (
                        <button className="p-4 border border-border-subtle rounded-xl text-secondary-text"
                            onClick={() => { setCurrentInfusion(currentInfusion + 1); scrollTop(); }}>
                            Infusión siguiente
                        </button>
                    )}
                    <button className="p-4 bg-bg-surface border border-border-subtle rounded-xl font-bold text-primary-text"
                        onClick={() => {
                            if (!validateStep(2)) return;
                            addInfusion();
                            setCurrentInfusion(currentInfusion + 1);
                            scrollTop();
                        }}>
                        Agregar infusión
                    </button>
                    {currentInfusion === 0 && (
                        <button className="p-4 border border-border-subtle rounded-xl text-secondary-text"
                            onClick={() => { removeInfusion(currentInfusion); scrollTop(); }}>
                            Eliminar infusión
                        </button>
                    )}
                    <button className="p-4 border border-accent rounded-xl text-accent font-bold"
                        onClick={() => { if (!validateAllInfusions()) return; setStep(3); scrollTop(); }}>
                        Terminar infusiones
                    </button>
                </div>
            )}

            {/* STEP 3 - POSTINFUSION */}
            {step === 3 && (
                <div className="m-4 p-4 rounded-xl bg-bg-surface/40 border border-border-subtle">
                    <p className="text-xl font-serif text-accent-soft mb-6">Postinfusión</p>

                    <L>Tacto:</L>
                    <select className={selectClass} value={draft.postinfusion.tacto}
                        onChange={e => patchNested(setDraft, 'postinfusion', { tacto: e.target.value })}>
                        <option value="">Elige uno...</option>
                        {tactoData.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>

                    <L>Simetría:</L>
                    <select className={selectClass} value={draft.postinfusion.simetria}
                        onChange={e => patchNested(setDraft, 'postinfusion', { simetria: e.target.value })}>
                        <option value="">Elige uno...</option>
                        {simetriaData.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>

                    <L>Aroma:</L>
                    <AromaSelector
                        selected={draft.postinfusion.aromaFondo}
                        onChange={newSelected => patchNested(setDraft, 'postinfusion', { aromaFondo: newSelected })}
                    />

                    <L>Maridaje:</L>
                    <input className={inputClass} value={draft.postinfusion.maridaje}
                        onChange={e => patchNested(setDraft, 'postinfusion', { maridaje: e.target.value })} />

                    <L>Observaciones:</L>
                    <textarea className={inputClass} rows={4} value={draft.postinfusion.observaciones}
                        onChange={e => patchNested(setDraft, 'postinfusion', { observaciones: e.target.value })} />

                    <L>Clasificador:</L>
                    <select className={selectClass} value={draft.postinfusion.clasificadores}
                        onChange={e => patchNested(setDraft, 'postinfusion', { clasificadores: e.target.value })}>
                        <option value="">Elige uno...</option>
                        {clasificadoresData.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>

                    <button className="p-4 bg-accent rounded-xl text-bg-main font-bold w-full" onClick={handleSave}>
                        Guardar Reporte
                    </button>
                </div>
            )}

            {/* NAV */}
            <div className="flex justify-between p-4 mt-6 border-t border-border-subtle">
                {step > 0 ? (
                    <button className="p-4 flex-1 mr-2 border border-border-subtle rounded-xl text-primary-text"
                        onClick={() => { setStep(step - 1); scrollTop(); }}>
                        Atrás
                    </button>
                ) : <div className="flex-1" />}

                {step < 2 && (
                    <button className="p-4 flex-1 ml-2 bg-accent rounded-xl text-bg-main font-bold"
                        onClick={() => { if (!validateStep(step)) return; setStep(step + 1); scrollTop(); }}>
                        Continuar
                    </button>
                )}
            </div>
        </div>
    );
}