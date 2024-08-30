import {randomChoice} from "./array-utils";

export const replaceAllOfType = (template: string, toReplace: string, candidates: string[]) => {
    let updatedTemplate = template
    while (updatedTemplate.includes(toReplace)) {
        const replacement = randomChoice(candidates)
        updatedTemplate.replace(toReplace, replacement)
    }

    return updatedTemplate;
}

export const appendOptionalString = (template: string, candidates: string[], weight: number) : string => {
    const toAppend = randomChoice(candidates);
    return Math.random() < weight
        ? `${template} ${toAppend}`
        : template;
}