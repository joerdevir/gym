import crypto, { BinaryToTextEncoding, HashOptions } from 'crypto'

interface HashInput {
  algorithm: 'md5' | 'sha1' | 'sha256' | 'sha512'
  value: string
  encoding: BinaryToTextEncoding
  options?: HashOptions
}

export const hash = (input: HashInput): string => {
  return crypto.createHash(input.algorithm, input.options).update(input.value).digest(input.encoding)
}