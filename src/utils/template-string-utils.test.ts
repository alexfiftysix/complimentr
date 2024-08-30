import {fillTemplate, filterTemplatesOnMaxLength, ITemplateInputs, templateMaxLength} from "./template-string-utils";

const emptyInputs: ITemplateInputs = {
    nouns: [],
    adjectives: [],
    qualifiers: [],
    emotions: [],
    emojis: [],
    emojiWeight: 0,
}

test('fillTemplate with noun', async () => {
        expect(
            fillTemplate('with {noun}', {...emptyInputs, nouns: ['example']} )
        ).toBe('with example!')
    }
)

test('fillTemplate with adjective', async () => {
        expect(
            fillTemplate('with {adj}', {...emptyInputs, adjectives: ['example']} )
        ).toBe('with example!')
    }
)

test('fillTemplate with qualifier', async () => {
        expect(
            fillTemplate('with {qual}', {...emptyInputs, qualifiers: ['example']} )
        ).toBe('with example!')
    }
)

test('fillTemplate with emotion', async () => {
        expect(
            fillTemplate('with {emotion}', {...emptyInputs, emotions: ['example']} )
        ).toBe('with example!')
    }
)

test('fillTemplate with definite emoji', async () => {
        expect(
            fillTemplate('with', {...emptyInputs, adjectives: ['example'], emojis: ['😎'], emojiWeight: 1} )
        ).toBe('with 😎')
    }
)

test('fillTemplate with definitely no emoji', async () => {
        expect(
            fillTemplate('with', {...emptyInputs, adjectives: ['example'], emojiWeight: 0} )
        ).toBe('with!')
    }
)

test('templateMaxLength', async () => {
    const maxLength = templateMaxLength(
        'with {adj}',
        {...emptyInputs, adjectives: ['aReallyLongExampleWhichWillOverfillTheQuota']},
    );
    expect(maxLength).toBe(49)
})

test('filterTemplatesOnMaxLength considers length of tokens', async () => {
    const filtered = filterTemplatesOnMaxLength(
        ['simple', 'with {adj}'],
        20,
        {...emptyInputs, adjectives: ['aReallyLongExampleWhichWillOverfillTheQuota']},
    );
    console.log(filtered);
    expect(filtered).toEqual(['simple'])
})