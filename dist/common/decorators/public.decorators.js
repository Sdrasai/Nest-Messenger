"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Public = void 0;
const common_1 = require("@nestjs/common");
const auth_constants_1 = require("../constants/auth.constants");
const Public = () => (0, common_1.SetMetadata)(auth_constants_1.IS_PUBLIC_KEY, true);
exports.Public = Public;
//# sourceMappingURL=public.decorators.js.map