import {randomChoice} from "./utils/array-utils";
import {complimentSentenceStructures} from "./data/compliment-sentence-structures";
import {nouns} from "./data/nouns";
import {adjectives} from "./data/adjectives";
import {qualifiers} from "./data/qualifiers";
import {emotions} from "./data/emotions";
import {emojis} from "./data/emojis";
import {appendOptionalString, replaceAllOfType} from "./utils/template-string-utils";
import {byLength} from "./utils/filters";

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
    const longestEmoji = inputs.emojiWeight <= 0 ? '' : ' 😎';

    let longestVersionOfTemplate = replaceAllOfType(template, '{noun}', [longestNoun]);
    longestVersionOfTemplate = replaceAllOfType(longestVersionOfTemplate, '{adjective}', [longestAdjective]);
    longestVersionOfTemplate = replaceAllOfType(longestVersionOfTemplate, '{qualifier}', [longestQualifier]);
    longestVersionOfTemplate = replaceAllOfType(longestVersionOfTemplate, '{emotion}', [longestEmotion]);
    longestVersionOfTemplate = `${longestVersionOfTemplate}${longestEmoji}`;

    return longestVersionOfTemplate.length;
}

export const fillTemplate = (template: string, inputs: ITemplateInputs): string => {
    const withNouns = replaceAllOfType(template, '{noun}', inputs.nouns);
    const withAdjectives = replaceAllOfType(withNouns, '{adj}', inputs.adjectives);
    const withQualifiers = replaceAllOfType(withAdjectives, '{qual}', inputs.qualifiers);
    const withEmotions = replaceAllOfType(withQualifiers, '{emotion}', inputs.emotions);
    const withOptionalEmoji = appendOptionalString(withEmotions, inputs.emojis, inputs.emojiWeight ?? 0.5);
    return withOptionalEmoji;
}