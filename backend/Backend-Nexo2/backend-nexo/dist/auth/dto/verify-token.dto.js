"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyTokenDto = void 0;
const class_validator_1 = require("class-validator");
class VerifyTokenDto {
}
exports.VerifyTokenDto = VerifyTokenDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'El correo electrónico es obligatorio.' }),
    (0, class_validator_1.IsEmail)({}, { message: 'El formato del correo electrónico no es válido.' }),
    __metadata("design:type", String)
], VerifyTokenDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'El código de verificación es obligatorio.' }),
    (0, class_validator_1.IsNumberString)({}, { message: 'El token debe contener solo números (dígitos).' }),
    (0, class_validator_1.Length)(6, 6, { message: 'El token debe tener 6 dígitos exactos.' }),
    __metadata("design:type", String)
], VerifyTokenDto.prototype, "token", void 0);
//# sourceMappingURL=verify-token.dto.js.map