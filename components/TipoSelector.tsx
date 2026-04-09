'use client';

import { tipoLabels } from "@/components/mapping";
import { tiposTree } from "@/components/schemas";
import { useState } from "react";

type TiposSelectorProps = {
    selected: string;
    onChange: (newSelected: string) => void;
}

export function TiposSelector({ selected, onChange }: TiposSelectorProps) {
    const [history, setHistory] = useState<any[]>([]);
    const [currentLevel, setCurrentLevel] = useState<any>(tiposTree);

    const handleSelect = (key: string, value: any) => {
        if (typeof value === 'string') {
            onChange(value);
        } else if (Array.isArray(value) && value.length === 1) {
            onChange(value[0]);
        } else {
            setHistory([...history, currentLevel]);
            setCurrentLevel(value);
        }
    };

    const goBack = () => {
        const previous = history[history.length - 1];
        setCurrentLevel(previous);
        setHistory(history.slice(0, -1));
    };

    return (
        <div className="flex flex-col gap-y-4">
            {selected && (
                <div className="flex flex-wrap gap-2 mb-2">
                    <button
                        className="bg-accent px-3 py-1 rounded-full flex items-center"
                        onClick={() => onChange('')}
                    >
                        <span className="text-bg-main text-xs font-bold mr-1">{tipoLabels[selected] ?? selected}</span>
                        <span className="text-bg-main text-xs">×</span>
                    </button>
                </div>
            )}

            {history.length > 0 && (
                <button className="flex items-center py-2 text-accent font-bold" onClick={goBack}>
                    ← Volver
                </button>
            )}

            <div className="flex flex-wrap gap-2">
                {Array.isArray(currentLevel) ? (
                    currentLevel.map((leaf: string) => {
                        const isSelected = selected.includes(leaf);
                        return (
                            <button
                                key={leaf}
                                className={`px-4 py-3 rounded-lg border ${isSelected ? 'bg-accent border-accent' : 'bg-bg-surface border-border-subtle'}`}
                                onClick={() => handleSelect(leaf, leaf)}
                            >
                                <span className={`font-medium ${isSelected ? 'text-bg-main' : 'text-primary-text'}`}>
                                    {tipoLabels[leaf] ?? leaf}
                                </span>
                            </button>
                        );
                    })
                ) : (
                    Object.keys(currentLevel).map((key) => {
                        const value = currentLevel[key];
                        return (
                            <button
                                key={key}
                                className="bg-bg-surface border border-border-subtle px-4 py-3 rounded-lg min-w-[45%] flex justify-between items-center"
                                onClick={() => handleSelect(key, value)}
                            >
                                <span className="text-primary-text font-medium">
                                    {tipoLabels[key] ?? key}
                                </span>
                                {Array.isArray(value) && value.length !== 1 && (
                                    <span className="text-secondary-text ml-2">›</span>
                                )}
                            </button>
                        );
                    })
                )}
            </div>
        </div>
    );
}