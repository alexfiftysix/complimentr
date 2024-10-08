import {sentenceTemplates} from "./data/sentence-templates";
import {nouns} from "./data/nouns";
import {adjectives} from "./data/adjectives";
import {adverbs} from "./data/adverbs";
import {emotions} from "./data/emotions";
import {emojis} from "./data/emojis";
import {randomChoice} from "./utils/array-utils";
import {fillTemplate, filterTemplatesOnMaxLength, ITemplateInputs} from "./utils/template-string-utils";

interface IGenerateOptions {
    templates?: string[],
    nouns?: string[],
    adjectives?: string[],
    adverbs?: string[],
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
    const allTemplates: string[] = [...options.templates ?? sentenceTemplates, ...options.additionalTemplates ?? []];
    const inputs: ITemplateInputs = {
        nouns : [...options.nouns ?? nouns, ...options.additionalNouns ?? []],
        adjectives : [...options.adjectives ?? adjectives, ...options.additionalAdjectives ?? []],
        adverbs : [...options.adverbs ?? adverbs, ...options.additionalQualifiers ?? []],
        emotions : [...options.emotions ?? emotions, ...options.additionalEmotions ?? []],
        emojis : [...options.emojis ?? emojis, ...options.additionalEmojis ?? []],
        emojiWeight: options.emojiWeight ?? 0.5,
    }

    const applicableTemplates: string[] = filterTemplatesOnMaxLength(allTemplates, options.maxLength, inputs);
    const chosenTemplate = randomChoice(applicableTemplates);
    const filledTemplate = fillTemplate(chosenTemplate, inputs);

    return filledTemplate;
}