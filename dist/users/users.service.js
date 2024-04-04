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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const user_schema_1 = require("./schema/user.schema");
let UsersService = class UsersService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async create(createUserDto) {
        return await this.userModel.create(createUserDto);
    }
    async findAll() {
        return await this.userModel.find();
    }
    async findOne(id) {
        return await this.userModel.findById(id);
    }
    async update(id, updateUserDto) {
        return await this.userModel.findByIdAndUpdate(id, updateUserDto, {
            new: true,
        });
    }
    async remove(id) {
        return await this.userModel.findByIdAndDelete(id);
    }
    async findByUsername(username) {
        return await this.userModel.findOne({ username });
    }
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> 563b972bb51baf7c058b82b4c70b02d22f39a585
    async createChatRoom(roomId, usernames) {
        if (Array.isArray(usernames)) {
            usernames.forEach(async (user) => {
                await this.userModel.findOneAndUpdate({ username: user }, { $push: { userRooms: roomId } }, { new: true });
            });
        }
        else {
            await this.userModel.findOneAndUpdate({ username: usernames }, { $push: { userRooms: roomId } }, { new: true });
        }
        return roomId;
    }
<<<<<<< HEAD
>>>>>>> 563b972bb51baf7c058b82b4c70b02d22f39a585
=======
>>>>>>> 563b972bb51baf7c058b82b4c70b02d22f39a585
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], UsersService);
//# sourceMappingURL=users.service.js.map