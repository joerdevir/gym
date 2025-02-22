import {describe, test, expect} from "vitest";
import { hash } from "./hash";

describe('hash', () => {
  test('should generate a hash code with MD5 algorithm and base64 encoding', () => {
    const hash01 = hash({ algorithm: 'md5', value: 'test', encoding: 'base64' })
    const hash02 = hash({ algorithm: 'md5', value: 'test', encoding: 'base64' })
    expect(hash01).toBe(hash02)
    const hash03 = hash({ algorithm: 'md5', value: 'test01', encoding: 'base64' })
    const hash04 = hash({ algorithm: 'md5', value: 'test02', encoding: 'base64' })
    expect(hash03).not.toBe(hash04)
  })

  test('should generate a hash code with SHA1 algorithm and base64 encoding', () => {
    const hash01 = hash({ algorithm: 'sha1', value: 'test', encoding: 'base64' })
    const hash02 = hash({ algorithm: 'sha1', value: 'test', encoding: 'base64' })
    expect(hash01).toBe(hash02)
    const hash03 = hash({ algorithm: 'sha1', value: 'test01', encoding: 'base64' })
    const hash04 = hash({ algorithm: 'sha1', value: 'test02', encoding: 'base64' })
    expect(hash03).not.toBe(hash04)
  })

  test('should generate a hash code with SHA256 algorithm and base64 encoding', () => {
    const hash01 = hash({ algorithm: 'sha256', value: 'test', encoding: 'base64' })
    const hash02 = hash({ algorithm: 'sha256', value: 'test', encoding: 'base64' })
    expect(hash01).toBe(hash02)
    const hash03 = hash({ algorithm: 'sha256', value: 'test01', encoding: 'base64' })
    const hash04 = hash({ algorithm: 'sha256', value: 'test02', encoding: 'base64' })
    expect(hash03).not.toBe(hash04)
  })

  test('should generate a hash code with SHA512 algorithm and base64 encoding', () => {
    const hash01 = hash({ algorithm: 'sha512', value: 'test', encoding: 'base64' })
    const hash02 = hash({ algorithm: 'sha512', value: 'test', encoding: 'base64' })
    expect(hash01).toBe(hash02)
    const hash03 = hash({ algorithm: 'sha512', value: 'test01', encoding: 'base64' })
    const hash04 = hash({ algorithm: 'sha512', value: 'test02', encoding: 'base64' })
    expect(hash03).not.toBe(hash04)
  })
})