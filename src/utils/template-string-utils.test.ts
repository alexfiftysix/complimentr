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
            fillTemplate('With {noun}', {...emptyInputs, nouns: ['example']} )
        ).toBe('With example!')
    }
)

test('fillTemplate with adjective', async () => {
        expect(
            fillTemplate('With {adj}', {...emptyInputs, adjectives: ['example']} )
        ).toBe('With example!')
    }
)

test('fillTemplate with qualifier', async () => {
        expect(
            fillTemplate('With {qual}', {...emptyInputs, qualifiers: ['example']} )
        ).toBe('With example!')
    }
)

test('fillTemplate with emotion', async () => {
        expect(
            fillTemplate('With {emotion}', {...emptyInputs, emotions: ['example']} )
        ).toBe('With example!')
    }
)

test('fillTemplate with definite emoji', async () => {
        expect(
            fillTemplate('with', {...emptyInputs, adjectives: ['example'], emojis: ['😎'], emojiWeight: 1} )
        ).toBe('With 😎')
    }
)

test('fillTemplate with definitely no emoji', async () => {
        expect(
            fillTemplate('with', {...emptyInputs, adjectives: ['example'], emojiWeight: 0} )
        ).toBe('With!')
    }
)

test('fillTemplate capitalises first char of string', async () => {
    expect(fillTemplate('template', emptyInputs))
        .toBe('Template!')
})

test('templateMaxLength', async () => {
    const maxLength = templateMaxLength(
        'With {adj}',
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