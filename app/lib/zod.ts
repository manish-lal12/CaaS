import { z } from "zod";

export const inbound_rules_schema = z.object({
  config_name: z.string({ message: "Minimum 3 character" }).min(3),
  domain_name: z.string({ message: "invalid Domain" }),
  port: z.number({ message: "only number" }).max(65536),
});
