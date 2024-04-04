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
<<<<<<< HEAD
import { Document } from 'mongoose';
export interface IUser extends Document {
    username: string;
    password: string;
=======
=======
>>>>>>> 563b972bb51baf7c058b82b4c70b02d22f39a585
import { Document } from "mongoose";
export interface IUser extends Document {
    username: string;
    password: string;
    userRooms: [string];
<<<<<<< HEAD
>>>>>>> 563b972bb51baf7c058b82b4c70b02d22f39a585
=======
>>>>>>> 563b972bb51baf7c058b82b4c70b02d22f39a585
    email?: string;
    phoneNumber?: string;
    nickName?: string;
}
