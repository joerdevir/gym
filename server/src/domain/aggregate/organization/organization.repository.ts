import { EitherResult } from "../../../../core/either";
import { Organization, OrganizationRaw } from "./organization.root";

export interface OrganizationRepository {
  save(organization: Organization): Promise<EitherResult<OrganizationRaw>>
  findById(id: string): Promise<EitherResult<OrganizationRaw>>
  findByTaxId(taxId: string): Promise<EitherResult<OrganizationRaw>>
  delete(id: string): Promise<EitherResult<void>>
}

