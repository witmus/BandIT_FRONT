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
import { BandDto } from './bandDto';
import { EventDto } from './eventDto';
import { PositionType } from './positionType';

export interface BudgetPositionDto { 
    id?: number;
    addedTimestamp?: Date;
    band?: BandDto;
    name?: string;
    amount?: number;
    date?: Date;
    positionType?: PositionType;
    description?: string;
    event?: EventDto;
}