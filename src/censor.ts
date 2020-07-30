import { badWords, charMapping } from './baseWords'

export function compilePatterns({
  words = [],
  exact = false,
  useBaseBadWords = true
}: {
  words?: string[]
  exact?: boolean
  useBaseBadWords?: boolean
}) {
  words = [...new Set(words.concat(useBaseBadWords ? badWords : []))]
  return words.map(w => {
    if (!exact) {
      w = [...w].map(c => charMapping[c] || c).join('')
    }
    return new RegExp(w)
  })
}

export const basicMasker = (s: string) => '*'.repeat(s.length)

export const marksMasker = (s: string, marks = '~!@#$%^&*') =>
  [...Array(s.length)].map(() => marks[Math.floor(Math.random() * s.length)]).join('')

export function censorWord(
  word: string,
  against: RegExp[] = compilePatterns({ words: badWords }),
  masker: Function = basicMasker
) {
  return against.some(r => word.toLowerCase().match(r)) ? masker(word) : word
}

export function censor({
  words,
  custom = badWords,
  exact = false,
  useBaseBadWords = true,
  masker = basicMasker
}: {
  words: string
  custom?: string[]
  exact?: boolean
  useBaseBadWords?: boolean
  masker?: Function
}) {
  const againstRegExp = compilePatterns({ words: custom, exact, useBaseBadWords })
  return words
    .split(' ')
    .map(w => censorWord(w, againstRegExp, masker))
    .join(' ')
}