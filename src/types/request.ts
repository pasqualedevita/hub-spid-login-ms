import { OrganizationFiscalCode } from "@pagopa/ts-commons/lib/strings";
import * as t from "io-ts";

export const UpgradeTokenBody = t.exact(
  t.interface({
    organization_fiscal_code: OrganizationFiscalCode
  })
);
export type UpgradeTokenBody = t.TypeOf<typeof UpgradeTokenBody>;
