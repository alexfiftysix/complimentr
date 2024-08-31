# Complimentr

Wouldn't the web be better with more compliments?

Complimentr is a light, extensible package to add more compliments to your application. Compliments like these: 

> You wonderful champion
 
> I just had to let you know that you're dreamy

And even

> Oh my gosh, that was brilliant

## How to use

Basic usage is simple, just call `generateCompliment()` to receive a lovely compliment.

### Advanced usage

#### Adding tokens
To add to the list of nouns, use `generateCompliment({additionalNouns: ['tiger', 'unicorn']})`.
This will use the default list of nouns in addition to any additional nouns specified.
Use the TS definition - but you can replace the 
- Templates
- Nouns
- Adjectives
- Qualifiers
- Emotions
- Emoticons

#### Replacing token lists
To replace the default list of nouns, use `generateCompliment({nouns: ['tiger', 'unicorn', 'champion', 'winner']})`

#### Setting max length
If you need to fit your compliment to a space budget, set the `maxLength` option.
It's not too clever about it - if there's any possibility with your given words that a template could generate above maxLength, it will throw that template out.

#### Setting emoji weight
An emoji will be optionally appended to the end of the string, based on the weight provided (by default 0.5).
A weight of 1 means that you will always get an emoji, a weight of 0 means you will never get an emoji.
