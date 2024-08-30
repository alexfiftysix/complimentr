import {randomChoice} from "./utils/array-utils";
import {complimentSentenceStructures} from "./data/compliment-sentence-structures";
import {nouns} from "./data/nouns";
import {adjectives} from "./data/adjectives";
import {qualifiers} from "./data/qualifiers";
import {emotions} from "./data/emotions";
import {emoticons} from "./data/emoticons";
import {appendOptionalString, replaceAllOfType} from "./utils/template-string-utils";

interface IGenerateOptions {
    templates?: string[],
    nouns?: string[],
    adjectives?: string[],
    qualifiers?: string[],
    emotions?: string[],
    emoticons?: string[],

    additionalTemplates?: string[],
    additionalNouns?: string[],
    additionalAdjectives?: string[],
    additionalQualifiers?: string[],
    additionalEmotions?: string[],
    additionalEmoticons?: string[],

    emoticonWeight?: number,
}

export const generateCompliment = (options: IGenerateOptions = {}) : string => {
    const allSentenceStructures: string[] = [...options.templates ?? complimentSentenceStructures, ...options.additionalTemplates ?? []];
    const allNouns: string[] = [...options.nouns ?? nouns, ...options.additionalNouns ?? []];
    const allAdjectives: string[] = [...options.adjectives ?? adjectives, ...options.additionalAdjectives ?? []];
    const allQualifiers: string[] = [...options.qualifiers ?? qualifiers, ...options.additionalQualifiers ?? []];
    const allEmotions: string[] = [...options.emotions ?? emotions, ...options.additionalEmotions ?? []];
    const allEmoticons: string[] = [...options.emoticons ?? emoticons, ...options.additionalEmoticons ?? []];

    const template = randomChoice(allSentenceStructures);

    const withNouns = replaceAllOfType(template, '{noun}', allNouns);
    const withAdjectives = replaceAllOfType(withNouns, '{adj}', allAdjectives);
    const withQualifiers = replaceAllOfType(withAdjectives, '{qual}', allQualifiers);
    const withEmotions = replaceAllOfType(withQualifiers, '{emotion}', allEmotions);

    const withOptionalEmoticon = appendOptionalString(withEmotions, allEmoticons, options.emoticonWeight ?? 0.5);

    return withOptionalEmoticon;
}