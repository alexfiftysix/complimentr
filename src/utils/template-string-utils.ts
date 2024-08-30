import {randomChoice} from "./array-utils";
import {byLength} from "./filters";

const replaceAllOfType = (template: string, toReplace: string, candidates: string[]) => {
    let updatedTemplate = template
    while (updatedTemplate.includes(toReplace)) {
        const replacement = randomChoice(candidates)
        updatedTemplate = updatedTemplate.replace(toReplace, replacement)
    }

    return updatedTemplate;
}

const addFinalPunctuation = (template: string, candidates: string[], weight: number) : string => {
    const toAppend = randomChoice(candidates);
    return Math.random() < weight
        ? `${template} ${toAppend}`
        : `${template}!`;
}

export interface ITemplateInputs {
    nouns: string[],
    adjectives: string[],
    qualifiers: string[],
    emotions: string[],
    emojis: string[],
    emojiWeight: number,
}

export const filterTemplatesOnMaxLength = (templates: string[], maxLength: number | undefined, inputs: ITemplateInputs) : string[] => {
    const applicableTemplates: string[] = maxLength === undefined
        ? templates
        : templates.filter(t => templateMaxLength(t, inputs) <= maxLength!);
    if (applicableTemplates.length === 0) throw new RangeError("No applicable templates found for given maxLength.");
    return applicableTemplates;
}

export const templateMaxLength = (template: string, inputs: ITemplateInputs): number => {
    const longestNoun = inputs.nouns.sort(byLength)[0];
    const longestAdjective = inputs.adjectives.sort(byLength)[0];
    const longestQualifier = inputs.qualifiers.sort(byLength)[0];
    const longestEmotion = inputs.emotions.sort(byLength)[0];
    const longestEmoji = inputs.emojiWeight <= 0 ? '!' : ' 😎';

    let longestVersionOfTemplate = replaceAllOfType(template, '{noun}', [longestNoun]);
    longestVersionOfTemplate = replaceAllOfType(longestVersionOfTemplate, '{adj}', [longestAdjective]);
    longestVersionOfTemplate = replaceAllOfType(longestVersionOfTemplate, '{qual}', [longestQualifier]);
    longestVersionOfTemplate = replaceAllOfType(longestVersionOfTemplate, '{emotion}', [longestEmotion]);
    longestVersionOfTemplate = `${longestVersionOfTemplate}${longestEmoji}`;

    return longestVersionOfTemplate.length;
}

export const fillTemplate = (template: string, inputs: ITemplateInputs): string => {
    const withNouns = replaceAllOfType(template, '{noun}', inputs.nouns);
    const withAdjectives = replaceAllOfType(withNouns, '{adj}', inputs.adjectives);
    const withQualifiers = replaceAllOfType(withAdjectives, '{qual}', inputs.qualifiers);
    const withEmotions = replaceAllOfType(withQualifiers, '{emotion}', inputs.emotions);
    const withFinalPunctuation = addFinalPunctuation(withEmotions, inputs.emojis, inputs.emojiWeight ?? 0.5);
    return withFinalPunctuation;
}