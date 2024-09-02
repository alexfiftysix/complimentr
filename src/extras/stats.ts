import {ITemplateInputs} from "../utils/template-string-utils";
import {nouns} from "../data/nouns";
import {adjectives} from "../data/adjectives";
import {adverbs} from "../data/adverbs";
import {emotions} from "../data/emotions";
import {emojis} from "../data/emojis";
import {sentenceTemplates} from "../data/sentence-templates";

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
        const nouns = (template.match(/{noun}/g) || []).length
        const adjectives = (template.match(/{adjective}/g) || []).length
        const adverbs = (template.match(/{adverb}/g) || []).length
        const emotions = (template.match(/{emotion}/g) || []).length

        const possibilities = [
            nouns * tokenToCount['{noun}'] || 1, // if token isn't present, there's 1 possibility
            adjectives * tokenToCount['{adjective}'] || 1,
            adverbs * tokenToCount['{adverb}'] || 1,
            emotions * tokenToCount['{emotion}'] || 1,
            tokenToCount['{emoji}'] || 1,
        ].reduce((a, b) => a * b)

        total += possibilities
    })

    return total;
}

console.log(howManyUniqueComplimentsExist(sentenceTemplates, defaultInputs));