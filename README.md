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

## Backlog
- You might want a compliment of a maximum character length, I think that's worth looking into.