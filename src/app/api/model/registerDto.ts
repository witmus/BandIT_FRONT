/**
 * BandIT
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: v1
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { UserRole } from './userRole';

export interface RegisterDto { 
    userName: string;
    firstName: string;
    lastName?: string;
    phoneNumber?: string;
    email: string;
    password: string;
    role: UserRole;
    accessCode?: string;
    bandName?: string;
    bandTIN?: string;
}