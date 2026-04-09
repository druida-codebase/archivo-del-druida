import { SetStateAction } from "react";
import { InfusionType, regionesTree, ReportType } from "./schemas";

export function patchDraft <T> (
    setter: React.Dispatch<React.SetStateAction<T>>,
    patch: Partial<T>
) {
    setter((prev) => ({ ...prev, ...patch }));
}

export function patchNested <T, K extends keyof T> (
    setter: React.Dispatch<React.SetStateAction<T>>,
    key: K,
    patch: Partial<T [K]>
) {
    setter((prev) => ({
        ...prev,
        [key]: {...prev[key], ...patch}
    }))
}

export function patchInfusion (
    setter: React.Dispatch<SetStateAction<ReportType>>,
    id: number,
    patch: Partial<InfusionType>
) {
    setter((prev) => ({
        ...prev,
        infusiones: prev.infusiones.map((infusion, index) => index === id ? {...infusion, ...patch} : infusion)
    }))
}


export function getCountryForRegion(
    region: string, 
    customRegions: Record<string, string[]> = {}
): string {
    const fullTree = { ...regionesTree, ...customRegions }
    const entry = Object.entries(fullTree).find(([country, regions]) => 
        (regions as readonly string[]).includes(region)
    )
    return entry ? entry[0] : ''
}
