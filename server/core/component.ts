import { ajvAdapter } from './adapters/validator/ajv-adapter';
import { either } from './either';
import { utils } from './utils/utils';

const validator = ajvAdapter
export abstract class Component {
  static readonly utils = utils
  static readonly either = either
  static readonly validator = validator

  protected readonly utils = utils
  protected readonly either = either
  protected readonly validator = validator
}
