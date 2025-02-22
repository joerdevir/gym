import { Component } from "../component";
import {Environment} from "../enum/env.enum";

export class ApplicationService extends Component {
  protected readonly dbSchema = process.env.NODE_ENV === Environment.TEST ? `"${process.env.LOCAL_POSTGRES_SCHEMA}".` : ''
}