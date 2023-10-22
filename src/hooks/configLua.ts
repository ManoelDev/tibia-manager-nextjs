import { readConfigLua } from "@/utils/readConfigLua";

export default function configLua() {
  const server = new readConfigLua();
  const configLua = server.getConfig();
  return configLua
}