import { v7 as uuidv7, validate as validateUUID, version as uuidVersion } from 'uuid';

export interface Identifier {
  toString(): string
  equals(id: Identifier): boolean
}
interface Props {
  id: string
}

export class UniqueEntityID implements Identifier {
  readonly #value: string

  private constructor(props: Props) {
    this.#value = props.id
  }

  static restore(id: string): UniqueEntityID { 
    return new UniqueEntityID({ id })
  }

  toString(): string { 
    return this.#value 
  }

  equals(id: Identifier): boolean {
    return this.#value === id.toString()
  }

  // UUID v7
  static UUIDv7(): UniqueEntityID { return new UniqueEntityID({ id: uuidv7() }) }
  public isUUIDv7(): boolean { return validateUUID(this.#value) && uuidVersion(this.#value) === 7 }
  
  public getDate(): Date { 
    const timestampHex = this.#value.replace(/-/g, '').slice(0, 12)
    const unixMilliseconds = parseInt(timestampHex, 16)
    return new Date(unixMilliseconds)
  }
}