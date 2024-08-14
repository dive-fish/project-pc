import { _transformImportedModules } from "@/utils/assembleContexts";

const contexts = import.meta.glob(["./**/*.js"], { eager: true });
const translate = _transformImportedModules(contexts);

export default translate;
