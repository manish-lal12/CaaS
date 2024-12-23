import { z } from "zod";

export const inbound_rules_schema = z.object({
  config_name: z.string({ message: "Minimum 3 character" }).min(3),
  domain_name: z.string({ message: "invalid Domain" }),
  port: z.number({ message: "only number" }).max(65536),
});

export const add_vpc_schema = z.object({
  name: z.string({ message: "Minimum 3 character" }).min(3),
  cidr: z.string({ message: "invalid CIDR" }).cidr({
    version: "v4",
  }),
  gateway: z.string({ message: "invalid Gateway" }).ip({
    version: "v4",
  }),
});
