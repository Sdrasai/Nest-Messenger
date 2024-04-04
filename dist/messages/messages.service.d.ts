/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
<<<<<<< HEAD
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './entities/message.entity';
import { Model } from 'mongoose';
export declare class MessagesService {
    private messageModel;
    constructor(messageModel: Model<Message>);
    createMessageService(createMessageDto: CreateMessageDto): Promise<import("mongoose").Document<unknown, {}, Message> & Message & {
        _id: import("mongoose").Types.ObjectId;
    }>;
=======
import { Message } from "./schema/message.schema";
import { Model } from "mongoose";
export declare class MessagesService {
    private messageModel;
    constructor(messageModel: Model<Message>);
    createMessageService(user: any, message: string): Promise<Message>;
>>>>>>> 563b972bb51baf7c058b82b4c70b02d22f39a585
    findAllService(): import("mongoose").Query<(import("mongoose").Document<unknown, {}, Message> & Message & {
        _id: import("mongoose").Types.ObjectId;
    })[], import("mongoose").Document<unknown, {}, Message> & Message & {
        _id: import("mongoose").Types.ObjectId;
    }, {}, Message, "find">;
}
