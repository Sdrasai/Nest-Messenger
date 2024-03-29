"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplyMiddleware = void 0;
const common_1 = require("@nestjs/common");
const ApplyMiddleware = (...middlewares) => (0, common_1.SetMetadata)("middlewares", middlewares);
exports.ApplyMiddleware = ApplyMiddleware;
//# sourceMappingURL=customMIddleware.decorators.js.map