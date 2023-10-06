import { DateTime } from "luxon";

export interface IGetProperty{
    id?: number,
    plate: string,
    description: string,
    acquisitionDate: DateTime,
    equipmentStatus: string,
    userIdentification: string,
    area: string,
    fullName: string,
    model: string,
    measure: string,
    activeOwner: string,
    observation: string,
    clerk: string
}