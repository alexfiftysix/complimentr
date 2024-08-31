import {ITemplateInputs} from "../utils/template-string-utils";
import {nouns} from "../data/nouns";
import {adjectives} from "../data/adjectives";
import {adverbs} from "../data/adverbs";
import {emotions} from "../data/emotions";
import {emojis} from "../data/emojis";
import {sentenceTemplates} from "../data/sentence-templates";

const tokens = [
    '{noun}',
    '{adjective}',
    '{adverb}',
    '{emotion}',
    '{emoji}',
]

const defaultInputs: ITemplateInputs = {
    nouns: nouns,
    adjectives: adjectives,
    adverbs: adverbs,
    emotions: emotions,
    emojis: emojis,
    emojiWeight: 0.5,
}

const howManyUniqueComplimentsExist = (templates: string[], inputs: ITemplateInputs): number => {
    let total = 0;

    const tokenToCount: Record<string, number> = {
        '{noun}': inputs.nouns.length,
        '{adjective}': inputs.adjectives.length,
        '{adverb}': inputs.adverbs.length,
        '{emotion}': inputs.emotions.length,
        '{emoji}': inputs.emojis.length + 1, // +1 because no emoji results in an appended `!` char
    }

    templates.forEach(template => {
        tokens.forEach(token => {
            const regExp = new RegExp(String.raw`\s${token}\s`, "g");
            const count = (template.match(regExp) || []).length
            total += tokenToCount[token]
        })
    })

    return total;
}

console.log(howManyUniqueComplimentsExist(sentenceTemplates, defaultInputs));