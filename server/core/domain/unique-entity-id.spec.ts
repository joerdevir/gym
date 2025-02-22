import { describe, test, expect } from "vitest";
import { UniqueEntityID } from "./unique-entity-id";
import { validate as validateUUID, version as uuidVersion } from 'uuid';

describe('UniqueEntityId', () => {
  test('should be able to restore a new instance', () => {
    const id = UniqueEntityID.restore('test')
    expect(id.toString()).toBe('test')
  })

  test('should be able to generate a new UUIDv7', () => {
    const id = UniqueEntityID.UUIDv7()
    expect(validateUUID(id.toString())).toBe(true)
    expect(uuidVersion(id.toString())).toBe(7)
  })

  test('should be able to compare two instances', () => {
    const id1 = UniqueEntityID.restore('test')
    const id2 = UniqueEntityID.restore('test')
    expect(id1.equals(id2)).toBe(true)
  })

  test('should be able to compare two instances with different IDs', () => {
    const id1 = UniqueEntityID.restore('test')
    const id2 = UniqueEntityID.restore('test2')
    const id3 = UniqueEntityID.restore(id1.toString())
    expect(id1.equals(id2)).toBe(false)
    expect(id1.equals(id3)).toBe(true)
  })
})