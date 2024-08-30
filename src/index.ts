import {randomChoice} from "./utils/array-utils";
import {complimentSentenceStructures} from "./data/compliment-sentence-structures";
import {nouns} from "./data/nouns";
import {adjectives} from "./data/adjectives";
import {qualifiers} from "./data/qualifiers";
import {emotions} from "./data/emotions";
import {emojis} from "./data/emojis";
import {appendOptionalString, replaceAllOfType} from "./utils/template-string-utils";
import {byLength} from "./utils/filters";

interface IGenerateOptions {
    templates?: string[],
    nouns?: string[],
    adjectives?: string[],
    qualifiers?: string[],
    emotions?: string[],
    emojis?: string[],

    additionalTemplates?: string[],
    additionalNouns?: string[],
    additionalAdjectives?: string[],
    additionalQualifiers?: string[],
    additionalEmotions?: string[],
    additionalEmojis?: string[],

    emojiWeight?: number,

    maxLength?: number,
}

export const generateCompliment = (options: IGenerateOptions = {}) : string => {
    const allTemplates: string[] = [...options.templates ?? complimentSentenceStructures, ...options.additionalTemplates ?? []];
    const allNouns: string[] = [...options.nouns ?? nouns, ...options.additionalNouns ?? []];
    const allAdjectives: string[] = [...options.adjectives ?? adjectives, ...options.additionalAdjectives ?? []];
    const allQualifiers: string[] = [...options.qualifiers ?? qualifiers, ...options.additionalQualifiers ?? []];
    const allEmotions: string[] = [...options.emotions ?? emotions, ...options.additionalEmotions ?? []];
    const allEmojis: string[] = [...options.emojis ?? emojis, ...options.additionalEmojis ?? []];
    const emojiWeight: number = options.emojiWeight ?? 0.5;

    const templateMaxLength = (template: string): number => {
        const longestNoun = allNouns.sort(byLength)[0];
        const longestAdjective = allAdjectives.sort(byLength)[0];
        const longestQualifier = allQualifiers.sort(byLength)[0];
        const longestEmotion = allEmotions.sort(byLength)[0];
        const longestEmoji = emojiWeight <= 0 ? '' : ' 😎';

        let longestVersionOfTemplate = replaceAllOfType(template, '{noun}', [longestNoun]);
        longestVersionOfTemplate = replaceAllOfType(longestVersionOfTemplate, '{adjective}', [longestAdjective]);
        longestVersionOfTemplate = replaceAllOfType(longestVersionOfTemplate, '{qualifier}', [longestQualifier]);
        longestVersionOfTemplate = replaceAllOfType(longestVersionOfTemplate, '{emotion}', [longestEmotion]);
        longestVersionOfTemplate = `${longestVersionOfTemplate}${longestEmoji}`;

        return longestVersionOfTemplate.length;
    }

    const applicableTemplates: string[] = options.maxLength === undefined
        ? allTemplates
        : allTemplates.filter(t => templateMaxLength(t) <= options.maxLength!);
    if (applicableTemplates.length === 0) throw new RangeError("No applicable templates found for given maxLength.");

    const template = randomChoice(applicableTemplates);

    const withNouns = replaceAllOfType(template, '{noun}', allNouns);
    const withAdjectives = replaceAllOfType(withNouns, '{adj}', allAdjectives);
    const withQualifiers = replaceAllOfType(withAdjectives, '{qual}', allQualifiers);
    const withEmotions = replaceAllOfType(withQualifiers, '{emotion}', allEmotions);

    const withOptionalEmoji = appendOptionalString(withEmotions, allEmojis, options.emojiWeight ?? 0.5);

    return withOptionalEmoji;
}