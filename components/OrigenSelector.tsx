'use client';

import { regionLabels } from "@/components/mapping";
import { regionesTree } from "@/components/schemas";
import { useEffect, useState } from "react";

type OrigenSelectorProps = {
    selected: string;
    onChange: (newSelected: string) => void;
}

export function OrigenSelector({ selected, onChange }: OrigenSelectorProps) {
    const [history, setHistory] = useState<any[]>([]);
    const [customRegions, setCustomRegions] = useState<Record<string, string[]>>({});
    const [newCountry, setNewCountry] = useState('');
    const [newRegion, setNewRegion] = useState('');
    const [currentLevel, setCurrentLevel] = useState<any>(regionesTree);
    const [isAddingCustom, setIsAddingCustom] = useState(false);

    const fullTree = { ...regionesTree, ...customRegions };

    const handleSelect = (key: string, value: any) => {
        if (typeof value === 'string') {
            onChange(value);
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

    const addCustomRegion = () => {
        const existingCountry = Object.keys(fullTree).find(
            k => k.toLowerCase() === newCountry.toLowerCase()
        );
        const countryKey = existingCountry ?? newCountry;
        const updated = {
            ...customRegions,
            [countryKey]: [...(customRegions[countryKey] ?? []), newRegion]
        };
        setCustomRegions(updated);
        localStorage.setItem('customRegions', JSON.stringify(updated));
        onChange(newRegion);
        setNewCountry('');
        setNewRegion('');
        setIsAddingCustom(false);
    };

    useEffect(() => {
        const data = localStorage.getItem('customRegions');
        if (data) setCustomRegions(JSON.parse(data));
    }, []);

    useEffect(() => {
        if (history.length === 0) {
            setCurrentLevel({ ...regionesTree, ...customRegions });
        }
    }, [customRegions, history.length]);

    return (
        <div className="flex flex-col gap-y-4">
            {selected && (
                <div className="flex flex-wrap gap-2 mb-2">
                    <button
                        className="bg-accent px-3 py-1 rounded-full flex items-center"
                        onClick={() => onChange('')}
                    >
                        <span className="text-bg-main text-xs font-bold mr-1">{regionLabels[selected] ?? selected}</span>
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
                        const isSelected = selected === leaf;
                        return (
                            <button
                                key={leaf}
                                className={`px-4 py-3 rounded-lg border ${isSelected ? 'bg-accent border-accent' : 'bg-bg-surface border-border-subtle'}`}
                                onClick={() => handleSelect(leaf, leaf)}
                            >
                                <span className={`font-medium ${isSelected ? 'text-bg-main' : 'text-primary-text'}`}>
                                    {regionLabels[leaf] ?? leaf}
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
                                <span className="text-primary-text font-medium">{regionLabels[key] ?? key}</span>
                                {!Array.isArray(value) && <span className="text-secondary-text ml-2">›</span>}
                            </button>
                        );
                    })
                )}

                {history.length === 0 && (
                    <div className="w-full mt-2 flex flex-col gap-y-2">
                        {!isAddingCustom ? (
                            <button
                                className="border border-border-subtle px-4 py-3 rounded-lg text-left"
                                onClick={() => setIsAddingCustom(true)}
                            >
                                <span className="text-secondary-text">+ Añadir región...</span>
                            </button>
                        ) : (
                            <div className="flex flex-col gap-y-2">
                                <input
                                    className="bg-bg-surface px-3 py-2 rounded-lg text-primary-text"
                                    placeholder="País..."
                                    value={newCountry}
                                    onChange={e => setNewCountry(e.target.value)}
                                />
                                <input
                                    className="bg-bg-surface px-3 py-2 rounded-lg text-primary-text"
                                    placeholder="Región..."
                                    value={newRegion}
                                    onChange={e => setNewRegion(e.target.value)}
                                />
                                <button
                                    className="bg-accent px-4 py-3 rounded-lg text-bg-main font-bold"
                                    onClick={addCustomRegion}
                                >
                                    Añadir
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}