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
  return [...Array.from(new Set(words.concat(useBaseBadWords ? badWords : [])))].map(w => {
    if (!exact) {
      w = [...w].map(c => charMapping[c] || c).join('')
    }
    return new RegExp(w)
  })
}

export const basicMasker = (s: string) => '*'.repeat(s.length)

export const marksMasker = (s: string, marks = '~!@#$%^&*') =>
  [...Array(s.length)].map(() => marks[Math.floor(Math.random() * s.length)]).join('')

export function censorWord({
  word,
  against = compilePatterns({ words: badWords }),
  masker = basicMasker
}: {
  word: string
  against?: RegExp[]
  masker?: Function
}) {
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
  console.log(againstRegExp)
  return words
    .split(' ')
    .map(w => censorWord({ word: w, against: againstRegExp, masker }))
    .join(' ')
}
