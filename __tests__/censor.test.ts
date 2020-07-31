import { compilePatterns, censorWord, censor, basicMasker, marksMasker } from '../src/index'

describe('test compilePatters', () => {
  test('compilePatterns should work', () => {
    const CUSTOM_WORDS = ['bitter']
    const COMPILED_REGEXPS = [new RegExp(`b[i*l1!][t7][t7][e*3]r`)]
    const compiledPatterns = compilePatterns({ words: CUSTOM_WORDS, useBaseBadWords: false })

    expect(compiledPatterns).toEqual(COMPILED_REGEXPS)
  })
})

describe('test censorWord', () => {
  test('basicMasker should work', () => {
    const WORD = 'B!tch'
    const MASKED = '*****'

    expect(basicMasker(WORD)).toBe(MASKED)
  })
  test('marksMasker should work', () => {
    const WORD = 'B!tch'

    expect(marksMasker(WORD)).not.toBe(WORD)
  })
  test('custom maskers should work', () => {
    const UNCENSORED = 'B!tch'
    const CENSORED = '👀👀👀👀👀'
    const masker = (s: string) => '👀'.repeat(s.length)

    expect(censorWord({ word: UNCENSORED, masker })).toBe(CENSORED)
  })
  test('censorWord should work', () => {
    const UNCENSORED = 'B!tch'
    const CENSORED = '*****'

    expect(censorWord({ word: UNCENSORED })).toBe(CENSORED)
  })
  test('censorWord should work for good words', () => {
    const UNCENSORED = 'good'
    expect(censorWord({ word: UNCENSORED })).toBe(UNCENSORED)
  })
})

describe('test censor', () => {
  test('censor should work', () => {
    const UNCENSORED = 'WhOre is good B!TCH'
    const CENSORED = '***** is good *****'

    expect(censor({ words: UNCENSORED })).toBe(CENSORED)
  })
  test('censor should work with custom word list', () => {
    const UNCENSORED = 'WhOre is good B!TCH'
    const CENSORED = 'WhOre is **** B!TCH'

    expect(censor({ words: UNCENSORED, custom: ['good'], useBaseBadWords: false })).toBe(CENSORED)
  })
})
